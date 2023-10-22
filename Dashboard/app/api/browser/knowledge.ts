import { KnowledgeSource } from '@/lib/type/chatbot'
import browserApi from '.'

export async function createKnowledgeSource({
  orgId,
  chatbotId,
  payload,
}: {
  orgId?: number
  chatbotId?: number
  payload: KnowledgeSource
}) {
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
