import { AuthorType } from '@prisma/client'

import { similaritySearch } from './search.js'
import { getChatResponses, getSummary } from './completion.js'
import {
  appendMessageToConveration,
  createOrGetConversation,
  getMessages,
  updateSummary,
} from '../models/conversation.js'
import { updateChatBot } from '../models/chatbot.js'

export class ChatBotInfra {
  #init = async ({ indexName, chatbot, conversationId }) => {
    this.conversation = await createOrGetConversation(
      conversationId,
      chatbot.id
    )
    this.chatbot = chatbot
    this.indexName = indexName
    this.messages = (await getMessages(this.conversation.id)).map(
      ({ content, author }) => ({
        content,
        author,
      })
    )
    this.tokens = 0
  }

  constructor({ indexName, chatbot, conversationId }) {
    this.#init({ indexName, chatbot, conversationId })
  }

  predict = async (query) => {
    await appendMessageToConveration(
      this.conversation.id,
      query,
      AuthorType.USER
    )
    const context = await similaritySearch(this.indexName, query)
    this.messages.push({
      author: AuthorType.USER,
      content: query,
    })
    const result = await getChatResponses(this.conversation.id, this.messages, {
      context,
      query,
      errorText: `I can't assist you with that`,
    })
    this.messages.push({
      author: AuthorType.MACHINE,
      content: result.completion,
    })
    await appendMessageToConveration(
      this.conversation.id,
      result.completion,
      AuthorType.MACHINE
    )
    this.tokens += result.tokens
    return result.completion
  }

  #generateSummary = async () => {
    if (this.messages.length === 0) return null
    const { completion: summary, tokens } = await getSummary(
      this.conversation.id,
      this.messages
    )
    this.tokens += tokens
    await updateSummary(this.conversation.id, this.chatbot.id, summary)
  }

  #saveTokens = async () => {
    await updateChatBot(this.chatbot.id, {
      tokens: this.tokens + this.chatbot.tokens,
    })
  }

  cleanup = async () => {
    await this.#generateSummary()
    await this.#saveTokens()
  }
}
