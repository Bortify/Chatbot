import Joi from 'joi'
import { DataStreamType } from '@prisma/client'

import {
  createChatbot,
  findChatbotById,
  updateChatBot,
} from '../models/chatbot.js'
import { createDataStream, updateDataStream } from '../models/dataStream.js'
import eventManager from '../events/index.js'
import { getDataFromCache, setDataInCache } from '../cache/index.js'

export const CreateChatBot = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(200).required(),
    configuration: Joi.object().default({}),
  })

  const { value, error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({
      error,
    })
  }
  const chatBot = await createChatbot({
    ...value,
    organisationId: req.organisation.id,
  })
  return res.status(200).json({
    ...chatBot,
  })
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

export const AddDataStreamToChatbot = async (req, res) => {
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
  const chatbot = await findChatbotById(req.chatbot.id, {
    archived: false,
  })
  if (!chatbot) {
    return res.status(404).json({
      message: 'chatbot not found',
    })
  }

  let dataStream = null
  try {
    dataStream = await createDataStream(req.chatbot.id, {
      name: value.name,
      data: {
        activeLinks: value.activeLinks,
        hostURL: value.hostURL,
      },
      type: DataStreamType.SITE,
    })
  } catch (e) {
    if (e.code === 'P2002') {
      return res.status(400).json({
        error: 'chatbot already have a site linked to it',
      })
    } else {
      return res.status(404).json({
        error: 'chatbot not found',
      })
    }
  }

  eventManager.emit('dataStream:website:create', {
    dataStream,
    chatbot,
  })

  return res.status(202).json({
    message: 'request accepted',
  })
}

export const GetChatbotDetails = async (req, res) => {
  return res.status(200).json(req.chatbot)
}

export const UpdateDataStream = async (req, res) => {
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

  let updatedDataStream = null

  try {
    updatedDataStream = await updateDataStream(
      req.chatbot.id,
      req.dataStream.id,
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
  } catch (e) {
    return res.status(404).json({
      message: 'site not found',
    })
  }

  if (value?.activeLinks) {
    eventManager.emit('dataStream:website:update', {
      chatbot: req.chatbot,
      dataStream: updatedDataStream
    })
  }
  return res.status(202).json({
    message: 'request accepted',
  })
}

export const GetDataStream = async (req, res) => {
  return res.status(200).json(req.dataStream)
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
  return res.status(200).json(chatbot)
}

export const ArchiveDataStream = async (req, res) => {
  let updatedWebsite = null
  try {
    updatedWebsite = await updateDataStream(req.chatbot.id, req.dataStream.id, {
      archived: true,
    })
  } catch (e) {
    return res.status(404).json({
      message: 'data stream not found',
    })
  }

  return res.status(200).json(updatedWebsite)
}

export const UpdatingDataStreamStatusProvider = async (req, res) => {
  const CACHING_KEY = `dataStream:website:update-${req.dataStream.id}`
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

export const CreatingDataStreamStatusProvider = async (req, res) => {
  const CACHING_KEY = `dataStream:website:create-${req.dataStream.id}`

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
