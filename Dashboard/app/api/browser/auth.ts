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
