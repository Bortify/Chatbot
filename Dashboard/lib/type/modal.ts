import { Dispatch, SetStateAction } from 'react'
import { OrganisationType } from './organisation'

export type ModalPropType = {
  active: boolean
  visibilityDispatcher: Dispatch<SetStateAction<boolean>>
  type: 'CREATE' | 'UPDATE'
  prevValues?: {
    name: string
  }
  orgId?: number
}
