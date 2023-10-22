import { NextRequest } from 'next/server'
import serverApi from '../..'

export async function GET(
  request: NextRequest,
  params: { params: { orgId: number } }
) {
  const orgId = params.params.orgId
  if (!orgId) {
    throw new Error('Org Id must be provided')
  }
  return serverApi(`/organisation/${orgId}`, {
    method: 'GET',
    body: {},
    options: {
      useNextResponse: true,
    },
  })
}

export async function PUT(
  request: NextRequest,
  params: { params: { orgId: number } }
) {
  const orgId = params.params.orgId
  const payload = await request.json()
  if (!orgId) {
    throw new Error('Org Id must be provided')
  }
  return serverApi(`/organisation/${orgId}`, {
    method: 'PUT',
    body: payload,
    options: {
      useNextResponse: true,
    },
  })
}
