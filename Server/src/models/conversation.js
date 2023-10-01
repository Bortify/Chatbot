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

export const appendMessageToConveration = (conversationId, message, author) =>
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

export const getMessages = (conversationId) =>
  prisma.message.findMany({
    where: {
      conversationId,
    },
    orderBy: {
      timestamp: 'asc',
    },
  })

export const getConversationById = (conversationId) =>
  prisma.conversation.findFirst({
    where: {
      id: conversationId,
    },
  })
