export type ChatbotType = {
  name?: string
  active?: boolean
  id?: number
  key?: string
  tokens?: number
  configuration?: object
}

export type ChatbotDetails = {
  id: number
  key: string
  name: string
  configuration: object
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
      }
    ]
  }
}

export type KnowledgeSource = {
  name: string
  hostURL: string
  activeLinks: Array<string>
}
