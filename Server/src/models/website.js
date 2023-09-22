import { prisma } from './index.js'

export const createWebsite = async (chatbotId, data) => {
  const chatBot = await prisma.chatbot.findFirst({
    where: {
      id: chatbotId,
      archived: false,
    },
  })
  if (!chatBot) {
    throw new Error('chatbot not found')
  }
  return prisma.website.create({
    data: {
      chatbotId,
      ...data,
    },
  })
}

export const updateWebsite = (chatbotId, websiteId, data, filter = {}) => {
  return prisma.website.update({
    where: {
      id: websiteId,
      chatbotId: chatbotId,
      ...filter,
    },
    data,
  })
}

export const getWebsiteByIds = (chatbotId, websiteId, filter = {}) => {
  return prisma.website.findFirst({
    where: {
      id: websiteId,
      chatbotId: chatbotId,
      ...filter,
    },
  })
}
