import { createAgent } from './agents/index.js'
import { getLLM } from './models/index.js'
import { generalQuestionResolution, productRecommendor } from './tools/index.js'
import { getContentStore, getProductStore } from './vectorStore/index.js'

export class ChatBotInfra {
  #init = async () => {
    const productStore = await getProductStore()
    const contentStore = await getContentStore()

    const tools = [
      productRecommendor({
        llm: this.llm,
        retriever: productStore.asRetriever(1, 'similarity'),
      }),
      generalQuestionResolution({
        llm: this.llm,
        retriever: contentStore.asRetriever(1, 'similarity'),
      }),
    ]

    this.agent = await createAgent({
      llm: this.llm,
      tools,
      config: {
        handleParsingErrors: "I don't know :(",
        verbose: true,
      },
    })
  }

  constructor() {
    this.llm = getLLM()
    this.#init()
  }

  predict = async (query) => {
    const ans = await this.llm.predict(query)
    return ans
    // const ans = await this.agent.invoke({
    //   input: query,
    // })
    // if (ans.output?.length > 0) {
    //   return ans.output
    // } else if (ans?.intermediateSteps?.[0]?.observation?.length > 0) {
    //   return ans?.intermediateSteps?.[0]?.observation?.length
    // }
    // return `I don't know :(`
  }
}
