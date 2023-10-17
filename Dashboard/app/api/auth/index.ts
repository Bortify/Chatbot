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
