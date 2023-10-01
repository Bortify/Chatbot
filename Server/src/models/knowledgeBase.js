import { prisma } from './index.js'

export const createKnowledgeBase = (chatbotId, data) => {
  return prisma.knowledgeBase.create({
    data: {
      chatbotId,
      ...data,
    },
  })
}
