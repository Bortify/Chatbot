'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import Typography from '@/components/Typography'
import Button from '@/components/Button'
import { ChatbotDetails } from '@/lib/type/chatbot'
import DeleteConfirmation from '@/components/DeleteConfirmation'
import { deleteChatbot } from '@/api/browser/chatbot'

type PropTypes = {
  chatbot: ChatbotDetails
  orgId: number
}

function DangerZone({ chatbot, orgId }: PropTypes) {
  const [modalVisible, setVisibility] = useState(false)
  const router = useRouter()
  return (
    <>
      <div className='w-full p-5 bg-red-100 border rounded-xl'>
        <Typography.Heading
          variant='h3'
          size='3xl'
          boldness={600}
          fontFamily='poppins'
          className='pb-5 mb-5 text-red-500 border-b-2 border-b-red-300'>
          Danger Zone
        </Typography.Heading>
        <div className='grid grid-cols-3 gap-5'>
          <div className='col-span-2 '>
            <Typography.Heading
              variant='h6'
              boldness={700}
              size='lg'
              className='text-red-500'
              fontFamily='manrope'>
              Delete <b>{`"${chatbot.name}"`}</b>
            </Typography.Heading>
            <Typography.Content
              size='base'
              fontFamily='poppins'
              className='pt-1 text-red-400'>
              {`Once deleted, your chatbot and all associated data cannot be
            recovered. Think carefully before taking this step. If you're sure,
            proceed with caution. For assistance, contact support.`}
            </Typography.Content>
          </div>
          <div className='grid place-items-center'>
            <Button
              color='none'
              state='error'
              block
              onClick={() => {
                setVisibility(true)
              }}>
              Delete
            </Button>
          </div>
        </div>
      </div>
      <DeleteConfirmation
        active={modalVisible}
        visibilityDispatcher={setVisibility}
        matcher={`Delete ${chatbot.name}`}
        title='Delete Chatbot'
        text='To proceed with chatbot deletion, we require your confirmation. This action is irreversible. Are you sure you want to proceed?'
        onConfirm={async () => {
          await deleteChatbot({
            chatbotId: chatbot.id,
            orgId,
          })
          router.push(`/dashboard/organisation/${orgId}`)
        }}
      />
    </>
  )
}

export default DangerZone
