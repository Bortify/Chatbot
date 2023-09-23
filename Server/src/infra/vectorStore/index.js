import { PineconeStore } from 'langchain/vectorstores/pinecone'

import { openAIEmbedding } from '../embedder/index.js'
import { getChatbotIndex } from '../../models/pinecone.js'

export const loadDocsIntoPinecon = (docs, index) =>
  PineconeStore.fromDocuments(docs, openAIEmbedding, {
    pineconeIndex: index,
  })

export const initializeVectorStore = (indexName) => {
  const index = getChatbotIndex(indexName)
  return PineconeStore.fromExistingIndex(openAIEmbedding, {
    pineconeIndex: index,
  })
}
