import serverApi from '@/api/server'
import { NextRequest } from 'next/server'

type PropType = {
  params: {
    chatbotId: string
    orgId: string
  }
}

export async function POST(request: NextRequest, props: PropType) {
  const payload = await request.json()
  return serverApi(
    `organisation/${props.params.orgId}/chatbot/${props.params.chatbotId}/data`,
    {
      method: 'POST',
      body: payload,
      options: {
        useNextResponse: true,
      },
    }
  )
}
