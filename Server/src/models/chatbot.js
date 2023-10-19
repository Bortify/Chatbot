import { prisma } from './index.js'

export const createChatbot = (data) => {
    const { indexName = null, ...remData } = data
    return prisma.chatbot.create({
        data: {
            knowledgeBase: {
                create: {
                    indexName: indexName || 'chatbot',
                },
            },
            ...remData,
        },
    })
}

export const findChatbotWithKey = (key, filter = {}) => {
    return prisma.chatbot.findFirst({
        where: {
            key,
            ...filter,
        },
        include: {
            knowledgeBase: true,
        },
    })
}

export const updateChatBot = (chatbotId, data, filter = {}) => {
    return prisma.chatbot.update({
        where: {
            id: chatbotId,
            ...filter,
        },
        data,
    })
}

export const findChatbotById = (chatbotId, filter = {}) => {
    return prisma.chatbot.findUnique({
        where: {
            id: chatbotId,
            ...filter,
        },
        include: {
            knowledgeBase: {
                include: {
                    knowledgeSource: true,
                },
            },
        },
    })
}
