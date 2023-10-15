import Joi from 'joi'
import { KnowledgeType } from '@prisma/client'

import { createChatbot, updateChatBot } from '../models/chatbot.js'
import {
  createKnowledgeSource,
  updateKnowledgeSource,
} from '../models/knowledgeSource.js'
import eventManager from '../events/index.js'
import { getDataFromCache } from '../cache/index.js'

export const CreateChatBot = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(200).required(),
    configuration: Joi.object({
      errorText: Joi.string().default("I can't assist with you that"),
    })
      .optional()
      .default({}),
  })

  const { value, error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({
      error,
    })
  }
  const chatbot = await createChatbot({
    ...value,
    organisationId: req.organisation.id,
  })
  return res.status(200).json(chatbot)
}

export const UpdateChatbot = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(200).optional(),
    configuration: Joi.object().optional(),
    active: Joi.boolean().optional(),
  })

  const { error, value } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({
      error,
    })
  }

  let updatedChatbot = null

  try {
    updatedChatbot = await updateChatBot(req.chatbot.id, value, {
      archived: false,
    })
  } catch (e) {
    return res.status(404).json({
      message: 'no chatbot found',
    })
  }

  return res.status(200).json(updatedChatbot)
}

export const AddKnowledgeToChatbot = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(200).required(),
    hostURL: Joi.string()
      .pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/)
      .required(),
    activeLinks: Joi.array()
      .items(Joi.string().pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/))
      .required(),
  })

  const { error, value } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({
      error,
    })
  }

  let knowledgeSource = await createKnowledgeSource(
    req.chatbot.knowledgeBase.id,
    {
      name: value.name,
      data: {
        activeLinks: value.activeLinks,
        hostURL: value.hostURL,
      },
      type: KnowledgeType.SITE,
    }
  )

  eventManager.emit('knowledgeSource:website:create', {
    knowledgeSource,
    chatbot: req.chatbot,
  })

  return res.status(202).json(knowledgeSource)
}

export const GetChatbotDetails = async (req, res) => {
  return res.status(200).json(req.chatbot)
}

export const UpdateKnowledgeSourceInChatbot = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(200).optional(),
    hostURL: Joi.string()
      .pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/)
      .optional(),
    activeLinks: Joi.array()
      .items(Joi.string().pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/))
      .optional(),
  })

  const { value, error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({
      error,
    })
  }

  let updatedKnowledgeSource = await updateKnowledgeSource(
    req.chatbot.knowledgeBase.id,
    req.knowledgeSource.id,
    {
      name: value.name,
      data: {
        hostURL: value.hostURL,
        activeLinks: value.activeLinks,
      },
    },
    {
      archived: false,
    }
  )

  if (value?.activeLinks) {
    eventManager.emit('knowledgeSource:website:update', {
      chatbot: req.chatbot,
      knowledgeSource: updatedKnowledgeSource,
    })
  }

  return res.status(202).json(updateKnowledgeSource)
}

export const GetKnowledgeSource = async (req, res) => {
  return res.status(200).json(req.knowledgeSource)
}

export const ArchiveChatbot = async (req, res) => {
  const chatbot = await updateChatBot(req.chatbot.id, {
    archived: true,
  })
  if (!chatbot) {
    return res.status(404).json({
      message: 'chatbot not found',
    })
  }
  return res.status(200).json({
    message: 'chatbot deleted',
  })
}

export const ArchiveKnowledgeSource = async (req, res) => {
  await updateKnowledgeSource(
    req.chatbot.knowledgeBase.id,
    req.knowledgeSource.id,
    {
      archived: true,
    }
  )

  return res.status(200).json({
    message: 'knowledge source deleted',
  })
}

export const UpdatingKnowledgeSourceStatusProvider = async (req, res) => {
  const CACHING_KEY = `knowledgeSource:website:update-${req.knowledgeSource.id}`
  const dataFromCache = await getDataFromCache(CACHING_KEY)
  if (!dataFromCache) {
    return res.status(404).json({
      message: 'no status available',
    })
  }
  if (dataFromCache.status === 'ERROR') {
    return res.status(400).json(dataFromCache)
  }
  return res.status(200).json(dataFromCache)
}

export const CreatingKnowledgeSourceStatusProvider = async (req, res) => {
  const CACHING_KEY = `knowledgeSource:website:create-${req.knowledgeSource.id}`

  const dataFromCache = await getDataFromCache(CACHING_KEY)
  if (!dataFromCache) {
    return res.status(404).json({
      message: 'no status available',
    })
  }

  if (dataFromCache.status === 'ERROR') {
    return res.status(400).json(dataFromCache)
  }

  return res.status(200).json(dataFromCache)
}
