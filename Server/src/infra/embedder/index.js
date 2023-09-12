import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

import { Embeddings, OpenAI as OpenAIConfig } from '../../config.js'

export const openAIEmbedding = new OpenAIEmbeddings({
  openAIApiKey: OpenAIConfig.API_KEY,
  batchSize: Embeddings.BATCH_SIZE,
})
