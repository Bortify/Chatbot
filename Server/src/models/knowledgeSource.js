import { prisma } from './index.js'

export const createKnowledgeSource = async (knowledgeBaseId, data) => {
    return prisma.knowledgeSource.create({
        data: {
            knowledgeBaseId,
            ...data,
        },
    })
}

export const updateKnowledgeSource = (
    knowledgeBaseId,
    knowledgeSourceId,
    data,
    filter = {}
) => {
    return prisma.knowledgeSource.update({
        where: {
            id: knowledgeSourceId,
            knowledgeBaseId,
            ...filter,
        },
        data,
    })
}

export const getKnowledgeSourceById = (
    knowledgeBaseId,
    knowledgeSourceId,
    filter = {}
) => {
    return prisma.knowledgeSource.findFirst({
        where: {
            id: knowledgeSourceId,
            knowledgeBaseId,
            ...filter,
        },
    })
}
