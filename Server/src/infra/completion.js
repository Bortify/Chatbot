import OpenAI from './llm.js'
import getPromptTemplate from './prompts/index.js'

export const getResponse = async (inputVariables, templateName) => {
  const promptTemplate = await getPromptTemplate(templateName)
  const res = await OpenAI.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: promptTemplate(inputVariables),
      },
    ],
    model: 'gpt-3.5-turbo',
  })
  return res.choices[0].message.content
}
