import {
  chatbotResponse,
  chatbotResponseWithHistory,
  personality,
} from './chatbot.js'
import { mergeSummary, summary } from './summary.js'

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
    inputVariables: [],
  },
  'chatbot:personality': {
    template: personality,
    inputVariables: null,
  },
  'chatbot:summary:merge': {
    template: mergeSummary,
    inputVariables: ['oldSummary', 'newSummary'],
  },
}

export default async function getPromptTemplate(templateName, chatbotId) {
  let template = defaultPromptTemplateMap[templateName]
  if (template) {
    return template.template
  }
  // TODO (Hiten): Add code to install custom prompt from dahsboard
}
