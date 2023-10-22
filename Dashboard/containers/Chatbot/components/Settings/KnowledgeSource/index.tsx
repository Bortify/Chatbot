'use client'
import React, { useEffect, useState } from 'react'

import Typography from '@/components/Typography'
import { ChatbotDetails } from '@/lib/type/chatbot'
import { AlertCircle, LucideFolderEdit, PlusIcon, Trash2 } from 'lucide-react'
import Button from '@/components/Button'
import ToolTip from '@/components/Tooltip'
import Spinner from '@/components/Spinner'
import classNames from 'classnames'
import KnowledgeSourceModal from '@/components/KnowledgeSourceModal'

type PropTypes = {
  knowledgeSources?: ChatbotDetails['knowledgeBase']['knowledgeSource']['0'][]
  orgId?: number
  chatbotId?: number
}

function KnowledgeSource({ knowledgeSources, chatbotId, orgId }: PropTypes) {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false)
  return (
    <>
      <div className='w-full p-5 bg-white rounded-xl'>
        <Typography.Heading
          variant='h3'
          size='3xl'
          boldness={600}
          fontFamily='poppins'
          className='pb-5 mb-5 text-gray-400 border-b-2'>
          Knowledge Source
        </Typography.Heading>
        {knowledgeSources?.length === 0 && (
          <span className='flex items-center justify-center p-5 font-semibold text-gray-950 alert alert-warning'>
            <AlertCircle className='w-6 h-6' />
            {`You don't have any Knowledge Source as of now`}{' '}
            <span className='font-bold underline cursor-pointer' onClick={()=>{ setCreateModalVisible(true) }}>
              Create One Here
            </span>
          </span>
        )}
        {knowledgeSources?.length !== 0 && (
          <div className='flex flex-col gap-3'>
            {knowledgeSources?.map((entry) => (
              <KnowledgeSourceEntry knowledgeSource={entry} key={entry.id} />
            ))}
            <Button block onClick={()=>{ setCreateModalVisible(true) }}>
              Create <PlusIcon className='w-4 h-4' />
            </Button>
          </div>
        )}
      </div>
      <KnowledgeSourceModal
        chatbotId={chatbotId}
        orgId={orgId}
        type='CREATE'
        active={createModalVisible}
        visibilityDispatcher={setCreateModalVisible}
      />
    </>
  )
}

export default KnowledgeSource

function KnowledgeSourceEntry({
  knowledgeSource,
}: {
  knowledgeSource: ChatbotDetails['knowledgeBase']['knowledgeSource']['0']
}) {
  const [status, setStatus] = useState<
    'ACTIVE' | 'ERROR' | 'PROCESSING' | 'LOADING'
  >('LOADING')

  useEffect(()=>{
    setStatus('ACTIVE')
  },[])

  return (
    <div className='rounded-xl bg-base-200/50'>
      <div className='relative flex items-center justify-between collapse-title'>
        <div className='flex items-center justify-center gap-5'>
          <Typography.Heading
            variant='h4'
            size='base'
            boldness={600}
            fontFamily='manrope'
            className='text-accent-content'>
            {knowledgeSource.name}
          </Typography.Heading>
          <div className='flex items-center gap-2'>
            <span
              className={classNames('block w-3 h-3 rounded-full', {
                'bg-yellow-500': status === 'PROCESSING',
                'bg-green-500': status === 'ACTIVE',
                'bg-red-500': status === 'ERROR',
              })}
            />
          </div>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <ToolTip position='LEFT' text='Edit'>
            <Button
              size='small'
              color='ghost'
              className='btn-circle bg-base-300'>
              <LucideFolderEdit className='w-4 h-4' />
            </Button>
          </ToolTip>
          <ToolTip position='RIGHT' text='Delete'>
            <Button size='small' state='error' className='btn-circle'>
              <Trash2 className='w-4 h-4' />
            </Button>
          </ToolTip>
        </div>
        {status === 'LOADING' && (
          <div className='absolute top-0 left-0 grid w-full h-full rounded-xl backdrop-blur-2xl place-items-center'>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  )
}
