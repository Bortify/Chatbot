'use client'
import Link from 'next/link'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Button from '@/components/Button'
import Form from '@/components/Form'
import Typography from '@/components/Typography'
import { APIError } from '@/lib/error'
import { toaster } from '@/components/Toaster'

const validationSchema = z
  .object({
    email: z.string().min(1, { message: 'Email is required' }).email({
      message: 'Must be a valid email',
    }),
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
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .max(200, { message: 'Name is too long.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  })

type ValidationSchema = z.infer<typeof validationSchema>

const SignUpForm: React.FC<{}> = () => {
  const router = useRouter()
  const [alertVisibile, setAlertVisibility] = useState(false)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    try {
      setLoading(true)
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        name: data.name,
        redirect: false,
      })
      if (res?.error) {
        throw new APIError(JSON.parse(res.error))
      }
      router.push('/dashboard')
    } catch (e) {
      if (e instanceof APIError) {
        if (e.status === 409) {
          toaster.warn(
            'Seems like you already got an account.',
            'w-max',
            <Link href={'/dashboard/login'} className='font-bold underline'>
              Login Here
            </Link>
          )
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form.Field.Input
        label={`What's your email?`}
        placeholder='jonh@example.com'
        {...register('email', {
          required: 'Email is required',
        })}
        error={errors.email?.message}
        autoComplete='username'
      />
      <Form.Field.Input
        label={`What's your name?`}
        className='mt-2'
        placeholder='John Duo'
        {...register('name', {
          required: 'Name is required.',
        })}
        error={errors.name?.message}
        autoComplete='name'
      />
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
      <Button
        size='medium'
        color='primary'
        state='none'
        block
        className='mt-6'
        loading={loading}>
        Sign Up
      </Button>
      <div className='flex items-center justify-center gap-2 mt-4'>
        <Typography.Content size='sm'>{'Got an Account? '}</Typography.Content>
        <Link
          className='text-sm font-semibold underline'
          href='/dashboard/login'>
          Login here
        </Link>
      </div>
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
    </form>
  )
}

export default SignUpForm
