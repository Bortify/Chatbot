import { similaritySearch } from './search.js'
import { getResponse } from './completion.js'

export class ChatBotInfra {
  constructor({ indexName }) {
    this.indexName = indexName
  }

  predict = async (query) => {
    try {
      const context = await similaritySearch(this.indexName, query)
      const result = await getResponse(
        {
          context,
          query,
          errorText: `I can't assist you with that`
        },
        'chatbot:response'
      )
      return result
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
