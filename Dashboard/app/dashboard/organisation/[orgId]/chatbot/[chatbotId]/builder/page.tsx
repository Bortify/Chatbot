import React from 'react'

import { getChatbot } from '@/api/server/chatbot'
import VisualBuilderContainer from '@/containers/Builder'

type PagePropsType = {
  params: {
    orgId: string
    chatbotId: string
  }
}

async function Builder({ params }: PagePropsType) {
  const chatbot = await getChatbot({
    orgId: parseInt(params.orgId),
    chatbotId: parseInt(params.chatbotId),
  })
  return <VisualBuilderContainer orgId={parseInt(params.orgId)} chatbot={chatbot} />
}

export default Builder
