import { config } from 'dotenv'

config()

export const Server = {
  PORT: process.env.PORT || 8080,
}

export const Environ = {
  ENVIRONMENT: process.env.NODE_ENV || 'development',
}

export const OpenAI = {
  API_KEY: process.env.OPEN_AI_KEY,
}

export const PineCone = {
  API_KEY: process.env.PINECONE_API_KEY,
  ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
}

export const Embeddings = {
  BATCH_SIZE: 512,
  DB_FAISS_PATH: 'vectorstore/db_faiss',
}
