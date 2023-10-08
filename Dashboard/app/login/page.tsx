import React from 'react'
import Typography from '@/components/Typography'
import Form from '@/components/Form'
import Button from '@/components/Button'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <section className='flex w-screen h-screen'>
      <div className='flex flex-1 bg-blue-200'></div>
      <div className='flex flex-col items-center justify-center flex-1 bg-white'>
        <div className='w-full max-w-lg p-6 sm:p-8'>
        <Typography.Heading variant='h1' size='3xl' className='w-full mb-4' boldness={700}>
          Sign In to your account
        </Typography.Heading>
          <form>
            <Form.Field.Input label={`What's your email?`} />
            <Form.Field.Input
              label={`What's your password?`}
              type='password'
              className='mt-2'
            />
            <Button
              size='medium'
              color='primary'
              state='none'
              block
              className='mt-6'>
              Login
            </Button>
            <div className='flex items-center justify-center gap-2 mt-4'>
              <Typography.Content size='sm'>
                {"Don't have Account? "}
              </Typography.Content>
              <Link className='text-sm font-semibold underline' href='/signup'>
                SignUp here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
