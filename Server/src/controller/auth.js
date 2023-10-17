import Joi from 'joi'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

import {
  createUser,
  findActiveUserByEmail,
  updateUserById,
} from '../models/user.js'
import { Auth } from '../config.js'
import { EmailClient } from '../clients/email.js'
import { token } from 'morgan'

export const CreateAccount = async (req, res) => {
  /**
   * Password validation Critaria:
   *    - At least one upparecase letter.
   *    - At least one lowercase letter.
   *    - At least one digit.
   *    - At least one special character from the set: !@#$%^&*()
   */

  const schema = Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/r'^\d{10}$'/)
      .optional()
      .default(null),
    name: Joi.string().min(1).max(200).required(),
    password: Joi.string()
      .pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/
      )
      .required(),
  })

  const { value, error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({
      error,
    })
  }

  const user = await findActiveUserByEmail(value.email)

  if (user) {
    return res.status(400).json({
      error: 'user already exist with this email',
    })
  }

  const salt = await bcrypt.genSalt()
  const passwordHash = await bcrypt.hash(value.password, salt)

  const { password: pass, ...userDetails } = value
  userDetails.passwordHash = passwordHash
  userDetails.salt = salt

  const createdUser = await createUser(userDetails)
  const tokenExpiry = new Date(new Date() + Auth.TOKEN_EXPIRY)
  const token = JWT.sign(
    {
      userId: createdUser.id,
      expiry: tokenExpiry,
    },
    `${Auth.SECRET}.${createdUser.salt}`
  )

  res.cookie('token', token, {
    maxAge: Auth.TOKEN_EXPIRY,
  })

  return res.status(200).json({
    name: createdUser.name,
    email: createdUser.email,
    phone: createdUser?.phone || null,
    isEmailVerified: createdUser.isEmailVerified,
  })
}

export const SignIn = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })

  const { error, value } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({
      error,
    })
  }

  const user = await findActiveUserByEmail(value.email)

  if (!user) {
    return res.status(404).json({
      error: `user with this email doesn't exist`,
    })
  }

  const isPasswordSame = await bcrypt.compare(value.password, user.passwordHash)

  if (!isPasswordSame) {
    return res.status(400).json({
      error: 'password is incorrect',
    })
  }

  const tokenExpiry = new Date(new Date() + Auth.TOKEN_EXPIRY)
  const token = JWT.sign(
    {
      userId: user.id,
      expiry: tokenExpiry,
    },
    `${Auth.SECRET}.${user.salt}`
  )

  res.cookie('token', token, {
    maxAge: Auth.TOKEN_EXPIRY,
  })

  return res.status(200).json({
    user: {
      name: user.name,
      email: user.email,
      phone: user?.phone || null,
      isEmailVerified: user.isEmailVerified,
    },
    token
  })
}

export const GetProfile = async (req, res) => {
  return res.status(200).json({
    name: req.user.name,
    email: req.user.email,
    phone: req.user?.phone || null,
    isEmailVerified: req.user.isEmailVerified,
    organisations: req.user.organisation,
  })
}

export const SendResetPasswordRequest = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  })

  const { error, value } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({
      error,
    })
  }

  const user = await findActiveUserByEmail(value.email)

  if (!user) {
    res.status(404).json({
      error: `user with this email doesn't exist`,
    })
  }

  const token = JWT.sign(
    {
      email: user.email,
    },
    `${Auth.SECRET}.${user.salt}`,
    {
      expiresIn: 60 * 60,
    }
  )

  const mailClient = new EmailClient()

  try {
    await mailClient.sendPasswordResetEmail({
      email: user.email,
      token,
      name: user.name
    })
  } catch (e) {
    return res.status(500).json({
      error: 'issues with email client',
    })
  }

  return res.status(200).json({
    message: 'email sent',
  })
}

export const HandlePasswordResetRequest = async (req, res) => {
  const schema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string()
      .pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/
      )
      .required(),
  })

  const { value, error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({
      error,
    })
  }

  const decodedValue = JWT.decode(value.token)
  if (!decodedValue) {
    return res.status(400).json({
      error: 'Token is Invalid',
    })
  }
  const { email } = decodedValue
  const user = await findActiveUserByEmail(email)
  try {
    JWT.verify(value.token, `${Auth.SECRET}.${user.salt}`)
  } catch (e) {
    return res.status(400).json({
      error: 'Token is Invalid',
    })
  }

  const salt = await bcrypt.genSalt()
  const passwordHash = await bcrypt.hash(value.password, salt)

  const updatedUser = await updateUserById(user.id, {
    passwordHash,
    salt,
  })

  return res.status(200).json({
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone || null,
    isEmailVerified: updatedUser.isEmailVerified,
  })
}

export const SendEmailVerifyingRequest = async (req, res) => {
  const user = req.user
  const mailClient = new EmailClient()
  const token = JWT.sign(
    {
      email: user.email,
    },
    `${Auth.SECRET}.${user.salt}`,
    {
      expiresIn: 60 * 60,
    }
  )
  try {
    await mailClient.sendEmailVerficationEmail({
      email: user.email,
      token,
      name: user.name
    })
    return res.status(200).json({
      message: 'email sent',
    })
  } catch (e) {
    return res.status(500).json({
      error: 'problem with email client',
    })
  }
}

export const HandleEmailVerifyingRequest = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    token: Joi.string().required(),
  })

  const { error, value } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({
      error,
    })
  }

  const user = await findActiveUserByEmail(value.email)

  if (!user) {
    return res.status(404).json({
      error: 'user not found',
    })
  }

  const decodedValue = JWT.decode(value.token)
  
  if (!decodedValue) {
    return res.status(400).json({
      error: 'token is incorrect',
    })
  }

  if (decodedValue.email !== user.email) {
    return res.status(400).json({
      error: 'token is incorrect',
    })
  }

  try {
    JWT.verify(value.token, `${Auth.SECRET}.${user.salt}`)
  } catch (e) {
    return res.status(400).json({
      error: 'token is incorrect',
    })
  }

  await updateUserById(user.id, {
    isEmailVerified: true,
  })

  return res.status(200).json({
    message: 'mail verified successfully',
  })
}

export const UpdateProfile = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().optional(),
    phone: Joi.string()
      .pattern(/r'^\d{10}$'/)
      .optional(),
    name: Joi.string().min(1).max(200).optional(),
  })

  const { value, error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({
      error,
    })
  }

  let user = null

  if (value?.email) {
    user = await updateUserById(req.user.id, {
      ...value,
      isEmailVerified: false,
    })
  } else {
    user = await updateUserById(req.user.id, value)
  }

  return res.status(200).json(user)
}

export const ArchiveUser = async (req, res) => {
  const schema = Joi.object({
    password: Joi.string()
      .pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/
      )
      .required(),
  })

  const { value, error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({
      error,
    })
  }

  const isPasswordSame = await bcrypt.compare(
    value.password,
    req.user.passwordHash
  )

  if (!isPasswordSame) {
    return res.status(400).json({
      error: 'password is incorrect',
    })
  }

  await updateUserById(req.user.id, {
    archived: true,
  })

  return res.status(200).json({
    message: 'user deleted',
  })
}
