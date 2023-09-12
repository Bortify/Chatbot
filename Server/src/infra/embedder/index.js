import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { FaissStore } from 'langchain/vectorstores/faiss'

import { Embeddings, OpenAI as OpenAIConfig } from "../../config.js"

export const openAiEmbedder = async (config) => {
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: OpenAIConfig.API_KEY,
      batchSize: Embeddings.BATCH_SIZE,
    })
    const loadedVectorStore = await FaissStore.load(
      Embeddings.DB_FAISS_PATH,
      embeddings
    )
    return loadedVectorStore
  }