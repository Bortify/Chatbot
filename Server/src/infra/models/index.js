import { OpenAI } from 'langchain/llms/openai'

import { OpenAI as OpenAIConfig } from '../../config.js'

export const getLLM = (config = {}) =>
  new OpenAI({
    openAIApiKey: OpenAIConfig.API_KEY,
    ...config,
  })
