import { AuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { AdapterUser } from 'next-auth/adapters'
import CredentialsProvider from 'next-auth/providers/credentials'

import { login, signUp } from '@/app/api/auth'
import { APIError, APIErrorType } from './error'

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
        name: {
          label: 'Name',
          type: 'text',
        },
      },
      async authorize(credentials, req) {
        let result = null
        try {
          if (credentials?.name) {
            result = await signUp({
              email: credentials?.email,
              password: credentials?.password,
              name: credentials?.name,
            })
          } else {
            result = await login({
              email: credentials?.email,
              password: credentials?.password,
            })
          }
        } catch (e) {
          if (e instanceof APIError) {
            throw new Error(
              JSON.stringify({
                message: e.message,
                status: e.status,
                path: e.path,
              })
            )
          }
        }
        console.log('result is: ', result)
        return result
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
    newUser: '/signup',
  },
  callbacks: {
    async session({
      session,
      token,
      user,
    }: {
      session: Session & { token: string | undefined }
      token: JWT
      user: AdapterUser
    }) {
      const sanitizedToken: {
        user?: {}
        token?: string
      } = Object.keys(token).reduce((p, c) => {
        if (c !== 'iat' && c !== 'exp' && c !== 'jti' && c !== 'apiToken') {
          return { ...p, [c]: token[c] }
        } else {
          return p
        }
      }, {})
      session.user = sanitizedToken.user
      session.token = sanitizedToken.token
      return session
    },
    async jwt({ token, user }) {
      if (typeof user !== 'undefined') {
        return user as unknown as JWT
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
}
