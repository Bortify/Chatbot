'use client'
import { NextPage } from 'next'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

import Form from '@/components/Form'
import Button from '@/components/Button'

import { forgotPassword } from '../api/browser/auth'

const validationSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
})

type ValidationSchema = z.infer<typeof validationSchema>

const ForgotPasswordPage: NextPage = () => {
  const [state, setState] = useState<'loading' | 'error' | 'idle' | 'success'>(
    'idle'
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  const submitHandler: SubmitHandler<ValidationSchema> = async (data) => {
    setState('loading')
    try {
      await forgotPassword({
        email: data.email,
      })
      setState('success')
    } catch (e) {
      console.log(e)
      setState('error')
    }
  }

  return (
    <section className='grid w-screen h-screen bg-gray-100 place-items-center'>
      <form
        className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'
        onSubmit={handleSubmit(submitHandler)}>
        {state === 'success' && (
          <div className='mb-2 alert alert-success'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 stroke-current shrink-0'
              fill='none'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>Check your email for reset link.</span>
          </div>
        )}
        {state === 'error' && (
          <div className='alert alert-error'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 stroke-current shrink-0'
              fill='none'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>Some error occured.</span>
          </div>
        )}
        <Form.Field.Input
          label={`What's your email?`}
          placeholder='jonh@example.com'
          {...register('email', {
            required: 'Email is required',
          })}
          error={errors.email?.message}
          autoComplete='username'
        />
        <Button block className='mt-2' loading={state === 'loading'}>
          Reset Password
        </Button>
      </form>
    </section>
  )
}

export default ForgotPasswordPage
