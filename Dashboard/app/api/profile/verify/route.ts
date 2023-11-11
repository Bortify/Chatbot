import { NextRequest } from 'next/server'

import { EmailVerificationRequest } from '@/constants/profile'

import serverApi from '../../../../api/server'

export async function POST(request: NextRequest) {
  const { type, token, email } = await request.json()
  if (type === EmailVerificationRequest.send) {
    return serverApi('/auth/verify/send', {
      method: 'POST',
      body: {},
      options: {
        useNextResponse: true,
      },
    })
  }
  if (type === EmailVerificationRequest.handle && email && token) {
    return serverApi('/auth/verify/handle', {
      method: 'POST',
      body: {
        email,
        token,
      },
      options: {
        useNextResponse: true,
      },
    })
  }
  throw new Error('something is missing. Check payload')
}
