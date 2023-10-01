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

export const Indexes = {
  NAME: process.env.PINECON_INDEX_NAME || 'chatbot',
}

export const Redis = {
  URL: process.env.REDIS_URL,
  USERNAME: process.env.REDIS_USERNAME,
  PASSWORD: process.env.REDIS_PASSWORD,
}

export const Auth = {
  SECRET: process.env.JWT_SECRET || 'secret',
  TOKEN_EXPIRY: parseInt(process.env.JWT_TOKEN_EXPIRY || 60 * 60 * 24 * 1000), // 1 day
}

export const EmailClient = {
  API: process.env.MAILGUN_API || 'api',
  DOMAIN: process.env.MAILGUN_DOMAIN || 'domain'
}