import { config } from 'dotenv'

config()

export const Server = {
  PORT: process.env.PORT || 8080,
}

export const OpenAI = {
  API_KEY: process.env.OPEN_AI_KEY,
}

export const PineCone = {
  API_KEY: process.env.PINECON_API_KEY,
  ENVIRONMENT: process.env.PINECON_ENVIRONMENT,
}

export const Embeddings = {
  BATCH_SIZE: 512,
}

export const VectorStore = {
  PRODUCT_DB_DIR: 'vectorstore/products',
  TEXT_CONTENT_DB_DIR: 'vectorstore/text'
}
