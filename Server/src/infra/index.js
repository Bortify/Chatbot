import { OpenAI } from 'langchain/llms/openai'
import { BufferMemory } from 'langchain/memory'
import { PromptTemplate } from 'langchain/prompts'
import { ConversationalRetrievalQAChain } from 'langchain/chains'

import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import { OpenAI as OpenAIConfig } from '../config.js'
import { loadProducts } from './loader/index.js'
import { openAiEmbedder } from './embedder/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export class ChatBotInfra {
  #init = async ({ products: { dir }, embeddings: { config } }) => {
    this.docs = await loadProducts(dir)
    this.vectorStore = await openAiEmbedder(config)
    const retriever = this.vectorStore.asRetriever(1, 'similarity')
    this.chain = ConversationalRetrievalQAChain.fromLLM(this.llm, retriever, {
      memory: new BufferMemory({
        memoryKey: 'chat_history',
      }),
    })
    this.prompt = new PromptTemplate({
      template: template,
      inputVariables: ['history','input']
    })
  }

  constructor() {
    const llm = new OpenAI({
      openAIApiKey: OpenAIConfig.API_KEY,
    })

    const productPath = resolve(
      __dirname,
      '..',
      '..',
      'dummy_data',
      'products.csv'
    )

    this.#init({
      products: {
        dir: productPath,
      },
      embeddings: {
        config: {},
      },
    })

    this.llm = llm
  }

  getPredition = async (message) => {
    // const result = await this.llm.predict(message)
    const result = await this.chain.call({
      question: message,
    })
    return result.text
  }
}

const template = `
The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

Current conversation:
{history}
Friend: {input}
AI:`
