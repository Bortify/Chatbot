import { knowledgeSourceStatus } from "@/constants/knowledgeSource"

export type ChatbotType = {
  name?: ChatbotDetails['name']
  active?: ChatbotDetails['active']
  configuration?: ChatbotConfiguration
}

export type ChatbotConfiguration = {
  errorText: string
  maxUserMsgAllowed: number
  greetingMessage: string
  limitExceedText: string
  thinkingText: string
  placeholder: string
  style: {
    color: {
      icon: {
        background: string
        text: string
      }
      typingArea: {
        background: string
        text: string
      }
      sendButton: {
        background: string
        text: string
      }
      header: {
        background: string
        text: string
      }
      message: {
        user: {
          background: string
          text: string
        }
        machine: {
          background: string
          text: string
        }
      }
      thinkingContainer: {
        text: string
      }
      body: string
    }
    iconPosition: {
      right: number
      bottom: number
    }
  }
  initialPrompts: Array<{
    label: string
    message: string
  }>
}

export type ChatbotDetails = {
  id: number
  key: string
  name: string
  configuration: ChatbotConfiguration
  archived: boolean
  active: boolean
  organisationId: number
  tokens: number
  knowledgeBase: {
    id: number
    indexName: string
    chatbotId: number
    knowledgeSource: [
      {
        id: number
        name: string
        data: {
          activeLinks: Array<string>
        }
        knowledgeBaseId: number
        archived: boolean
        type: 'SITE'
        indexIds: Array<string>
        status: keyof typeof knowledgeSourceStatus
      }
    ]
  }
}

export type KnowledgeSource = {
  name: string
  hostURL: string
  activeLinks: Array<string>
}
