'use client'
import React, { useState } from 'react'
import { Check, X } from 'lucide-react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ModalPropType } from '@/lib/type/modal'
import { createOrganisation } from '@/app/api/browser/organisation'
import { invalidate } from '@/utils/query'

import Modal from '../Modal'
import Form from '../Form'
import Button from '../Button'

const validationSchema = z.object({
  name: z
    .string()
    .min(1, 'Name must have one character')
    .max(200, 'Name is too long'),
})

type ValidationType = z.infer<typeof validationSchema>

function CreateOrgModal({ active, visibilityDispatcher }: ModalPropType) {
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
    try {
      setState('LOADING')
      await createOrganisation(data)
      setState('SUCCESS')
      invalidate(['organisations'])
      visibilityDispatcher(false)
      reset()
      setTimeout(() => {
        setState('IDLE')
      }, 1000)
    } catch (e) {
      setState('ERROR')
    }
  }

  return (
    <Modal
      onClose={() => {
        visibilityDispatcher(false)
      }}
      active={active}
      title='Create New Organisation'>
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
              Email Sent
            </>
          )}
        </Button>
      </form>
    </Modal>
  )
}

export default CreateOrgModal
