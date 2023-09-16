import { CSVLoader } from 'langchain/document_loaders/fs/csv'
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio'
import { TextLoader } from 'langchain/document_loaders/fs/text'

export const csvLoader = async (dir) => {
  const loader = new CSVLoader(dir)
  const docs = await loader.load()
  return docs
}

export const siteLoader = async (url, fields = {}) => {
  const loader = new CheerioWebBaseLoader(url, fields)
  const docs = await loader.load()
  return docs
}

export const textLoader = async (dir) => {
  const loader = new TextLoader(dir)
  const docs = await loader.loadAndSplit()
  return docs
}
