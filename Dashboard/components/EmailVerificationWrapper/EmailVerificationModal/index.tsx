'use client'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { Check, X } from 'lucide-react'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import Typography from '@/components/Typography'
import { getProfile, sendEmailVerification } from '@/api/browser/auth'

import EmailVerificationGif from '../assets/email-verif.gif'
import { useSession } from 'next-auth/react'
import Spinner from '@/components/Spinner'
import { useQuery } from '@tanstack/react-query'

export default function EmailVerificationModal({
  children,
}: {
  children: ReactNode
}) {
  const [status, setStatus] = useState<
    'IDLE' | 'LOADING' | 'ERROR' | 'SUCCESS'
  >('IDLE')

  const sendEmailHandler = async () => {
    if (status !== 'IDLE') return
    try {
      setStatus('LOADING')
      await sendEmailVerification()
      setStatus('SUCCESS')
    } catch (e) {
      setStatus('ERROR')
    }
  }

  const session = useSession({
    required: true,
  })

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  if (session.status === 'loading' || profileQuery.isLoading) {
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
        <Spinner />
      </div>
    )
  }

  if (profileQuery.data?.isEmailVerified) {
    return children
  }

  return (
    <Modal active={true} hideClose>
      <div className='flex items-center h-screen gap-5 p-10 max-h-96'>
        <Image src={EmailVerificationGif} width={300} height={300} alt='gif' />
        <div>
          <Typography.Heading
            size='2xl'
            variant='h1'
            boldness={700}
            fontFamily='manrope'>
            Email Verification Required
          </Typography.Heading>
          <Typography.Content
            size='sm'
            boldness={500}
            className='mt-2 mb-5 text-gray-500'
            fontFamily='manrope'>
            Click on the below button to verify your email.
          </Typography.Content>
          <Button
            block
            loading={status === 'LOADING'}
            onClick={sendEmailHandler}
            state={
              status === 'ERROR'
                ? 'error'
                : status === 'SUCCESS'
                ? 'success'
                : 'none'
            }>
            {status === 'IDLE' && 'Verify'}
            {status === 'ERROR' && (
              <>
                <X className='w-4 h-4' />
                Some Error Occured
              </>
            )}
            {status === 'SUCCESS' && (
              <>
                <Check className='w-4 h-4' />
                Email Sent
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
