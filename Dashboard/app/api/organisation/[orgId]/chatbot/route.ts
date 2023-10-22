import serverApi from '@/app/api'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  params: { params: { orgId: number } }
) {
  const orgId = params.params.orgId
  return serverApi(`/organisation/${orgId}/chatbot`, {
    method: 'GET',
    options: {
      useNextResponse: true,
    },
    body: {},
  })
}

export async function POST(
  request: NextRequest,
  params: { params: { orgId: number } }
) {
  const orgId = params.params.orgId
  const payload = await request.json()
  return serverApi(`/organisation/${orgId}/chatbot`, {
    method: 'POST',
    options: {
      useNextResponse: true,
    },
    body: payload,
  })
}
