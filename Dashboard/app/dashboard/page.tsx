import { getServerSession } from 'next-auth'
import Link from 'next/link'

import { authOptions } from '@/lib/auth'
import { signOut } from 'next-auth/react'
import LogoutBtn from './logoutBTN'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main className='flex flex-col items-center justify-center w-screen h-screen'>
      <h1 className='mt-3 mb-3 text-3xl text-center'>Home Page</h1>
      <div className='text-center'>
        {!session?.user && (
          <div>
            <Link href='/dashboard/login'>
              <button className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'>
                Login
              </button>
            </Link>
          </div>
        )}
        Hello <b>{session?.user?.name}</b>
        {session?.user && (
          <div>
            <LogoutBtn />
          </div>
        )}
      </div>
    </main>
  )
}
