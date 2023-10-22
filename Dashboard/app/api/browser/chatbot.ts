import browserApi from '.'

export function listChatbots({ orgId }: { orgId: number }) {
  return browserApi(`/api/organisation/${orgId}/chatbot`, {
    method: 'GET',
    body: null,
  })
}
