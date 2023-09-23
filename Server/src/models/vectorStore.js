import { prisma } from './index.js'

export const createVectorStore = (chatbotId, data) => {
  return prisma.vectorStore.create({
    data: {
      chatbotId,
      ...data,
    },
  })
}
