import { similaritySearch } from './search.js'

export class ChatBotInfra {
  constructor({ indexName }) {
    this.indexName = indexName
  }

  predict = async (query) => {
    const result = await similaritySearch(this.indexName, query)
    return result
  }
}
