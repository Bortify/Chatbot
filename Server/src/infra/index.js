import { retrievalQAchain } from './chains/index.js'
import { getLLM } from './models/index.js'

export class ChatBotInfra {
  #init = async () => {
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
