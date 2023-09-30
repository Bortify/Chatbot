import { createTextFromTemplate } from "../../utils/prompt.js"

const chatbotResponse = (inputVariableObject) =>{
    const inputVariables = ['context','query','errorText']
    const template = `You are a friendly chatbot. Context is "{context}". you to answer this "{query}". 
       Create small and to the point answers. Use markdown for answering. If you don't know, just say "{errorText}"`
    return createTextFromTemplate(template,inputVariables,inputVariableObject)
}

const chatbotResponseWithHistory = (inputVariableObject) =>{
    const template = `Use this "{history}" as history of previous chats. 
    You are a friendly chatbot. Context is "{context}". you to answer this "{query}". 
    Create small and to the point answers. Use markdown for answering. If you don't know, just say "{errorText}"`
    const inputVariables = ['context','query','errorText', 'history']
    return createTextFromTemplate(template,inputVariables,inputVariableObject)
}

const defaultPromptTemplateMap = {
  'chatbot:response': {
    template: chatbotResponse,
    inputVariables: ['context','query','errorText']
  },
  'chatbot:response:withHistory': {
    template: chatbotResponseWithHistory,
    inputVariables: ['context','query','errorText', 'history']
  }
}

export default async function getPromptTemplate(templateName, chatbotId){
    let template = defaultPromptTemplateMap[templateName]
    if(template){
        return template.template
    }
    // TODO (Hiten): Add code to install custom propmt from dahsboard
}