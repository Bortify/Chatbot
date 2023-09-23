import { findChatbotWithKey } from '../models/chatbot.js'

export const attachChatBotMiddleware = async (socket, next) => {
  const { identifier } = socket.handshake.auth
  const chatbot = await findChatbotWithKey(identifier, {
    archived: false,
    active: true,
  })
  if (!chatbot) {
    next(new Error('Invalid Chatbot Identifier'))
  }
  socket.chatbot = chatbot
  next()
}
