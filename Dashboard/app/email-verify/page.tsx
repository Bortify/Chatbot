'use client'

import { notFound, redirect, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { handleEmailVerification } from '../api/browser/auth'
import Spinner from '@/components/Spinner'
import Typography from '@/components/Typography'

function Page() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const token = searchParams.get('token')
  const [state, setState] = useState<'ERROR' | 'LOADING'>('LOADING')

  if (!email || !token) {
    notFound()
  }

  const handler = async () => {
    try {
      await handleEmailVerification({
        email,
        token,
      })
      redirect('/dashboard')
    } catch (e) {
      setState('ERROR')
    }
  }

  useEffect(() => {
    handler()
  })

  return (
    <section className='grid w-screen h-screen place-items-center'>
      {state === 'LOADING' && <Spinner />}
      {state === 'ERROR' && (
        <Typography.Heading
          size='3xl'
          className='text-red-700'
          variant='h1'
          fontFamily='manrope'>
          Invalid Credentials
        </Typography.Heading>
      )}
    </section>
  )
}

export default Page
