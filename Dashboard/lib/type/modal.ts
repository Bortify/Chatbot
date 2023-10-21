import { Dispatch, SetStateAction } from 'react'
export type ModalPropType = {
  active: boolean
  visibilityDispatcher: Dispatch<SetStateAction<boolean>>
}
