import { nearestSearch } from '../models/pinecone.js'
import { textEmbedder } from './embedder.js'

export const similaritySearch = async (indexName, text) => {
  const embeddings = await textEmbedder(text)
  const nearestVector = await nearestSearch(
    indexName,
    embeddings.data[0].embedding,
    1
  )
  return nearestVector.matches.reduce((prev, vector) => {
    prev = prev + ' ' + vector.metadata.context
    return prev
  }, '')
}
