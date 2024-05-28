'use client'
import { createContext, ReactNode, useEffect, useState } from 'react'
import data from '~/data/index.json'
import { MEDICINE_TYPES } from '~/ui/components/NavigatorAndProviderView/components/ProviderView'
import { Message } from '~/types'

const CHAT_DEFAULT: Message[] = [
  {
    type: 'patient',
    text: 'Patient: I have been feeling unwell for the past few days.',
  },
  {
    type: 'careNavigator',
    text: 'Care Navigator: Can you describe your symptoms?',
  },
  {
    type: 'patient',
    text: 'Patient: I have a runny nose, sore throat, and mild fever.',
  },
]

export const DataContext = createContext(data)

export function DataContextProvider({ children }: { children: ReactNode }) {
  const [isProviderView, setIsProviderView] = useState(true)
  const [currentData, setCurrentData] = useState(data)
  const [chat, setChat] = useState(CHAT_DEFAULT)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('mira-data') === null) setCurrentData(data)
      else {
        setCurrentData(JSON.parse(localStorage.getItem('mira-data') as string))
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mira-data', JSON.stringify(currentData))
    }
  }, [currentData])

  function toggleView() {
    setIsProviderView(!isProviderView)
  }

  function sendMessage(msg: string) {
    if (isProviderView) {
      setChat((currentChat) => [
        ...currentChat,
        { type: 'careNavigator', text: `Care navigator: ${msg}` },
      ])
    } else {
      setChat((currentChat) => [
        ...currentChat,
        { type: 'patient', text: `Patient: ${msg}` },
      ])
    }
  }

  function deleteMedicine(index: number) {
    const filteredOTC = currentData.OTC.filter(
      (_, medIndex) => medIndex !== index
    )
    setCurrentData({ ...currentData, OTC: filteredOTC })
  }

  function addMedicine(medicineData: any) {
    const typeObj = MEDICINE_TYPES.find(
      (item) => item.value === medicineData.type
    )
    const medicineDataFormatted = { ...medicineData, type: typeObj?.text }
    const newMed = [...currentData.OTC, medicineDataFormatted]
    setCurrentData((currentState) => ({ ...currentState, OTC: newMed }))
  }
  return (
    <DataContext.Provider
      value={
        {
          chat,
          currentData,
          isProviderView,
          sendMessage,
          toggleView,
          addMedicine,
          deleteMedicine,
        } as any
      }
    >
      {children}
    </DataContext.Provider>
  )
}
