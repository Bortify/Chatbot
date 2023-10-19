'use client'
import Link from 'next/link'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Button from '@/components/Button'
import Form from '@/components/Form'
import Typography from '@/components/Typography'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { APIError } from '@/lib/error'

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
type SignUpErrorType =  {
  status: number
  error: string
}

const SignUpForm: React.FC<{}> = () => {
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
      if(res?.error){
        throw new APIError(JSON.parse(res.error))
      }
    } catch (e) {
      if(e instanceof APIError){
        // TODO: Handle case where when user has already an account then ask him to login.
        console.log('error in sign up',{
          message: e.message,
          status: e.status,
          path: e.path
        }) 
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
        <Link className='text-sm font-semibold underline' href='/login'>
          Login here
        </Link>
      </div>
    </form>
  )
}

export default SignUpForm
