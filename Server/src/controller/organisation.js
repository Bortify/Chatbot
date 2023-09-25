import Joi from 'joi'
import {
  createOrganisation,
  updateOrganisation,
} from '../models/organisation.js'

export const CreateOrganisation = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    description: Joi.string().optional().default(""),
    logo: Joi.string()
      .pattern(/^https:\/\//)
      .optional().default(""),
  })

  const { value, error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({
      error,
    })
  }

  const organisation = await createOrganisation(req.user.id, value)

  return res.status(200).json(organisation)
}

export const UpdateOrganisation = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(200).optional(),
    description: Joi.string().optional(),
    logo: Joi.string()
      .pattern(/^https:\/\//)
      .optional(),
  })
  
  const { value, error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({
      error,
    })
  }

  const organisation = await updateOrganisation(req.user.id, value)

  return res.status(200).json(organisation)
}

export const GetOrganisation = async (req, res) => {
  return res.status(200).json(req.organisation)
}

export const ArchiveOrganisation = async (req, res) => {
  await updateOrganisation(req.organisation.id, {
    archived: true,
  })

  return res.status(200).json({
    message: 'organisation deleted',
  })
}
