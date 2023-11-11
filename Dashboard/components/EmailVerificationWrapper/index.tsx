import React, { ReactNode } from 'react'
import EmailVerificationModal from './EmailVerificationModal'
import { useSession } from 'next-auth/react'

type PropType = {
  children: ReactNode
}

function EmailVerification({ children }: PropType) {
  return (
    <EmailVerificationModal>{children}</EmailVerificationModal>
  )
}

export default EmailVerification
