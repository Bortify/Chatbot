import { AuthorType } from '@prisma/client'
import {
    appendMessageToConversation,
    getMessages,
} from '../models/conversation.js'
import { findChatbotById } from '../models/chatbot.js'

export const GetAllMessages = async (req, res) => {
    const conversationId = req.conversation.id
    const chatbot = await findChatbotById(req.conversation.chatbotId)
    let messages = await getMessages(conversationId)
    if (!messages.length) {
        await appendMessageToConversation(
            conversationId,
            chatbot.configuration.greetingMessage,
            AuthorType.MACHINE
        )
        messages = await getMessages(conversationId)
    }
    return res.status(200).json(messages)
}
