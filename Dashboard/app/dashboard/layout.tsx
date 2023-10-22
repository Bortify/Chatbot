import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Toaster from '@/components/Toaster'
import Providers from '@/components/Providers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import EmailVerification from '@/components/EmailVerificationWrapper'

import { getProfile } from '../api/auth'

export const metadata: Metadata = {
  title: 'shard',
  description: 'shard',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const user = await getProfile()

  if (!session?.user || user?.error) {
    redirect('/login')
  }

  return (
    <Providers>
      <EmailVerification emailVerified={user?.isEmailVerified}>{children}</EmailVerification>
      <Toaster position='top-center' reverseOrder={false} />
    </Providers>
  )
}
