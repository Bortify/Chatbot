import { prisma } from './index.js'

export const createOrGetConversation = (conversationId, chatbotId) =>
    prisma.conversation.upsert({
        create: {
            id: conversationId,
            chatbotId,
        },
        where: {
            id: conversationId,
            chatbotId,
        },
        update: {},
    })

export const appendMessageToConversation = (conversationId, message, author) =>
    prisma.message.create({
        data: {
            content: message,
            author,
            conversationId,
        },
    })

export const updateSummary = (conversationId, chatbotId, summary) =>
    prisma.conversation.update({
        data: {
            summary,
        },
        where: {
            id: conversationId,
            chatbotId,
        },
    })

export const getMessages = (conversationId, filter = {}, take = 10) =>
    prisma.message.findMany({
        where: {
            conversationId,
            ...filter,
        },
        orderBy: {
            timestamp: 'asc',
        },
        take,
    })

export const getConversationById = (conversationId) =>
    prisma.conversation.findFirst({
        where: {
            id: conversationId,
        },
    })

export const updateMessage = (messageId, data) =>
    prisma.message.update({
        where: {
            id: messageId,
        },
        data,
    })
