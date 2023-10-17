import React from 'react'
import { NextPage } from 'next'

import Typography from '@/components/Typography'

import LoginForm from './components/LoginForm'

const LoginPage: NextPage = (props) => {
  return (
    <section className='flex w-screen h-screen'>
      <div className='flex flex-1 bg-blue-200'></div>
      <div className='flex flex-col items-center justify-center flex-1 bg-white'>
        <div className='w-full max-w-lg p-6 sm:p-8'>
          <Typography.Heading
            variant='h1'
            size='3xl'
            className='w-full mb-4'
            boldness={700}>
            Sign In to your account
          </Typography.Heading>
          <LoginForm />
        </div>
      </div>
    </section>
  )
}

export default LoginPage
