import React, { ReactNode } from 'react'
import Spinner from '../Spinner'

type PropType = {
  loading: boolean
  children: ReactNode
}

function WaitForData({ children, loading }: PropType) {
  if (loading)
    return (
      <div className='grid w-screen h-screen place-items-center'>
        <Spinner color='neutral'/>
      </div>
    )
  return children
}

export default WaitForData
