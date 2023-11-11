import { EmailVerificationRequest } from '@/constants/profile'
import browserApi from '.'

export function forgotPassword(query: { email: string }) {
  return browserApi('/api/auth/forgot-password', {
    method: 'POST',
    body: {
      email: query.email,
    },
  })
}

export function forgotPasswordHandler(query: {
  token: string | null
  password: string
}) {
  return browserApi('/api/auth/forgot-password/handle', {
    method: 'POST',
    body: {
      token: query.token,
      password: query.password,
    },
  })
}

export function getProfile() {
  return browserApi('/api/profile', {
    method: 'GET',
    body: null,
  })
}

export function sendEmailVerification() {
  return browserApi('/api/profile/verify', {
    method: 'POST',
    body: {
      type: EmailVerificationRequest.send,
    },
  })
}

export function handleEmailVerification({
  email,
  token,
}: {
  email: string
  token: string
}) {
  return browserApi('/api/profile/verify', {
    method: 'POST',
    body: {
      type: EmailVerificationRequest.handle,
      email,
      token,
    },
  })
}
