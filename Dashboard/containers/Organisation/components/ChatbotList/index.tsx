'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import Link from 'next/link'
import gsap from 'gsap'
import { Plus } from 'lucide-react'

import Button from '@/components/Button'
import Spinner from '@/components/Spinner'
import { ChatbotType } from '@/lib/type/chatbot'
import Typography from '@/components/Typography'
import { listChatbots } from '@/api/browser/chatbot'

import Chatbot from './assets/chatbot.png'
import ChatbotModal from '@/components/ChatbotModal'

export default function ChatbotList({ orgId }: { orgId: number }) {
  const chatbotQuery = useQuery({
    queryKey: ['organisation', orgId, 'chatbots'],
    queryFn: () => listChatbots({ orgId }),
    refetchOnWindowFocus: false,
  })

  const loading = chatbotQuery.isLoading || chatbotQuery.isFetching
  const [createChatbotModalVisible, setcreateChatbotModalVisible] =
    useState<boolean>(false)

  useEffect(() => {
    gsap.fromTo(
      '.chatbotCards',
      {
        yPercent: 50,
        opacity: 0,
      },
      {
        yPercent: 0,
        stagger: 0.05,
        delay: 0.3,
        opacity: 1,
        ease: 'elastic.out(1,0.3)',
      }
    )
  }, [chatbotQuery.data, loading])

  return (
    <>
      <div className='h-screen p-5 mt-4 overflow-scroll bg-white rounded-lg max-h-container'>
        {chatbotQuery.data?.length === 0 && (
          <div className='flex flex-col items-center justify-center w-full h-full gap-3'>
            <Typography.Content
              boldness={600}
              size='sm'
              className='text-gray-400'>{`You don't have any chatbots.`}</Typography.Content>
            <Button
              size='small'
              className='text-white'
              onClick={() => {
                setcreateChatbotModalVisible(true)
              }}>
              Create <Plus className='w-5 h-5' />
            </Button>
          </div>
        )}
        {loading && (
          <div className='flex flex-col items-center justify-center w-full h-full gap-3'>
            <Spinner color='gray' size='medium' />
          </div>
        )}
        {!loading && chatbotQuery.data?.length !== 0 && (
          <div className='grid grid-cols-5 gap-5'>
            {chatbotQuery.data?.map((chatbot: ChatbotType) => (
              <Card key={chatbot.id} chatbot={chatbot} orgId={orgId} />
            ))}
            <div
              className='flex flex-col items-center justify-center w-full h-full duration-150 ease-in-out rounded-lg bg-gray-50/60 hover:bg-gray-100/80 aspect-square chatbotCards'
              style={{
                opacity: 0,
              }}>
              <Button
                color={'none'}
                className='bg-gray-600 btn-circle'
                onClick={() => {
                  setcreateChatbotModalVisible(true)
                }}>
                <Plus className='w-5 h-5 text-white text-bold' />
              </Button>
            </div>
          </div>
        )}
      </div>
      <ChatbotModal
        active={createChatbotModalVisible}
        visibilityDispatcher={setcreateChatbotModalVisible}
        type='CREATE'
        orgId={orgId}
      />
    </>
  )
}

function Card({ chatbot, orgId }: { chatbot: ChatbotType; orgId: number }) {
  return (
    <Link href={`/dashboard/organisation/${orgId}/chatbot/${chatbot.id}`}>
      <div
        className={classNames(
          'flex relative flex-col overflow-hidden items-center justify-center w-full h-full duration-150 ease-in-out border-2 rounded-lg cursor-pointer aspect-square hover:shadow-md chatbotCards',
          {
            'border-primary': chatbot.active,
            'border-gray-200': !chatbot.active,
          }
        )}
        style={{
          opacity: 0,
        }}>
        <Image
          src={Chatbot}
          width={64}
          height={64}
          alt='org_logo'
          className={classNames('w-16 h-16 mb-2')}
        />
        <Typography.Heading
          size='base'
          fontFamily='manrope'
          variant='h4'
          boldness={700}
          className='text-slate-950'>
          {chatbot.name}
        </Typography.Heading>
        <span
          className={classNames(
            'px-2 py-1 rounded-bl-lg absolute top-0 right-0',
            {
              'bg-primary text-white': chatbot.active,
              'bg-gray-200 text-slate-950': !chatbot.active,
            }
          )}>
          <Typography.Content size='xxs' boldness={700} fontFamily='manrope'>
            {chatbot.active ? 'Active' : 'Disabled'}
          </Typography.Content>
        </span>
      </div>
    </Link>
  )
}
