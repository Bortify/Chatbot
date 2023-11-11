import { Check, X } from 'lucide-react'
import React, { useState } from 'react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ModalPropType } from '@/lib/type/modal'
import { invalidate } from '@/utils/query'
import { zodResolver } from '@hookform/resolvers/zod'

import Modal from '../Modal'
import Button from '../Button'
import Form from '../Form'
import { createChatbot } from '@/api/browser/chatbot'

const validationSchema = z.object({
  name: z
    .string()
    .min(1, 'Name must have one character')
    .max(50, 'Name is too long'),
})

type ValidationType = z.infer<typeof validationSchema>

function ChatbotModal({
  active,
  visibilityDispatcher,
  orgId,
  type = 'CREATE',
}: ModalPropType) {
  const [state, setState] = useState<'LOADING' | 'IDLE' | 'SUCCESS' | 'ERROR'>(
    'IDLE'
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationType>({
    resolver: zodResolver(validationSchema),
  })

  const createHandler: SubmitHandler<ValidationType> = async (
    data: ValidationType
  ) => {
    if (orgId) {
      try {
        setState('LOADING')
        await createChatbot({ orgId, payload: data })
        setState('SUCCESS')
        invalidate(['organisation', orgId, 'chatbots'])
        visibilityDispatcher(false)
        reset()
        setTimeout(() => {
          setState('IDLE')
        }, 1000)
      } catch (e) {
        setState('ERROR')
      }
    }
  }

  return (
    <Modal
      onClose={() => {
        visibilityDispatcher(false)
      }}
      active={active}
      title={'Create new Chatbot'}>
      <form onSubmit={handleSubmit(createHandler)}>
        <Form.Field.Input
          label={`What's the name?`}
          {...register('name')}
          error={errors.name?.message}
        />
        <Button
          block
          className='mt-5'
          loading={state === 'LOADING'}
          state={
            state === 'ERROR'
              ? 'error'
              : state === 'SUCCESS'
              ? 'success'
              : 'none'
          }>
          {state === 'IDLE' && 'Create'}
          {state === 'ERROR' && (
            <>
              <X className='w-4 h-4' />
              Some Error Occured
            </>
          )}
          {state === 'SUCCESS' && (
            <>
              <Check className='w-4 h-4' />
              Done
            </>
          )}
        </Button>
      </form>
    </Modal>
  )
}

export default ChatbotModal
