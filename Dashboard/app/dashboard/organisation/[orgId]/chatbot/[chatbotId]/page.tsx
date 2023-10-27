import ChatbotContainer from '@/containers/Chatbot'

type PagePropsType = {
  params: {
    orgId: string
    chatbotId: string
  }
}

export default function Chatbot({ params }: PagePropsType) {
  return <ChatbotContainer chatbotId={parseInt(params.chatbotId)} orgId={parseInt(params.orgId)} />
}
