import { KnowledgeSource } from '@/lib/type/chatbot'
import { knowledgeSourceStatus } from '@/constants/knowledgeSource'
import browserApi from '.'

export async function createKnowledgeSource({
  orgId,
  chatbotId,
  payload,
}: {
  orgId?: number
  chatbotId?: number
  payload: KnowledgeSource
}): Promise<void> {
  if (!orgId || !chatbotId) {
    throw new Error(`id's must must provided`)
  }
  return browserApi(
    `/api/organisation/${orgId}/chatbot/${chatbotId}/knowledgeSource`,
    {
      method: 'POST',
      body: payload,
    }
  )
}

export async function getKnowledgeStatus({
  chatbotId,
  knowledgeId,
  orgId,
}: {
  chatbotId: number
  knowledgeId: number
  orgId: number
}): Promise<{
  status: keyof typeof knowledgeSourceStatus
  code: string
}> {
  return browserApi(
    `/api/organisation/${orgId}/chatbot/${chatbotId}/knowledgeSource/${knowledgeId}`,
    {
      method: 'GET',
      body: null,
    }
  )
}

export async function deleteKnowledgeSource({
  chatbotId,
  knowledgeId,
  orgId,
}: {
  chatbotId: number
  knowledgeId: number
  orgId: number
}): Promise<void> {
  return browserApi(
    `/api/organisation/${orgId}/chatbot/${chatbotId}/knowledgeSource/${knowledgeId}`,
    {
      method: 'DELETE',
      body: null,
    }
  )
}
