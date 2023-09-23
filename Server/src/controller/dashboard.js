import Joi from 'joi'
import { v1 as uuidV1 } from 'uuid'

import {
  createChatbot,
  findChatbotById,
  updateChatBot,
} from '../models/chatbot.js'
import {
  createDataStream,
  getDataStreamById,
  updateDataStream,
} from '../models/dataStream.js'
import { siteLoader } from '../infra/loaders/index.js'
import { documentSplitter } from '../utils/splitter.js'
import {
  getChatbotIndex,
  insertIndex,
} from '../models/pinecone.js'
import { openAIEmbedding } from '../infra/embedder/index.js'
import { DataStreamType } from '@prisma/client'
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
  const chatBot = await createChatbot(value)
  return res.status(200).json({
    ...chatBot,
  })
}

export const UpdateChatbot = async (req, res) => {
  let chatbotId

  try {
    chatbotId = parseInt(req.params.chatbotId)
  } catch (e) {
    res.status(404).json({
      error: 'Invalid chatbot id',
    })
  }

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
    updatedChatbot = await updateChatBot(chatbotId, value, {
      archived: false,
    })
  } catch (e) {
    return res.status(404).json({
      message: 'no chatbot found',
    })
  }

  return res.status(200).json(updatedChatbot)
}

export const AddWebsiteToChatbot = async (req, res) => {
  let chatbotId

  try {
    chatbotId = parseInt(req.params.chatbotId)
  } catch (e) {
    res.status(404).json({
      error: 'invalid chatbot id',
    })
  }

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
  let dataStream = null
  try {
    dataStream = await createDataStream(chatbotId, {
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
  const siteContent = await Promise.all(
    dataStream.data.activeLinks.map((url) => siteLoader(url))
  )
  const splittedContent = await documentSplitter(
    siteContent.reduce((prev, curr) => {
      prev = [...prev, ...curr]
      return curr
    }, [])
  )

  const chatbot = await findChatbotById(chatbotId)

  if (!chatbot) {
    return res.status(404).json({
      error: 'chatbot not found',
    })
  }

  const index = getChatbotIndex(chatbot.vectorStore.indexName) //add name from chatbot
  const embeddings = await openAIEmbedding.embedDocuments(
    splittedContent.map(({ pageContent }) => pageContent)
  )
  const dataToBeEmbedded = embeddings.map((values) => {
    return {
      id: uuidV1(),
      values,
    }
  })
  await insertIndex(index, dataToBeEmbedded)
  try {
    dataStream = await updateDataStream(
      chatbotId,
      dataStream.id,
      {
        indexIds: dataToBeEmbedded.map((d) => d.id),
      },
      {
        archived: false,
      }
    )
  } catch (e) {
    return res.status(404).json({
      error: 'chatbot not found',
    })
  }
  return res.status(200).json(dataStream)
}

export const GetChatbotDetails = async (req, res) => {
  let chatbotId

  try {
    chatbotId = parseInt(req.params.chatbotId)
  } catch (e) {
    res.status(404).json({
      error: 'Invalid chatbot id',
    })
  }

  const chatbot = await findChatbotById(chatbotId, { archived: false })

  if (!chatbot) {
    return res.status(404).json({
      message: 'chatbot not found',
    })
  }
  return res.status(200).json(chatbot)
}

export const UpdateWebsite = async (req, res) => {
  let websiteId, chatbotId

  try {
    websiteId = parseInt(req.params.websiteId)
  } catch (e) {
    res.status(404).json({
      error: 'Invalid website id',
    })
  }

  try {
    chatbotId = parseInt(req.params.chatbotId)
  } catch (e) {
    res.status(404).json({
      error: 'Invalid chatbot id',
    })
  }

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
      chatbotId,
      websiteId,
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
    await setDataInCache(`dataStream-${updatedDataStream.id}`, {
      status: 'PROCESSING',
      code: null,
    })
    eventManager.emit('dataStream:website:update', {
      chatbotId,
      dataStreamObject: updatedDataStream,
      activeLinks: value.activeLinks,
    })
  }
  return res.status(202).json({
    message: 'request accepted',
  })
}

export const GetWebsite = async (req, res) => {
  let websiteId, chatbotId

  try {
    websiteId = parseInt(req.params.websiteId)
  } catch (e) {
    res.status(404).json({
      error: 'Invalid website id',
    })
  }

  try {
    chatbotId = parseInt(req.params.chatbotId)
  } catch (e) {
    res.status(404).json({
      error: 'Invalid chatbot id',
    })
  }

  let website = await getDataStreamById(chatbotId, websiteId, {
    archived: false,
  })

  if (!website) {
    return res.status(404).json({
      message: 'website not found',
    })
  }

  return res.status(200).json(website)
}

export const ArchiveChatbot = async (req, res) => {
  let chatbotId

  try {
    chatbotId = parseInt(req.params.chatbotId)
  } catch (e) {
    res.status(404).json({
      error: 'Invalid chatbot id',
    })
  }

  const chatbot = await updateChatBot(chatbotId, {
    archived: true,
  })
  if (!chatbot) {
    return res.status(404).json({
      message: 'chatbot not found',
    })
  }
  return res.status(200).json(chatbot)
}

export const ArchiveWebsite = async (req, res) => {
  let websiteId, chatbotId

  try {
    websiteId = parseInt(req.params.websiteId)
  } catch (e) {
    res.status(404).json({
      error: 'Invalid website id',
    })
  }

  try {
    chatbotId = parseInt(req.params.chatbotId)
  } catch (e) {
    res.status(404).json({
      error: 'Invalid chatbot id',
    })
  }

  let updatedWebsite = null
  try {
    updatedWebsite = await updateDataStream(chatbotId, websiteId, {
      archived: true,
    })
  } catch (e) {
    return res.status(404).json({
      message: 'site not found',
    })
  }

  return res.status(200).json(updatedWebsite)
}

export const WebsiteStatusProvider = async (req, res) => {
  let websiteId, chatbotId

  try {
    websiteId = parseInt(req.params.websiteId)
  } catch (e) {
    res.status(404).json({
      error: 'Invalid website id',
    })
  }

  try {
    chatbotId = parseInt(req.params.chatbotId)
  } catch (e) {
    res.status(404).json({
      error: 'Invalid chatbot id',
    })
  }

  const chatbot = await updateChatBot(chatbotId, {
    archived: true,
  })
  if (!chatbot) {
    return res.status(404).json({
      message: 'chatbot not found',
    })
  }

  const dataStream = await getDataStreamById(chatbotId, websiteId, {
    archived: false,
  })

  if (!dataStream) {
    return res.status(404).json({
      message: 'website not found',
    })
  }

  const dataFromCache = await getDataFromCache(`dataStream-${websiteId}`)
  if(!dataFromCache){
    return res.status(404).json({
      message: 'no status available'
    })
  }
  if(dataFromCache.status === 'ERROR'){
    return res.status(400).json(dataFromCache)
  }
  return res.status(200).json(dataFromCache)
}
