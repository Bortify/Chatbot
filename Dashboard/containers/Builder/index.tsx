'use client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import Button from '@/components/Button'
import ToolTip from '@/components/Tooltip'
import Typography from '@/components/Typography'
import { ChatbotConfiguration, ChatbotDetails } from '@/lib/type/chatbot'
import React, { useEffect, useState } from 'react'
import Preview from './Preview'
import BuilderForm from './BuilderForm'

type PropType = {
  orgId: number
  chatbot: ChatbotDetails
}

function VisualBuilderContainer({ orgId, chatbot }: PropType) {
  const router = useRouter()
  const [configurations, setConfigurations] = useState<ChatbotConfiguration>(
    chatbot.configuration
  )
  const [render, setRender] = useState(false)

  const reRender = function () {
    setRender(!render)
  }

  function updateConfiguration(data: ChatbotConfiguration) {
    setConfigurations(data)
    reRender()
  }

  return (
    <section className='flex items-center justify-center w-screen h-screen px-10 bg-slate-50'>
      <div className='flex flex-col w-full h-screen py-10 max-w-container'>
        <div className='sticky top-0 flex items-center justify-between w-full pb-5 border-b-2'>
          <div className='relative flex items-center justify-center w-full gap-5'>
            <ToolTip
              text='Go back to Settings.'
              position='TOP'
              className='absolute left-0'>
              <Button
                color='none'
                className='btn-circle'
                onClick={() => {
                  router.push(
                    `/dashboard/organisation/${orgId}/chatbot/${chatbot.id}`
                  )
                }}>
                <ArrowLeft className='w-4 h-4' />
              </Button>
            </ToolTip>
            <Typography.Heading
              size='5xl'
              boldness={700}
              fontFamily='manrope'
              variant='h1'
              className='text-slate-950'>
              {chatbot.name}
            </Typography.Heading>
          </div>
        </div>
        <div className='flex flex-1 h-0 gap-5 mt-5'>
          <div className='flex flex-1 overflow-y-scroll'>
            <BuilderForm
              configurations={configurations}
              updateFunction={updateConfiguration}
            />
          </div>
          <div className='flex flex-1'>
            <div className='flex flex-col flex-1 border mockup-browser bg-base-300'>
              <div className='mockup-browser-toolbar'>
                <div className='input'>https://eruva.in</div>
              </div>
              <div className='flex flex-1 bg-base-200'>
                <Preview configuration={configurations} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisualBuilderContainer
