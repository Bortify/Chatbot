'use client'
import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import {
  AlertCircle,
  Delete,
  LucideFolderEdit,
  PlusIcon,
  Trash2,
} from 'lucide-react'

import Typography from '@/components/Typography'
import { ChatbotDetails } from '@/lib/type/chatbot'
import Button from '@/components/Button'
import ToolTip from '@/components/Tooltip'
import KnowledgeSourceModal from '@/components/KnowledgeSourceModal'
import DeleteConfirmation from '@/components/DeleteConfirmation'

import { useKnowledgeSource } from './hooks/useKnowledgeSource'
import { deleteKnowledgeSource } from '@/api/browser/knowledge'
import { invalidate } from '@/utils/query'

type PropTypes = {
  knowledgeSources: ChatbotDetails['knowledgeBase']['knowledgeSource']['0'][]
  orgId: number
  chatbotId: number
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
          className='pb-5 mb-5 border-b-2 text-gray-950'>
          Knowledge Source
        </Typography.Heading>
        {knowledgeSources?.length === 0 && (
          <span className='flex items-center justify-center p-5 font-semibold text-gray-950 alert alert-warning'>
            <AlertCircle className='w-6 h-6' />
            {`You don't have any Knowledge Source as of now`}{' '}
            <span
              className='font-bold underline cursor-pointer'
              onClick={() => {
                setCreateModalVisible(true)
              }}>
              Create One Here
            </span>
          </span>
        )}
        {knowledgeSources?.length !== 0 && (
          <div className='flex flex-col gap-3'>
            {knowledgeSources?.map((entry) => (
              <KnowledgeSourceEntry
                knowledgeSource={entry}
                key={entry.id}
                orgId={orgId}
                chatbotId={chatbotId}
              />
            ))}
            <Button
              block
              onClick={() => {
                setCreateModalVisible(true)
              }}>
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

function KnowledgeSourceEntry(props: {
  knowledgeSource: ChatbotDetails['knowledgeBase']['knowledgeSource']['0']
  orgId: number
  chatbotId: number
}) {
  const { status, knowledgeSource } = useKnowledgeSource(props)
  const [deleteModalVisible, setDeleteModalVsibility] = useState<boolean>(false)
  return (
    <>
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
            <div className='flex items-center gap-1'>
              <span
                className={classNames(
                  'font-semibold text-xxs font-nunito badge text-white',
                  {
                    'badge-success': status === 'SUCCEED',
                    'badge-error': status === 'ERROR',
                    'badge-warning': status === 'PROCESSING',
                  }
                )}>
                {status === 'ERROR' && 'Failed'}
                {status === 'PROCESSING' && 'Training'}
                {status === 'SUCCEED' && 'Active'}
              </span>
            </div>
          </div>
          <div className='flex items-center justify-center gap-2'>
            {/* <ToolTip position='LEFT' text='Edit'>
              <Button
                size='small'
                color='ghost'
                className='btn-circle bg-base-300'>
                <LucideFolderEdit className='w-4 h-4' />
              </Button>
            </ToolTip> */}
            <ToolTip position='RIGHT' text='Delete'>
              <Button
                size='small'
                state='error'
                className='btn-circle'
                onClick={() => {
                  setDeleteModalVsibility(true)
                }}>
                <Trash2 className='w-4 h-4' />
              </Button>
            </ToolTip>
          </div>
        </div>
      </div>
      <DeleteConfirmation
        active={deleteModalVisible}
        visibilityDispatcher={setDeleteModalVsibility}
        matcher={`Delete ${knowledgeSource.name}`}
        onConfirm={async () => {
          await deleteKnowledgeSource({
            chatbotId: props.chatbotId,
            knowledgeId: knowledgeSource.id,
            orgId: props.orgId,
          })
          invalidate(['organisation', props.orgId, 'chatbot', props.chatbotId])
        }}
        title='Delete Knowledge Source'
        text={`Your chatbot will not longer be able to answer queries related to knowledge base ${knowledgeSource.name}. Are you sure sure about deleting it?`}
      />
    </>
  )
}
