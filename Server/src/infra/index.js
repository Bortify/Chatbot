import { retrievalQAchain, vectorDBQAChain } from './chains/index.js'
import { getLLM } from './models/index.js'
import { initializeVectorStore } from './vectorStore/index.js'

export class ChatBotInfra {
  #init = async ({ indexName }) => {
    const vectorStore = await initializeVectorStore(indexName)
    this.chain = vectorDBQAChain({
      llm: this.llm,
      vectorStore
    })
  }

  constructor({ indexName }) {
    this.llm = getLLM()
    this.#init({ indexName })
  }

  predict = async (query) => {
    const ans = await this.chain.call({ query })
    return ans.text
  }
}
