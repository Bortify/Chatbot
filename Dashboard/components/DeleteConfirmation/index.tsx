import React, { Dispatch, SetStateAction, useState } from 'react'

import Modal from '../Modal'
import Typography from '../Typography'
import Form from '../Form'
import Button from '../Button'
import { Trash2 } from 'lucide-react'

type PropType = {
  onConfirm: () => Promise<void>
  title: string
  matcher: string
  text?: string
  active: boolean
  visibilityDispatcher: Dispatch<SetStateAction<boolean>>
}

function DeleteConfirmation({
  onConfirm,
  title,
  matcher,
  text,
  active,
  visibilityDispatcher,
}: PropType) {
  const [enabled, setEnabled] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const clickHandler = async () => {
    try {
      setLoading(true)
      await onConfirm()
      visibilityDispatcher(false)
      setLoading(false)
    } catch (e) {
      console.log('error from delete comfirmation is ', e)
    }
  }

  return (
    <Modal
      active={active}
      onClose={() => {
        visibilityDispatcher(false)
      }}
      title={title}>
      {text && (
        <Typography.Content
          fontFamily='manrope'
          size='sm'
          className='my-2 text-red-500'>
          * {text}
        </Typography.Content>
      )}
      <Typography.Content
        fontFamily='manrope'
        size='sm'
        className='mb-3 text-slate-800'>
        Type{' '}
        <code className='px-1 py-0.5 font-black text-black bg-gray-200'>
          {matcher}
        </code>{' '}
        in the field below to continue.
      </Typography.Content>
      <Form.Field.Input
        placeholder={matcher}
        onChange={(e) => {
          if (e.target.value === matcher) {
            setEnabled(true)
          } else {
            setEnabled(false)
          }
        }}
      />
      <Button
        block
        className='mt-2 btn-error'
        state={'error'}
        loading={loading}
        disabled={!enabled}
        onClick={clickHandler}>
        <Trash2 className='w-4 h-4' />
        Delete
      </Button>
    </Modal>
  )
}

export default DeleteConfirmation
