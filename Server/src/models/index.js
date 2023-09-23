import { PrismaClient } from '@prisma/client'
import { Pinecone } from '@pinecone-database/pinecone'

import { PineCone as PineConfig } from '../config.js'

export const prisma = new PrismaClient()

export const pinecone = new Pinecone({
  apiKey: PineConfig.API_KEY,
  environment: PineConfig.ENVIRONMENT,
})