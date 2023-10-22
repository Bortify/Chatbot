import { findChatbotById } from '../models/chatbot.js'

export const attachChatbotMiddleware = async (req, res, next) => {
    let chatbotId = null

    try {
        chatbotId = parseInt(req.params.chatbotId)
    } catch (e) {
        return res.status(400).json({
            errors: [
                {
                    message: 'invalid chatbot id',
                    path: ['chatbot'],
                },
            ],
        })
    }

    const chatbot = await findChatbotById(chatbotId, {
        organisationId: req.organisation.id,
        archived: false,
    })

    if (!chatbot) {
        return res.status(404).json({
            errors: [
                {
                    message: 'chatbot not found',
                    path: ['chatbot'],
                },
            ],
        })
    }

    req.chatbot = chatbot
    next()
}
