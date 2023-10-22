import serverApi from '@/app/api'
import { NextRequest } from 'next/server'

type PropType = {
  params: {
    chatbotId: number
    orgId: number
  }
}

export async function GET(request: NextRequest, props: PropType) {
  return serverApi(
    `/organisation/${props.params.orgId}/chatbot/${props.params.chatbotId}`,
    {
      method: 'GET',
      body: {},
      options: {
        useNextResponse: true,
      },
    }
  )
}

export async function PUT(request: NextRequest, props: PropType) {
  const payload = await request.json()
  return serverApi(
    `/organisation/${props.params.orgId}/chatbot/${props.params.chatbotId}`,
    {
      method: 'PUT',
      body: payload,
      options: {
        useNextResponse: true,
      },
    }
  )
}

export async function DELETE(request: NextRequest, props: PropType) {
  return serverApi(
    `/organisation/${props.params.orgId}/chatbot/${props.params.chatbotId}`,
    {
      method: 'DELETE',
      body: {},
      options: {
        useNextResponse: true,
      },
    }
  )
}
