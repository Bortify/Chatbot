'use client'
import Link from 'next/link'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Button from '@/components/Button'
import Form from '@/components/Form'
import Typography from '@/components/Typography'

const validationSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
      'Password is invalid'
    ),
})

type ValidationSchema = z.infer<typeof validationSchema>

const LoginForm: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data)

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
      <Button size='medium' color='primary' state='none' block className='mt-6'>
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
  )
}

export default LoginForm
