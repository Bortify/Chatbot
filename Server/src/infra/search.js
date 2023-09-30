import { nearestSearch } from '../models/pinecone.js'
import { textEmbedder } from './embedder.js'

export const similaritySearch = async (indexName, text) => {
  const embeddings = await textEmbedder(text)
  const nearestVector = await nearestSearch(
    indexName,
    embeddings.data[0].embedding
  )
  return nearestVector.matches[0].metadata.context
}
