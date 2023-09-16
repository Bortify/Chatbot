import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { FaissStore } from '../infra/vectorStore/index.js'
import { csvLoader, textLoader } from '../infra/loaders/index.js'
import { openAIEmbedding } from '../infra/embedder/index.js'
import { VectorStore } from '../config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const loadDocs = async () => {
  const textPath = resolve(__dirname, '..', '..', 'dummy_data', 'text.txt')
  const productsDoc = await csvLoader(productPath)
  const textDoc = await textLoader(textPath)

  const productStore = await FaissStore.fromDocuments(
    productsDoc,
    openAIEmbedding
  )
  const textStore = await FaissStore.fromDocuments(textDoc, openAIEmbedding)
  await productStore.save(VectorStore.PRODUCT_DB_DIR)
  await textStore.save(VectorStore.TEXT_CONTENT_DB_DIR)
  console.log('loading finished')
}