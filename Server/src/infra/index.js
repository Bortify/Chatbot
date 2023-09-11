import { OpenAI } from 'langchain/llms/openai'
import { CSVLoader } from "langchain/document_loaders/fs/csv"
import {dirname, resolve} from 'path'
import { fileURLToPath } from 'url'

import { OpenAI as OpenAIConfig } from '../config.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class ChatBotInfra {
  constructor() {
    const llm = new OpenAI({
      openAIApiKey: OpenAIConfig.API_KEY,
    })
    this.llm = llm
    const productPath = resolve(__dirname,'..','..','dummy_data','products.csv')
    this.loadProducts(productPath)
  }

  getPredition = async (message) => {
    const result = await this.llm.predict(message)
    return result
  }

  loadProducts = async (dir) => {
    const loader = new CSVLoader(dir)
    const docs = await loader.load()
    this._products = docs
  }
}