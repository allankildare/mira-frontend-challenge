import { Dispatch, SetStateAction } from 'react'

export interface SendButtonInterface {
  message: string
  setMessage: Dispatch<SetStateAction<string>>
}
