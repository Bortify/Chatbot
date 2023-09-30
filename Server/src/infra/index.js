import { AuthorType } from '@prisma/client'

import { similaritySearch } from './search.js'
import { getResponse } from './completion.js'
import {
  appendMessageToConveration,
  createOrGetConversation,
  updateSummary,
} from '../models/conversation.js'

export class ChatBotInfra {
  #init = async () => {
    this.conversation = await createOrGetConversation(
      this.config.conversationId,
      this.config.chatbot.id
    )
  }

  constructor({ indexName, chatbot, conversationId }) {
    this.config = {
      indexName,
      chatbot,
      conversationId,
    }
    this.#init()
  }

  predict = async (query) => {
    await appendMessageToConveration(
      this.conversation.id,
      query,
      AuthorType.USER
    )
    const context = await similaritySearch(this.config.indexName, query)
    const result = await getResponse(
      {
        context,
        query,
        errorText: `I can't assist you with that`,
        history: this.conversation.summary
      },
      'chatbot:response:withHistory'
    )
    await appendMessageToConveration(
      this.conversation.id,
      result,
      AuthorType.MACHINE
    )
    const summary = await getResponse(
      {
        'message.user': query,
        'message.chatbot': result,
        history: this.conversation.summary,
      },
      'chatbot:summary'
    )
    console.log('summary is',summary)
    this.conversation = await updateSummary(this.conversation.id, this.config.chatbot.id, summary)
    return result
  }
}
