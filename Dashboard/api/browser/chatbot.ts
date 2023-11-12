import { ChatbotType } from '@/lib/type/chatbot'

import browserApi from '.'

export function listChatbots({ orgId }: { orgId: number }) {
  return browserApi(`/api/organisation/${orgId}/chatbot`, {
    method: 'GET',
    body: null,
  })
}

export function createChatbot({
  orgId,
  payload,
}: {
  orgId: number
  payload: Object
}) {
  return browserApi(`/api/organisation/${orgId}/chatbot`, {
    method: 'POST',
    body: payload,
  })
}

export function getChatbot({
  orgId,
  chatbotId,
}: {
  orgId: number
  chatbotId: number
}) {
  return browserApi(`/api/organisation/${orgId}/chatbot/${chatbotId}`, {
    method: 'GET',
    body: null,
  })
}

export function updateChatbot({
  orgId,
  chatbotId,
  payload,
}: {
  orgId: number
  payload: ChatbotType
  chatbotId: number
}) {
  return browserApi(`/api/organisation/${orgId}/chatbot/${chatbotId}`, {
    method: 'PUT',
    body: payload,
  })
}

export function deleteChatbot({
  orgId,
  chatbotId,
}: {
  orgId: number
  chatbotId: number
}) {
  return browserApi(`/api/organisation/${orgId}/chatbot/${chatbotId}`, {
    method: 'DELETE',
    body: null,
  })
}
