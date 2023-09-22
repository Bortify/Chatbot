import { FaissStore } from 'langchain/vectorstores/faiss'

import { VectorStore } from '../../config.js'
import { openAIEmbedding } from '../embedder/index.js'

export const getProductStore = () =>
  FaissStore.load(VectorStore.PRODUCT_DB_DIR, openAIEmbedding)

export const getContentStore = () =>
  FaissStore.load(VectorStore.TEXT_CONTENT_DB_DIR, openAIEmbedding)
