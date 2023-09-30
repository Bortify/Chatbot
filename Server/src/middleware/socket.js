import { findChatbotWithKey } from '../models/chatbot.js'

export const attachChatBotMiddleware = async (socket, next) => {
  const { identifier } = socket.handshake.auth
  const chatbot = await findChatbotWithKey(identifier, {
    archived: false,
    active: true,
  })
  if (!chatbot) {
    socket.disconnect()
    console.log('invalid chatbot')
    return next(new Error('Invalid Chatbot Identifier'))
  } else {
    socket.chatbot = chatbot
    next()
  }
}
