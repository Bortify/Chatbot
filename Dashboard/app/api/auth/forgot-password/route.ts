import { forgotPassword } from '..'

type ReqeustBodyType = {
  email?: string
}

export async function POST(request: Request) {
  const data: ReqeustBodyType = await request.json()
  if (data?.email) {
    return forgotPassword({
      email: data.email,
    })
  }
  throw new Error('nothing provided')
}
