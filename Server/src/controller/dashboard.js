import Joi from 'joi'

import {
  createChatbot,
  findChatbotById,
  updateChatBot,
} from '../models/chatbot.js'
import {
  createWebsite,
  getWebsiteByIds,
  updateWebsite,
} from '../models/website.js'

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

  try {
    const website = await createWebsite(chatbotId, value)
    return res.status(200).json(website)
  } catch (e) {
    res.status(404).json({
      error: 'chatbot not found',
    })
  }
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

  let updatedWebsite = null
  try {
    updatedWebsite = await updateWebsite(chatbotId, websiteId, value, {
      archived: false,
    })
  } catch (e) {
    return res.status(404).json({
      message: 'site not found',
    })
  }

  return res.status(200).json(updatedWebsite)
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

  let website = await getWebsiteByIds(chatbotId, websiteId, { archived: false })

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
    updatedWebsite = await updateWebsite(chatbotId, websiteId, {
      archived: true,
    })
  } catch (e) {
    return res.status(404).json({
      message: 'site not found',
    })
  }

  return res.status(200).json(updatedWebsite)
}
