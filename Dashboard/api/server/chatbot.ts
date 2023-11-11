import serverApi from './index'

export async function getChatbot({
  chatbotId,
  orgId,
}: {
  chatbotId: number
  orgId: number
}) {
  return serverApi(`/organisation/${orgId}/chatbot/${chatbotId}`, {
    method: 'GET',
    body: {},
    options: {},
  })
}
