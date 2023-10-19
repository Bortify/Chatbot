import serverApi from '@/app/api'

export function login(query: Object) {
  return serverApi('/auth/signin', {
    body: query,
    method: 'POST',
    options: {},
  })
}

export function signUp(query: Object) {
  return serverApi('/auth/signup', {
    body: query,
    method: 'POST',
    options: {},
  })
}

export function getProfile() {
  return serverApi('/auth', {
    body: {},
    method: 'GET',
    options: {},
  })
}

export function forgotPassword(query: { email: string }) {
  return serverApi('/auth/reset/send', {
    body: query,
    method: 'POST',
    options: {
      useNextResponse: true,
    },
  })
}

export function forgotPasswordHandler(query: { token: string | null, password: string }){
  return serverApi('auth/reset/handle',{
    method: 'POST',
    options: {
      useNextResponse: true
    },
    body: {
      token: query.token,
      password: query.password
    }
  })
}
