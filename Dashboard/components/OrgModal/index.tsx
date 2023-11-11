'use client'
import React, { useState } from 'react'
import { Check, X } from 'lucide-react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ModalPropType } from '@/lib/type/modal'
import {
  createOrganisation,
  updateOrganisation,
} from '@/api/browser/organisation'
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

export default function OrgModal({
  active,
  visibilityDispatcher,
  type,
  prevValues,
  orgId,
}: ModalPropType) {
  let title = null
  let defaultValues
  let handlerFunction: (payload: ValidationType) => Promise<any>
  switch (type) {
    case 'CREATE':
      title = 'Create New Organisation'
      handlerFunction = createOrganisation
      break
    case 'UPDATE':
      title = 'Update Organisation Details'
      handlerFunction = (data: ValidationType) => {
        if (orgId) {
          return updateOrganisation(orgId, data)
        }
        throw new Error('org id must be provided')
      }
      defaultValues = prevValues
  }

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
    defaultValues,
  })

  const createHandler: SubmitHandler<ValidationType> = async (
    data: ValidationType
  ) => {
    try {
      setState('LOADING')
      await handlerFunction(data)
      setState('SUCCESS')
      if (type === 'CREATE') {
        invalidate(['organisations'])
      } else {
        invalidate(['organisation', orgId])
      }
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
      title={title}>
      <form onSubmit={handleSubmit(createHandler)}>
        <Form.Field.Input
          label={
            type === 'CREATE' ? `What's the name?` : `What's the new name?`
          }
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
