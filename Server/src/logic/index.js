import { AuthorType } from '@prisma/client'

import { similaritySearch } from './search.js'
import { getChatResponses, getSummary, mergeSummary } from './completion.js'
import {
    appendMessageToConversation,
    createOrGetConversation,
    getMessages,
    updateMessage,
    updateSummary,
} from '../models/conversation.js'
import { updateChatBot } from '../models/chatbot.js'
import { prisma } from '../models/index.js'

export class Chatbot {
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
        const context = await similaritySearch(this.indexName, query)
        this.messages.push({
            author: AuthorType.USER,
            content: query,
        })
        const result = await getChatResponses(
            this.conversation.id,
            this.messages,
            {
                context,
                query,
                errorText: this.chatbot.configuration.errorText,
            }
        )
        this.messages.push({
            author: AuthorType.MACHINE,
            content: result.completion,
        })
        await prisma.$transaction([
            appendMessageToConversation(
                this.conversation.id,
                query,
                AuthorType.USER
            ),
            appendMessageToConversation(
                this.conversation.id,
                result.completion,
                AuthorType.MACHINE
            ),
        ])
        this.tokens += result.tokens
        return result.completion
    }

    #generateSummary = async () => {
        const messages = await getMessages(this.conversation.id, {
            summaryGenerated: false,
        })
        if (messages.length === 0 || this.messages.length === 0) return null
        const { completion: newSummary, tokens: newSummaryTokens } =
            await getSummary(this.conversation.id, messages)
        this.tokens += newSummaryTokens
        const { completion: summary, tokens: mergedSummaryTokens } =
            await mergeSummary({
                prevSummary: this.conversation.summary,
                currentSummary: newSummary,
            })
        this.tokens += mergedSummaryTokens
        await prisma.$transaction([
            updateSummary(this.conversation.id, this.chatbot.id, summary),
            ...messages.map(({ id }) =>
                updateMessage(id, {
                    summaryGenerated: true,
                })
            ),
        ])
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
