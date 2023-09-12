import { CSVLoader } from 'langchain/document_loaders/fs/csv'

export const loadProducts = async (dir) => {
  const loader = new CSVLoader(dir)
  const docs = await loader.load()
  return docs
}
