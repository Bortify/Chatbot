import { NextRequest } from 'next/server'
import { forgotPasswordHandler } from '../..'

export async function POST(request: NextRequest) {
  const { token, password } = await request.json()
  if (token && password) {
    return forgotPasswordHandler({
      token,
      password,
    })
  }
  throw new Error('something is missing. Check payload')
}
