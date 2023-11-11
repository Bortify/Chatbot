import serverApi from '../../../api/server'

export function GET(request: Request) {
  return serverApi('/organisation', {
    method: 'GET',
    body: {},
    options: {
      useNextResponse: true,
    },
  })
}

export async function POST(request: Request) {
  const payload = await request.json()
  return serverApi('/organisation', {
    method: 'POST',
    body: payload,
    options: {
      useNextResponse: true,
    },
  })
}
