'use client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import classNames from 'classnames'
import { ArrowLeft } from 'lucide-react'

import { getChatbot, updateChatbot } from '@/app/api/browser/chatbot'
import Button from '@/components/Button'
import WaitForData from '@/components/WaitForData'
import Typography from '@/components/Typography'
import { ChatbotDetails, ChatbotType } from '@/lib/type/chatbot'
import { invalidate } from '@/utils/query'
import Spinner from '@/components/Spinner'
import ToolTip from '@/components/Tooltip'
import { CHATFRONT_BUNDLE_URL } from '@/constants/url'

import Settings from './components/Settings'
import CodeSnippets from './components/CodeSnippets'

type PropType = {
  orgId: number
  chatbotId: number
}

function ChatbotContainer({ orgId, chatbotId }: PropType) {
  const chatbotQuery = useQuery<ChatbotDetails>({
    queryKey: ['organisation', orgId, 'chatbot', chatbotId],
    queryFn: () => getChatbot({ orgId, chatbotId }),
    refetchOnWindowFocus: false,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const updateChatbotHandler = async (data: ChatbotType | Object) => {
    try {
      setLoading(true)
      await updateChatbot({
        orgId,
        chatbotId,
        payload: data,
      })
      invalidate(['organisation', orgId, 'chatbot', chatbotId])
    } catch (e) {
      console.log('error from chatbot update', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <WaitForData
      loading={chatbotQuery.isLoading}
      error={
        chatbotQuery.error &&
        chatbotQuery.isError &&
        !(chatbotQuery.isFetching || chatbotQuery.isLoading)
      }>
      {chatbotQuery.data && (
        <section className='flex items-center justify-center w-screen h-screen px-10 bg-slate-50'>
          <div className='flex flex-col w-full h-screen py-10 max-w-container'>
            <div className='sticky top-0 flex items-center justify-between w-full pb-5 border-b-2'>
              <div className='flex items-center gap-5'>
                <ToolTip text='Go back to Chatbot listings.' position='TOP'>
                  <Button
                    color='none'
                    className='btn-circle'
                    onClick={() => {
                      router.push(`/dashboard/organisation/${orgId}`)
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
                  {chatbotQuery.data?.name}
                </Typography.Heading>
                <div className='flex gap-2'>
                  <div className='badge badge-outline text-xxs'>SETTINGS</div>
                  {chatbotQuery.data?.active ? (
                    <div className='text-white badge badge-success text-xxs'>
                      ACTIVE
                    </div>
                  ) : (
                    <div className='badge badge-neutral text-xxs'>DISABLED</div>
                  )}
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <ChatbotTogglingSwitch
                  onClick={async (active) => {
                    await updateChatbotHandler({
                      active,
                    })
                  }}
                  checked={chatbotQuery.data?.active}
                />
              </div>
            </div>
            <div className='flex flex-1 gap-5 p-5 overflow-y-scroll'>
              <Settings chatbot={chatbotQuery.data} orgId={orgId} />
              <CodeSnippets
                jsCode={`<script type="module" crossorigin src="https://xducfpbdokcesmazrdfe.supabase.co/storage/v1/object/public/static_bundle/bundle.js"><script/>`}
                bodyCode={`<chat-front identifier="${chatbotQuery.data?.key}"></chat-front>`}
                cssCode={`<link rel="stylesheet" href="https://xducfpbdokcesmazrdfe.supabase.co/storage/v1/object/public/static_bundle/bundle.css">`}
              />
            </div>
          </div>
        </section>
      )}
      <section
        className={classNames(
          'absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/20',
          {
            hidden: !(loading || chatbotQuery.isFetching),
          }
        )}>
        <Spinner />
      </section>
    </WaitForData>
  )
}

export default ChatbotContainer

function ChatbotTogglingSwitch({
  onClick,
  checked,
}: {
  onClick: (arg0: boolean) => Promise<void>
  checked?: boolean
}) {
  return (
    <ToolTip text='Click to toggle chatbot.' position='TOP'>
      <input
        type='checkbox'
        className='toggle'
        checked={checked}
        onChange={async () => {
          await onClick(!checked)
        }}
      />
    </ToolTip>
  )
}
