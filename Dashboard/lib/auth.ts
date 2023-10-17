import { login } from '@/app/api/auth'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

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
          label: 'email',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('credentials are: ', credentials)
        let result = null
        try {
          const user = await login({
            email: credentials?.email,
            password: credentials?.password,
          })
          result = user
        } catch (e) {
          console.log(e)
          throw new Error(JSON.stringify(e))
        }
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
    async signIn(params) {
      if (params.user) {
        return true
      }
      return false
    },
    async session({ user, session, token }) {
      console.log('from session', {
        token,
        user,
        session,
      })
      session.user = user
      return session
    },
    jwt({ token, user, account, profile }) {
      console.log({
        account,
        user,
        profile,
      })
      token.user = user?.user
      token.token = user?.token
      console.log('jwt token', token)
      return token
    },
  },
}
