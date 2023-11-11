import { findChatbotWithKey } from '../models/chatbot.js'
import { createOrGetConversation } from '../models/conversation.js'

export const attachConversationMiddleware = async (req, res, next) => {
    let conversationId = req.params.conversationId
    const chatbot = await findChatbotWithKey(req.query.identifier)
    if(!chatbot){
        return res.status(404).json({
            errors: [{
                message: 'chatbot not found',
                path: ['chatbot']
            }]
        })
    }
    let conversation = await createOrGetConversation(conversationId,chatbot.id)
    req.conversation = conversation
    next()
}
