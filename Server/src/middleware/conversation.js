import { getConversationById } from '../models/conversation.js'

export const attachConversationMiddleware = async (req, res, next) => {
  let conversationId = req.params.conversationId
  const conversation = await getConversationById(conversationId)
  if (!conversation) {
    return res.status(404).json({
      message: 'conversation not found',
    })
  }
  req.conversation = conversation
  next()
}
