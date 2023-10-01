import { prisma } from './index.js'

export const createVectorStore = (chatbotId, data) => {
  return prisma.knowledgeBase.create({
    data: {
      chatbotId,
      ...data,
    },
  })
}
