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
    this.agent = await createAgent({ llm: this.llm, tools })
  }

  constructor() {
    this.llm = getLLM()
    this.#init()
  }

  predict = async (query) => {
    const ans = await this.llm.predict(query)
    return ans
  }
}

// import { dirname, resolve } from 'path'
// import { fileURLToPath } from 'url'
// import { FaissStore } from './vectorStore/index.js'
// import { csvLoader, textLoader } from './loaders/index.js'
// import { openAIEmbedding } from './embedder/index.js'
// import { Embeddings } from '../config.js'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)
// loadDocs = async () => {
//   console.log('loading started')
//   const productPath = resolve(
//     __dirname,
//     '..',
//     '..',
//     'dummy_data',
//     'products.csv'
//   )
//   const textPath = resolve(__dirname, '..', '..', 'dummy_data', 'text.txt')
//   const productsDoc = await csvLoader(productPath)
//   const textDoc = await textLoader(textPath)

//   const productStore = await FaissStore.fromDocuments(productsDoc, openAIEmbedding)
//   const textStore = await FaissStore.fromDocuments(textDoc,openAIEmbedding)
//   await productStore.save(Embeddings.PRODUCT_DB_DIR)
//   await textStore.save(Embeddings.TEXT_CONTENT_DB_DIR)
//   console.log('loading finished')
// }
