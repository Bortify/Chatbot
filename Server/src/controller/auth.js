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
            .pattern(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)
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
            errors: [
                {
                    message: error.message,
                    path: error.details[0].path,
                },
            ],
        })
    }

    const user = await findActiveUserByEmail(value.email)

    if (user) {
        return res.status(409).json({
            errors: [
                {
                    message: 'user already exist with this email',
                    path: [],
                },
            ],
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
        return res.status(404).json({
            errors: [
                {
                    message: error.message,
                    path: error.details[0].path,
                },
            ],
        })
    }

    const user = await findActiveUserByEmail(value.email)

    if (!user) {
        return res.status(404).json({
            errors: [
                {
                    message: `user with this email doesn't exist`,
                    path: [],
                },
            ],
        })
    }

    const isPasswordSame = await bcrypt.compare(
        value.password,
        user.passwordHash
    )

    if (!isPasswordSame) {
        return res.status(401).json({
            errors: [
                {
                    message: 'password is incorrect',
                    path: ['password'],
                },
            ],
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
        token,
    })
}

export const GetProfile = async (req, res) => {
    return res.status(200).json({
        name: req.user.name,
        email: req.user.email,
        phone: req.user?.phone || null,
        isEmailVerified: req.user.isEmailVerified,
    })
}

export const SendResetPasswordRequest = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
    })

    const { error, value } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            errors: [
                {
                    message: error.message,
                    path: error.details[0].path,
                },
            ],
        })
    }

    const user = await findActiveUserByEmail(value.email)

    if (!user) {
        res.status(404).json({
            errors: [
                {
                    message: `user with this email doesn't exist`,
                    path: [],
                },
            ],
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
            name: user.name,
        })
    } catch (e) {
        return res.status(500).json({
            errors: [
                {
                    message: 'issues with email client',
                    path: ['email_client'],
                },
            ],
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
            errors: [
                {
                    message: error.message,
                    path: error.details[0].path,
                },
            ],
        })
    }

    const decodedValue = JWT.decode(value.token)
    if (!decodedValue) {
        return res.status(401).json({
            error: [
                {
                    message: 'Token is Invalid',
                    path: ['token'],
                },
            ],
        })
    }
    const { email } = decodedValue
    const user = await findActiveUserByEmail(email)
    try {
        JWT.verify(value.token, `${Auth.SECRET}.${user.salt}`)
    } catch (e) {
        return res.status(401).json({
            error: [
                {
                    message: 'Token is Invalid',
                    path: ['token'],
                },
            ],
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
            name: user.name,
        })
        return res.status(200).json({
            message: 'email sent',
        })
    } catch (e) {
        return res.status(500).json({
            errors: [
                {
                    message: 'issues with email client',
                    path: ['email_client'],
                },
            ],
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
            errors: [
                {
                    message: error.message,
                    path: error.details[0].path,
                },
            ],
        })
    }

    const user = await findActiveUserByEmail(value.email)

    if (!user) {
        return res.status(404).json({
            errors: [
                {
                    message: 'user not found',
                    path: [],
                },
            ],
        })
    }

    const decodedValue = JWT.decode(value.token)

    if (!decodedValue) {
        return res.status(400).json({
            error: 'token is incorrect',
        })
    }

    if (decodedValue.email !== user.email) {
        return res.status(401).json({
            error: [
                {
                    message: 'Token is Invalid',
                    path: ['token'],
                },
            ],
        })
    }

    try {
        JWT.verify(value.token, `${Auth.SECRET}.${user.salt}`)
    } catch (e) {
        return res.status(401).json({
            error: [
                {
                    message: 'Token is Invalid',
                    path: ['token'],
                },
            ],
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
        phone: Joi.string()
            .pattern(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)
            .optional(),
        name: Joi.string().min(1).max(200).optional(),
    })

    const { value, error } = schema.validate(req.body)

    if (error) {
        return res.status(400).json({
            errors: [
                {
                    message: error.message,
                    path: error.details[0].path,
                },
            ],
        })
    }

    let user = null

    if (value?.email) {
        user = await updateUserById(req.user.id, {
            ...value,
        })
    } else {
        user = await updateUserById(req.user.id, value)
    }

    return res.status(200).json({
        message: 'ok'
    })
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
            errors: [
                {
                    message: error.message,
                    path: error.details[0].path,
                },
            ],
        })
    }

    const isPasswordSame = await bcrypt.compare(
        value.password,
        req.user.passwordHash
    )

    if (!isPasswordSame) {
        return res.status(401).json({
            errors: [
                {
                    message: 'password is incorrect',
                    path: ['password'],
                },
            ],
        })
    }

    await updateUserById(req.user.id, {
        archived: true,
    })

    return res.status(200).json({
        message: 'user deleted',
    })
}
