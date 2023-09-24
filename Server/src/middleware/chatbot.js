import { findChatbotById } from '../models/chatbot'

export const attachChatbotMiddleware = async (req, res, next) => {
  let chatbotId = null
  
  try {
    chatbotId = parseInt(req.params.chatbotId)
  } catch (e) {
    return res.status(400).json({
      error: 'invalid chat id',
    })
  }

  const chatbot = await findChatbotById(chatbotId, {
    organisationId: req.organisation.id,
  })

  if (!chatbot) {
    return res.status(404).json({
      error: 'chatbot not found',
    })
  }

  req.chatbot = chatbot
  next()
}
