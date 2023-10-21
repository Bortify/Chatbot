import { NextRequest } from 'next/server'
import serverApi from '..'

export async function GET(request: NextRequest) {
  return serverApi('/auth', {
    method: 'GET',
    body: {},
    options: {
      useNextResponse: true,
    },
  })
}
