'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Check, X } from 'lucide-react'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import Typography from '@/components/Typography'
import { sendEmailVerification } from '@/app/api/browser/auth'

import EmailVerificationGif from '../assets/email-verif.gif'

export default function EmailVerificationModal({
  active,
}: {
  active: boolean
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

  return (
    <Modal active={active} hideClose>
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
