import OpenAI from './llm.js'
import getPromptTemplate from './prompts/index.js'

export const getResponse = async (inputVariables, templateName) => {
  const promptTemplate = await getPromptTemplate(templateName)
  const prompt = promptTemplate(inputVariables)
  console.log('\n', prompt, '\n')
  const res = await OpenAI.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 500,
    temperature: 0.3,
  })
  return res.choices[0].message.content
}
