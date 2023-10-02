import { AuthorType } from '@prisma/client'

import OpenAI from './llm.js'
import getPromptTemplate from './prompts/index.js'

export const getChatResponses = async (
  conversationId,
  previousMessages,
  inputVariableObject
) => {
  const responsePromptTemplate = await getPromptTemplate('chatbot:response')
  const personalityTemplate = await getPromptTemplate('chatbot:personality')
  const messages = [
    {
      role: 'system',
      content: personalityTemplate(),
    },
  ]
  previousMessages.forEach(({ author, content }) => {
    messages.push({
      content,
      role: author === AuthorType.MACHINE ? 'system' : 'user',
    })
  })
  messages.push({
    role: 'user',
    content: responsePromptTemplate(inputVariableObject),
  })
  const res = await OpenAI.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo',
    max_tokens: 500,
    user: conversationId,
  })
  return {
    completion: res.choices[0].message.content,
    tokens: res.usage.total_tokens,
  }
}

export const getSummary = async (conversationId, messages) => {
  const summaryPrompt = await getPromptTemplate('chatbot:summary')
  const res = await OpenAI.chat.completions.create({
    messages: [
      ...messages.map(({ content, author }) => ({
        content,
        role: author === AuthorType.MACHINE ? 'system' : 'user',
      })),
      {
        role: 'user',
        content: summaryPrompt(),
      },
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 500,
    user: conversationId,
  })
  return {
    completion: res.choices[0].message.content,
    tokens: res.usage.total_tokens,
  }
}
