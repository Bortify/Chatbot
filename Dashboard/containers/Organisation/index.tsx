'use client'
import { ArrowLeftIcon, Edit, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import Button from '@/components/Button'
import Typography from '@/components/Typography'
import WaitForData from '@/components/WaitForData'
import {
  deleteOrganisation,
  getOrganisation,
} from '@/app/api/browser/organisation'
import { OrganisationType } from '@/lib/type/organisation'
import UpdateOrgModal from '@/components/OrgModal'

import ChatbotList from './components/ChatbotList'
import DeleteConfirmation from '@/components/DeleteConfirmation'
import { invalidate } from '@/utils/query'
import ChatbotModal from '@/components/ChatbotModal'

type PropTypes = {
  orgId: number
}

function Organisation({ orgId }: PropTypes) {
  const router = useRouter()
  const orgQuery = useQuery<OrganisationType>({
    queryKey: ['organisation', orgId],
    queryFn: () => getOrganisation(orgId),
  })
  const loading = orgQuery.isLoading || orgQuery.isFetching
  const [updateModalVisible, setUpdateModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  const deleteHandler = async () => {
    await deleteOrganisation(orgId)
    invalidate(['organisations'])
    router.back()
  }

  return (
    <WaitForData
      loading={loading}
      error={orgQuery.error && orgQuery.isError && !loading}>
      <section className='grid w-screen h-screen bg-slate-50 place-items-center'>
        <div className='w-full max-w-container'>
          <div className='flex items-start justify-between w-full'>
            <div>
              <Typography.Heading
                size='5xl'
                boldness={700}
                fontFamily='manrope'
                variant='h1'
                className='text-slate-950'>
                {orgQuery.data?.name}
              </Typography.Heading>
              <Typography.Content size='sm' className='mt-4 text-slate-500'>
                Select or Create a chatbot from the given list.
              </Typography.Content>
            </div>
            <div className='flex gap-2'>
              <Button
                color='ghost'
                onClick={() => {
                  setUpdateModalVisible(true)
                }}>
                Edit Details
                <Edit className='w-4 h-4' />
              </Button>
              <Button
                color='none'
                state='error'
                onClick={() => {
                  setDeleteModalVisible(true)
                }}>
                Delete <Trash2 className='w-3 h-3' />
              </Button>
            </div>
          </div>
          <ChatbotList orgId={orgId} />
          <div className='w-full mt-5'>
            <Button
              color='none'
              onClick={() => {
                router.push('/dashboard')
              }}>
              <ArrowLeftIcon className='w-5 h-5' />
              Organisations
            </Button>
          </div>
        </div>
      </section>
      <UpdateOrgModal
        active={updateModalVisible}
        visibilityDispatcher={setUpdateModalVisible}
        orgId={orgId}
        prevValues={orgQuery.data}
        type='UPDATE'
      />
      <DeleteConfirmation
        onConfirm={deleteHandler}
        active={deleteModalVisible}
        visibilityDispatcher={setDeleteModalVisible}
        matcher={`Delete ${orgQuery.data?.name}`}
        title='Delete Organisation'
        text='Organisation once deleted can not be retrieved.'
      />
    </WaitForData>
  )
}

export default Organisation
