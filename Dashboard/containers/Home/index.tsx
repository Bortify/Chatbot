'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import Typography from '@/components/Typography'
import Button from '@/components/Button'
import { getProfile } from '@/app/api/browser/auth'
import WaitForData from '@/components/WaitForData'

import OrganisationsList from './components/OrganisationsList'

const Home: React.FC<{}> = () => {
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  return (
    <WaitForData loading={profileQuery.isLoading || profileQuery.isFetching}>
      <section className='grid w-screen h-screen bg-slate-50 place-items-center'>
        <div className='w-full max-w-container'>
          <div className='flex items-start justify-between w-full'>
            <div>
              <Typography.Heading
                size='3xl'
                boldness={700}
                fontFamily='manrope'
                variant='h1'
                className='text-slate-700'>
                Hello
                {', '}
                <span className='text-5xl font-bold text-black'>
                  {profileQuery.data?.name}
                </span>
              </Typography.Heading>
              <Typography.Content size='sm' className='mt-4 text-slate-500'>
                Select or Create an organization from the given list.
              </Typography.Content>
            </div>
            <div className='flex gap-2'>
              <Button
                color='none'
                state='error'
                onClick={() => {
                  signOut()
                }}>
                Logout
                <LogOut className='w-4 h-4' />
              </Button>
            </div>
          </div>
          <OrganisationsList />
        </div>
      </section>
    </WaitForData>
  )
}

export default Home
