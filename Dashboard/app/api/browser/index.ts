import { CLIENT_BASE_URL } from '@/constants/url'
import { APIError } from '@/lib/error'

type BrowserApiParametersType = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body: Object | null
}

export default async function browserApi(
  url: string,
  config: BrowserApiParametersType
) {
  console.log('request made to next server from browserAPI')
  let payload: any = {
    method: config.method,
  }
  if (config.method !== 'GET') {
    payload = {
      ...payload,
      body: JSON.stringify(config.body),
    }
  }
  return fetch(getUrl(url), payload).then((res) => {
    return handleResponse(res)
  })
}

function getUrl(url: string): string {
  if (url.startsWith('http')) {
    return url
  }

  if (url.startsWith('/')) {
    return `${CLIENT_BASE_URL}${url.slice(1)}`
  }

  return `${CLIENT_BASE_URL}${url}`
}

async function handleResponse(response: Response) {
  return response.text().then((text) => {
    let data = null

    try {
      data = text && JSON.parse(text)
    } catch (err) {
      console.log('ERROR IN HANDLE RESPONSE BROWSER: ', err)
    }

    console.log('data from browser: ', data)

    const isOk = response.ok
    if (!isOk) {
      const error = data || response
      throw new APIError({
        message: error.errors[0].message,
        status: response.status,
        path: error.errors[0].path,
      })
    }

    return data
  })
}
