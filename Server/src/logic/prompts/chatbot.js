import { createTextFromTemplate } from '../../utils/prompt.js'

export const chatbotResponse = (inputVariableObject) => {
    const inputVariables = ['context', 'query', 'errorText']
    const template = `Context is "{context}". You have to answer this "{query}". 
         Create small and to the point answers. Use markdown for answering. If you don't know, just say "{errorText}".`
    return createTextFromTemplate(template, inputVariables, inputVariableObject)
}

export const chatbotResponseWithHistory = (inputVariableObject) => {
    const template = `Generate a short and to the point response based on the following:
          User: "{query}"
          In this conversation, we've discussed: "{history}"
          Context: "{context}"
          If the question is out of context, respond with: "{errorText}"
        `
    const inputVariables = ['context', 'query', 'errorText', 'history']
    return createTextFromTemplate(template, inputVariables, inputVariableObject)
}

export const personality = () => {
    const template = `
            You are a friendly chatbot. User has some queries. Answer them politely.
            Responses generated should be short and to the point. Use Markdown for answering. 
            You have to Answer in user's language`
    return template
}
