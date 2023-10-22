import serverApi from '@/app/api'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  params: { params: { orgId: number } }
) {
  const orgId = params.params.orgId
  if (!orgId) {
    throw new Error('org id must be provided')
  }
  return serverApi(`/organisation/${orgId}/chatbot`, {
    method: 'GET',
    options: {
      useNextResponse: true,
    },
    body: {},
  })
}
