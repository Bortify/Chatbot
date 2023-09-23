import { prisma } from './index.js'

export const createDataStream = async (chatbotId, data) => {
  const chatBot = await prisma.chatbot.findFirst({
    where: {
      id: chatbotId,
      archived: false,
    },
  })
  if (!chatBot) {
    throw new Error('chatbot not found')
  }
  return prisma.dataStream.create({
    data: {
      chatbotId,
      ...data,
    },
  })
}

export const updateDataStream = (chatbotId, websiteId, data, filter = {}) => {
  return prisma.dataStream.update({
    where: {
      id: websiteId,
      chatbotId: chatbotId,
      ...filter,
    },
    data,
  })
}

export const getDataStreamById = (chatbotId, websiteId, filter = {}) => {
  return prisma.dataStream.findFirst({
    where: {
      id: websiteId,
      chatbotId: chatbotId,
      ...filter,
    }
  })
}
