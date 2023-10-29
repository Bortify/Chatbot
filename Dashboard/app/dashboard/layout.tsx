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
      <EmailVerification emailVerified={user?.isEmailVerified}>
        {children}
      </EmailVerification>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='fixed bottom-4 right-4'>
        <a
          href='https://forms.gle/K1wMZPZqskjcGSAm7'
          target='_blank'
          className='px-5 py-2.5 relative rounded group font-medium text-white inline-block'>
          <span className='absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500'></span>
          <span className='h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500'></span>
          <span className='absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500'></span>
          <span className='absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500'></span>
          <span className='relative'>Feedback</span>
        </a>
      </div>
    </Providers>
  )
}
