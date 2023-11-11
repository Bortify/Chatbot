'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import Typography from '@/components/Typography'
import Button from '@/components/Button'
import { ChatbotDetails } from '@/lib/type/chatbot'
import DeleteConfirmation from '@/components/DeleteConfirmation'
import { deleteChatbot } from '@/api/browser/chatbot'
import { Sparkles } from 'lucide-react'

type PropTypes = {
  chatbot: ChatbotDetails
  orgId: number
}

function VisualBuilder({ chatbot, orgId }: PropTypes) {
  const router = useRouter()
  return (
    <>
      <div className='w-full p-5 bg-white border rounded-xl'>
        <Typography.Heading
          variant='h3'
          size='3xl'
          boldness={600}
          fontFamily='poppins'
          className='pb-5 mb-5 border-b-2 text-gray-950'>
          Visual Builder
        </Typography.Heading>
        <div className='grid grid-cols-3 gap-5'>
          <div className='col-span-2'>
            <Typography.Heading
              variant='h6'
              boldness={800}
              size='lg'
              className='text-gray-500'
              fontFamily='manrope'>
              No-Code Chatbot Customization
            </Typography.Heading>
            <Typography.Content
              size='base'
              fontFamily='poppins'
              className='pt-1 text-gray-500 opacity-75'>
              {`Easily personalize your chatbot without the hassle of coding. Visual Builder 
              simplifies customization, making it a breeze to create a chatbot tailored to 
              your needs.`}
            </Typography.Content>
          </div>
          <div className='grid place-items-center'>
            <Button
              block
              onClick={() => {
                router.push(
                  `/dashboard/organisation/${orgId}/chatbot/${chatbot.id}/builder`
                )
              }}>
              Try <Sparkles className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default VisualBuilder
