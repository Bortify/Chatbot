'use client'
import { NextPage } from 'next'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { notFound, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import Form from '@/components/Form'
import Button from '@/components/Button'
import { forgotPasswordHandler } from '@/app/api/browser/auth'
import { APIError } from '@/lib/error'

const validationSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
        'Password is invalid'
      ),
    confirmPassword: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
        'Password is invalid'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  })

type ValidationSchema = z.infer<typeof validationSchema>

const ForgotPasswordPage: NextPage = () => {
  const router = useRouter()
  const [alertVisibile, setAlertVisibility] = useState(false)
  const [state, setState] = useState<
    'loading' | 'error' | 'idle' | 'success' | 'invalid'
  >('idle')
  const searchParams = useSearchParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  const email = searchParams.get('email'),
    token = searchParams.get('token')

  const submitHandler: SubmitHandler<ValidationSchema> = async (data) => {
    setState('loading')
    try {
      await forgotPasswordHandler({
        password: data.confirmPassword,
        token,
      })
      router.push('/dashboard/login')
      setState('success')
    } catch (e) {
      console.log(e)
      if(e instanceof APIError){
        console.log(e.status)
      }
      setState('error')
    }
  }

  if (!email || !token) {
    notFound()
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
            <span>Password reset successful. Redirecting to login page.</span>
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
          label={`What's your password?`}
          type='password'
          className='mt-2'
          placeholder='••••••••'
          {...register('password', {
            required: 'Pasword is required',
          })}
          autoComplete='current-password'
          error={errors.password?.message}
          onFocus={() => {
            setAlertVisibility(true)
          }}
        />
        <Form.Field.Input
          label={`Confirm your password.`}
          type='password'
          className='mt-2'
          placeholder='••••••••'
          {...register('confirmPassword', {
            required: 'Confirm you password before sign up.',
          })}
          autoComplete='confirm-password'
          error={errors.confirmPassword?.message}
          onFocus={() => {
            setAlertVisibility(true)
          }}
        />
        <Button block className='mt-2' loading={state === 'loading'}>
          Reset Password
        </Button>
      </form>
      {alertVisibile && (
        <div className='toast toast-end card'>
          <div className='rounded-lg shadow-lg card-body'>
            <div className='justify-end card-actions'>
              <Button
                size='extra-small'
                color='none'
                className='btn-square'
                onClick={() => {
                  setAlertVisibility(false)
                }}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 bg-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </Button>
            </div>
            <div>
              <h3 className='mb-2 font-bold'>
                Remember! Your password must have following:{' '}
              </h3>
              <ul className='pl-5 text-xs list-disc'>
                <li>At least 8 characters long.</li>
                <li>At least one upparecase letter.</li>
                <li>At least one lowercase letter.</li>
                <li>At least one digit.</li>
                <li>At least one special character from the set: !@#$%^&*</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ForgotPasswordPage
