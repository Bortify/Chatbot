import ChatbotContainer from '@/containers/Chatbot'

type PagePropsType = {
  params: {
    orgId: number
    chatbotId: number
  }
}

export default function Chatbot({ params }: PagePropsType) {
  return <ChatbotContainer chatbotId={params.chatbotId} orgId={params.orgId} />
}
