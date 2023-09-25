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

export const updateDataStream = (chatbotId, dataStreamId, data, filter = {}) => {
  return prisma.dataStream.update({
    where: {
      id: dataStreamId,
      chatbotId: chatbotId,
      ...filter,
    },
    data,
  })
}

export const getDataStreamById = (chatbotId, dataStreamId, filter = {}) => {
  return prisma.dataStream.findFirst({
    where: {
      id: dataStreamId,
      chatbotId: chatbotId,
      ...filter,
    }
  })
}
