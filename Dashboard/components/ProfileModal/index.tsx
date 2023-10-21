import React from 'react'

import { ModalPropType } from '@/lib/type/modal'

import Modal from '../Modal'

function ProfileModal({ active, visibilityDispatcher }: ModalPropType) {
  return (
    <Modal
      title='Edit Profile Details'
      active={active}
      onClose={() => {
        visibilityDispatcher(false)
      }}>
      Modal this is
    </Modal>
  )
}

export default ProfileModal
