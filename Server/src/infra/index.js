import { OpenAI } from 'langchain/llms/openai'

import { OpenAI as OpenAIConfig } from '../config.js'

export class ChatBotInfra {
  constructor() {
    const llm = new OpenAI({
      openAIApiKey: OpenAIConfig.API_KEY,
    })
    this.llm = llm
  }

  getPredition = async (message) => {
    const result = await this.llm.predict(message)
    return result
  }
}
