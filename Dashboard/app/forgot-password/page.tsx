'use client'
import { NextPage } from 'next'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

import Form from '@/components/Form'
import Button from '@/components/Button'

import { forgotPassword } from '../api/browser/auth'
import { Check, X } from 'lucide-react'

const validationSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
})

type ValidationSchema = z.infer<typeof validationSchema>

const ForgotPasswordPage: NextPage = () => {
  const [state, setState] = useState<'LOADING' | 'ERROR' | 'IDLE' | 'SUCCESS'>(
    'IDLE'
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  const submitHandler: SubmitHandler<ValidationSchema> = async (data) => {
    if (state !== 'IDLE') return
    setState('LOADING')
    try {
      await forgotPassword({
        email: data.email,
      })
      setState('SUCCESS')
    } catch (e) {
      console.log(e)
      setState('ERROR')
    }
  }

  return (
    <section className='grid w-screen h-screen bg-gray-100 place-items-center'>
      <form
        className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'
        onSubmit={handleSubmit(submitHandler)}>
        <Form.Field.Input
          label={`What's your email?`}
          placeholder='jonh@example.com'
          {...register('email', {
            required: 'Email is required',
          })}
          error={errors.email?.message}
          autoComplete='username'
        />
        <Button
          block
          className='mt-2'
          loading={state === 'LOADING'}
          state={
            state === 'SUCCESS'
              ? 'success'
              : state === 'ERROR'
              ? 'error'
              : 'none'
          }>
          {state === 'IDLE' && 'Reset Password'}
          {state === 'ERROR' && (
            <>
              <X className='w-5 h-5' />
              Some Error Occured
            </>
          )}
          {state === 'SUCCESS' && (
            <>
              <Check className='w-5 h-5' />
              Email Sent
            </>
          )}
        </Button>
      </form>
    </section>
  )
}

export default ForgotPasswordPage
