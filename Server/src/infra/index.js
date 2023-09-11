import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { OpenAI } from 'langchain/llms/openai'
import { CSVLoader } from 'langchain/document_loaders/fs/csv'
import { FaissStore } from 'langchain/vectorstores/faiss'
import { PromptTemplate } from 'langchain/prompts'
import { ConversationalRetrievalQAChain } from 'langchain/chains'

import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import { Embeddings, OpenAI as OpenAIConfig } from '../config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export class ChatBotInfra {
  #loadProducts = async (dir) => {
    console.log('products are getting loaded')
    const loader = new CSVLoader(dir)
    const docs = await loader.load()
    this.products = docs
    console.log('products are loaded')
  }

  #initEmbeddings = async (config) => {
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: OpenAIConfig.API_KEY,
      batchSize: Embeddings.BATCH_SIZE,
    })
    let vectorStore = null
    const loadedVectorStore = await FaissStore.load(
      Embeddings.DB_FAISS_PATH,
      embeddings
    )
    vectorStore = loadedVectorStore
    this.vectorStore = vectorStore
  }

  #createPromptTemplate = async () => {
    this.promptTemplate = new PromptTemplate({
      template,
      inputVariables: ['history', 'input'],
    })
  }

  #init = async ({ products: { dir }, embeddings: { config } }) => {
    await this.#loadProducts(dir)
    await this.#initEmbeddings(config)
    await this.#createPromptTemplate()
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
    const retriever = this.vectorStore.asRetriever(2, 'similarity')
    const chain = ConversationalRetrievalQAChain.fromLLM(this.llm, retriever)
    const res = await chain.call({ question: message })
    console.log('chain output: ',res)
    const result = await this.llm.predict(message)
    return result
  }
}

const template = `
The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

Current conversation:
{history}
Friend: {input}
AI:`
