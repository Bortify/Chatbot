import { findChatbotWithKey } from '../models/chatbot.js'

// TODO (Hiten): use this middleware for sockets to identify chatbot

export const AttachChatBotToRequest = async (req, res, next) => {
  const key = req.header('chatbot-key')
  if (!key) {
    return res.status(401).json({
      error: [
        {
          message: 'key is not present',
        },
      ],
    })
  }
  const chatbot = await findChatbotWithKey(key)
  if (!chatbot) {
    return res.status(401).json({
      error: [
        {
          message: 'key is invalid',
        },
      ],
    })
  }
  console.log(chatbot)
  req.chatbot = chatbot
  next()
}
