import { Session, getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

import { authOptions } from '@/lib/auth'
import { BACKEND_BASE_URL } from '@/constants/url'
import { APIError } from '@/lib/error'

type BaseConfigType = {
  external?: Boolean
}

type RequestOptionsType = {
  useNextResponse?: Boolean
  revalidate?: null | Array<string>
}

type ServerApiParametersType = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body: Object
  options: RequestOptionsType | {}
}

export default async function serverApi(
  url: string,
  config: ServerApiParametersType
) {
  const baseConfig = await getBaseConfig({})
  const payload: any = {
    body: JSON.stringify(config.body),
    headers: { ...baseConfig.headers },
    method: config.method,
  }
  if(config.method === 'GET'){
    delete payload.body
  }
  return fetch(getUrl(url),payload).then((res) => {
    return handleResponse(res, config.options)
  })
}

async function getBaseConfig({ external = false }: BaseConfigType) {
  let authToken = null
  const session: (Session & { token: string }) | null = await getServerSession(
    authOptions
  )
  authToken = session?.token
  return {
    headers: {
      ...(authToken && !external
        ? { Authorization: `Bearer ${authToken}` }
        : {}),
      'Content-Type': 'application/json',
    },
  }
}

function getUrl(url: string): string {
  if (url.startsWith('http')) {
    return url
  }

  if (url.startsWith('/')) {
    return `${BACKEND_BASE_URL}${url.slice(1)}`
  }

  return `${BACKEND_BASE_URL}${url}`
}

async function handleResponse(response: Response, options: RequestOptionsType) {
  const { useNextResponse = false, revalidate = null } = options
  return response.text().then((text) => {
    let data = null

    try {
      data = text && JSON.parse(text)
    } catch (err) {
      console.log('ERROR IN HANDLE RESPONSE SERVER: ', err)
    }

    const isOk = response.ok
    if (!isOk) {
      const error = data || response
      throw new APIError({
        message: error.errors[0].message,
        status: response.status,
        path: error.errors[0].path,
      })
    }

    if (revalidate) {
      if (Array.isArray(revalidate)) {
        revalidate.forEach((path) => setTimeout(() => revalidatePath(path)))
      } else {
        setTimeout(() => revalidatePath(revalidate))
      }
    }

    if (useNextResponse) {
      return NextResponse.json(data)
    }

    return data
  })
}
