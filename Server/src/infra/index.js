import { createAgent } from './agents/index.js'
import { retrievalQAchain } from './chains/index.js'
import { getLLM } from './models/index.js'
import { generalQuestionResolution, productRecommendor } from './tools/index.js'
import { getContentStore, getProductStore } from './vectorStore/index.js'

export class ChatBotInfra {
  #init = async () => {
    const contentStore = await getContentStore()
    this.generalQuestionChain = retrievalQAchain({
      llm: this.llm,
      retriever: contentStore.asRetriever(),
    })
  }

  constructor() {
    this.llm = getLLM()
    this.#init()
  }

  predict = async (query) => {
    const ans = await this.generalQuestionChain.call({ query })
    return ans.text
  }
}
