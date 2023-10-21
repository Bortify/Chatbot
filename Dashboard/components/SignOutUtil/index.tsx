'use client'
import React, { useEffect } from 'react'
import { signOut } from 'next-auth/react'

import Spinner from '../Spinner'

function SignOutUtil() {
  useEffect(() => {
    signOut()
  }, [])

  return (
    <section className='grid w-screen h-screen place-items-center'>
      <Spinner />
    </section>
  )
}

export default SignOutUtil
