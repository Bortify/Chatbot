import serverApi from '@/app/api'
import { NextRequest } from 'next/server'

type PropType = {
  params: {
    chatbotId: string
    orgId: string
    knowledgeSourceId: string
  }
}

export async function GET(request: NextRequest, { params }: PropType) {
  return serverApi(
    `/organisation/${params.orgId}/chatbot/${params.chatbotId}/data/${params.knowledgeSourceId}/status`,
    {
      method: 'GET',
      body: {},
      options: {
        useNextResponse: true,
      },
    }
  )
}