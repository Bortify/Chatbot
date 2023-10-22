'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import Link from 'next/link'
import gsap from 'gsap'
import { Plus } from 'lucide-react'

import { listOrganisations } from '@/app/api/browser/organisation'
import Button from '@/components/Button'
import Spinner from '@/components/Spinner'
import { OrganisationType } from '@/lib/type/organisation'
import Typography from '@/components/Typography'
import CreateOrgModal from '@/components/OrgModal'

import Organisation from './assets/organisation.svg'

function OrganisationsList() {
  const orgQuery = useQuery({
    queryKey: ['organisations'],
    queryFn: listOrganisations,
    refetchOnWindowFocus: false,
  })
  const [orgModalVisible, setOrgModalVisibility] = useState<boolean>(false)
  const loading = orgQuery.isLoading || orgQuery.isFetching

  useEffect(() => {
    gsap.fromTo(
      '.orgCards',
      {
        yPercent: 50,
        opacity: 0,
      },
      {
        yPercent: 0,
        stagger: 0.2,
        duration: 0.3,
        delay: 0.1,
        opacity: 1,
        ease: 'elastic.out(1,0.3)',
      }
    )
  }, [orgQuery.data, loading])

  return (
    <>
      <div className='h-screen p-5 mt-4 overflow-scroll bg-white rounded-lg max-h-container'>
        {orgQuery.data?.length === 0 && (
          <div className='flex flex-col items-center justify-center w-full h-full gap-3'>
            <Typography.Content
              boldness={600}
              size='sm'
              className='text-gray-400'>{`You don't have any active organisation.`}</Typography.Content>
            <Button
              size='small'
              className='text-white'
              onClick={() => {
                setOrgModalVisibility(true)
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
        {!loading && orgQuery.data?.length !== 0 && (
          <div className='grid grid-cols-5 gap-5'>
            {orgQuery.data?.map((org: OrganisationType) => (
              <Card key={org.id} organisation={org} />
            ))}
            <div
              className='flex flex-col items-center justify-center w-full h-full duration-150 ease-in-out rounded-lg bg-gray-50/60 hover:bg-gray-100/80 aspect-square orgCards'
              style={{
                opacity: 0,
              }}>
              <Button
                color={'none'}
                className='bg-gray-600 btn-circle'
                onClick={() => {
                  setOrgModalVisibility(true)
                }}>
                <Plus className='w-5 h-5 text-white text-bold' />
              </Button>
            </div>
          </div>
        )}
      </div>
      <CreateOrgModal
        type='CREATE'
        active={orgModalVisible}
        visibilityDispatcher={setOrgModalVisibility}
      />
    </>
  )
}

export default OrganisationsList

function Card({ organisation }: { organisation: OrganisationType }) {
  return (
    <Link href={`/dashboard/organisation/${organisation.id}`}>
      <div
        className='flex flex-col items-center justify-center w-full h-full duration-150 ease-in-out border rounded-lg cursor-pointer aspect-square hover:shadow-md orgCards'
        style={{
          opacity: 0,
        }}>
        <Image
          src={organisation.logo || Organisation}
          width={64}
          height={64}
          alt='org_logo'
          className={classNames('w-16 h-16 mb-2', {
            'rounded-2xl': organisation.logo,
          })}
        />
        <Typography.Heading
          size='base'
          fontFamily='manrope'
          variant='h4'
          boldness={700}
          className='text-slate-950'>
          {organisation.name}
        </Typography.Heading>
      </div>
    </Link>
  )
}
