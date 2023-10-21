import React, { ReactNode } from 'react'
import EmailVerificationModal from './EmailVerificationModal'

type PropType = {
  children: ReactNode
  emailVerified: boolean
}

function EmailVerification({ children, emailVerified }: PropType) {
  if (!emailVerified) {
    return <EmailVerificationModal active={true} />
  }
  return <>{children}</>
}

export default EmailVerification
