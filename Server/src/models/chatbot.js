import { prisma } from './index.js'

export const createChatbot = (data) => {
  return prisma.chatbot.create({
    data: {
      vectorStore: {
        create: {
          indexName: 'chatbot',
        },
      },
      ...data,
    },
  })
}

export const findChatbotWithKey = (key, filter = {}) => {
  return prisma.chatbot.findFirst({
    where: {
      key,
      ...filter,
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
      dataLake: true,
      vectorStore: true,
    },
  })
}
