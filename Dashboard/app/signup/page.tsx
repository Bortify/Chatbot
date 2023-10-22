import React from 'react'
import { NextPage } from 'next'

import Typography from '@/components/Typography'

import SignUpForm from './components/SignUpForm'

const SignUpPage: NextPage = (props) => {
  return (
    <section className='flex w-screen h-screen'>
      <div className='flex flex-1 bg-white'></div>
      <div className='flex flex-col items-start justify-center flex-1 bg-white shadow-xl'>
        <div className='w-full max-w-lg p-6 m-10 sm:p-8'>
          <Typography.Heading
            variant='h1'
            size='3xl'
            className='w-full mb-4'
            boldness={700}>
            Create an Account
          </Typography.Heading>
          <SignUpForm />
        </div>
      </div>
    </section>
  )
}

export default SignUpPage
