import React, { useState } from 'react'
import { X } from 'lucide-react'
import { z } from 'zod'

import { ModalPropType } from '@/lib/type/modal'
import { createKnowledgeSource } from '@/app/api/browser/knowledge'
import { invalidate } from '@/utils/query'

import Modal from '../Modal'
import Form from '../Form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '../Button'

const validationSchema = z.object({
  name: z
    .string()
    .min(1, 'Name must have atleast 1 character')
    .max(50, 'Name can not have more than 50 characters'),
  hostURL: z.string().url(),
})

type ValidationType = z.infer<typeof validationSchema>

function KnowledgeSourceModal({
  type,
  active,
  visibilityDispatcher,
  prevValues,
  orgId,
  chatbotId,
}: ModalPropType & { chatbotId?: number }) {
  const title =
    type === 'CREATE' ? 'Create New Knowledge Source' : 'Edit Knowledge Source'

  const [selectedLinks, setSelectedLinks] = useState<string[]>([])
  const [invalidLink, setInvalidLink] = useState<string | null>(null)
  const { register, handleSubmit, formState, reset } = useForm<ValidationType>({
    resolver: zodResolver(validationSchema),
  })
  const [loading, setLoading] = useState<boolean>(false)

  const submitHandler = async (data: ValidationType) => {
    if (selectedLinks.length === 0) {
      setInvalidLink('Add atleast one scrappable link')
      return
    }
    const payload: ValidationType & {
      activeLinks: Array<string>
    } = {
      activeLinks: selectedLinks,
      ...data,
    }
    try {
      setLoading(true)
      await createKnowledgeSource({
        orgId,
        chatbotId,
        payload,
      })
      await invalidate(['organisation', orgId, 'chatbot', chatbotId])
      setSelectedLinks([])
      reset()
      visibilityDispatcher(false)
    } catch (e) {
      console.log('error from creating knowledge source ', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={title}
      active={active}
      onClose={() => {
        visibilityDispatcher(false)
      }}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Form.Field.Input
          label={'Add a name for this Knowledge Source'}
          placeholder='Google Wiki'
          className='mt-2'
          {...register('name')}
          error={formState.errors.name?.message}
        />
        <Form.Field.Input
          label={'Add a host URL'}
          className='mt-2'
          helpText={'This is a parent URL. must start with `https://`'}
          placeholder='https://en.wikipedia.org/wiki/Google'
          {...register('hostURL')}
          error={formState.errors.hostURL?.message}
        />
        <Form.Field.Input
          label={'Add scrappable links'}
          className='mt-2 mb-2'
          helpText={'Must start with `https://`. Press Space to add.'}
          placeholder='https://en.wikipedia.org/sitemap.xml'
          onChange={(e) => {
            if (
              /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/[^\s]*)?$/i.test(
                e.target.value
              )
            ) {
              setInvalidLink(null)
            } else {
              setInvalidLink('Link is invalid')
            }
          }}
          onKeyDown={(e) => {
            if (e.key === ' ') {
              e.preventDefault()
              if (!invalidLink) {
                const currLink = e.currentTarget.value
                setSelectedLinks([
                  ...selectedLinks.filter((link) => link !== currLink),
                  currLink,
                ])
                e.currentTarget.value = ''
              }
            }
          }}
          error={invalidLink}
        />
        <div className='flex flex-wrap gap-2 mb-2'>
          {selectedLinks.map((link, index) => (
            <span
              key={index}
              className='flex items-center gap-1 px-3 py-2 text-xs rounded-full w-max bg-base-200 text-base-content'>
              {link}
              <X
                className='w-4 h-4 cursor-pointer'
                onClick={() => {
                  setSelectedLinks(
                    selectedLinks.filter((link, idx) => idx !== index)
                  )
                }}
              />
            </span>
          ))}
        </div>
        <Button block loading={loading}>
          Submit
        </Button>
      </form>
    </Modal>
  )
}

export default KnowledgeSourceModal
