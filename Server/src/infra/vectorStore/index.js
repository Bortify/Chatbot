import { PineconeStore } from 'langchain/vectorstores/pinecone'

import { openAIEmbedding } from '../embedder/index.js'

export const loadDocsIntoPinecon = (docs, index) =>
  PineconeStore.fromDocuments(docs, openAIEmbedding, {
    pineconeIndex: index,
  })
