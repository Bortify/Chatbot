import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

export const documentSplitter = (
  docs,
  { chunkSize = 500, chunkOverlap = 0 } = {}
) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkOverlap,
    chunkSize,
  })
  return splitter.splitDocuments(docs)
}
