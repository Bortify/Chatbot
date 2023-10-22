'use client'
import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

import Spinner from '../Spinner'

type PropType = {
  loading: boolean
  children: ReactNode
  error?: boolean | null
}

function WaitForData({ children, loading, error }: PropType) {
  const router = useRouter()
  if (error) {
    router.back()
    return (
      <div className='grid w-screen h-screen place-items-center'>
        <Spinner color='neutral' />
      </div>
    )
  }

  if (loading)
    return (
      <div className='grid w-screen h-screen place-items-center'>
        <Spinner color='neutral' />
      </div>
    )

  return children
}

export default WaitForData
