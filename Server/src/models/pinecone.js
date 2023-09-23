import { pinecone } from './index.js'

export const getChatbotIndex = (name) => {
  return pinecone.index(name)
}

export const createIndex = (name, options = {}) => {
  return pinecone.createIndex({
    name,
    metric: 'cosine',
    dimension: 1536,
    ...options,
  })
}

export const insertIndex = (index, data) => {
  return index.upsert(data)
}

export const deleteIndex = (index, ids) => {
  return index.deleteMany(ids)
}
