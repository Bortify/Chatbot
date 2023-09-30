import { createTextFromTemplate } from '../../utils/prompt.js'

const chatbotResponse = (inputVariableObject) => {
  const inputVariables = ['context', 'query', 'errorText']
  const template = `You are a friendly chatbot. Context is "{context}". you to answer this "{query}". 
       Create small and to the point answers. Use markdown for answering. If you don't know, just say "{errorText}"`
  return createTextFromTemplate(template, inputVariables, inputVariableObject)
}

const chatbotResponseWithHistory = (inputVariableObject) => {
  const template = `Generate a short and to the point response based on the following:
        User: "{query}"
        In this conversation, we've discussed: "{history}"
        Context: "{context}"
        If the question is out of context, respond with: "{errorText}"
      `
  const inputVariables = ['context', 'query', 'errorText', 'history']
  return createTextFromTemplate(template, inputVariables, inputVariableObject)
}

const summary = (inputVariableObject) => {
  const template = `
            In our previous discussions, we covered: "{history}"
            The most recent exchange:
            User: "{message.user}"
            Chatbot: "{message.chatbot}"  
            generate a summary out of this in a paragraph not exceeding 400 tokens
          `
  const inputVariables = ['history', 'message.user', 'message.chatbot']
  return createTextFromTemplate(template, inputVariables, inputVariableObject)
}

const defaultPromptTemplateMap = {
  'chatbot:response': {
    template: chatbotResponse,
    inputVariables: ['context', 'query', 'errorText'],
  },
  'chatbot:response:withHistory': {
    template: chatbotResponseWithHistory,
    inputVariables: ['context', 'query', 'errorText', 'history'],
  },
  'chatbot:summary': {
    template: summary,
    inputVariables: ['history', 'message'],
  },
}

export default async function getPromptTemplate(templateName, chatbotId) {
  let template = defaultPromptTemplateMap[templateName]
  if (template) {
    return template.template
  }
  // TODO (Hiten): Add code to install custom propmt from dahsboard
}
