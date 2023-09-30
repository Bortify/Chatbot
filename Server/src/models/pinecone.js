import { pinecone } from './index.js'

export const getIndex = (name) => {
  return pinecone.Index(name)
}

export const createIndex = (name, options = {}) => {
  return pinecone.createIndex({
    name,
    metric: 'cosine',
    dimension: 1536,
    ...options,
  })
}

export const insertIndex = (indexName, data) => {
  const index = getIndex(indexName)
  return index.upsert(data)
}

export const deleteIndex = (indexName, ids) => {
  const index = getIndex(indexName)
  return index.deleteMany(ids)
}

export const nearestSearch = (indexName, vector) => {
  const index = getIndex(indexName)
  return index.query({
    includeMetadata: true,
    vector: vector,
    topK: 1,
  })
}
