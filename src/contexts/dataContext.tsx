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

export default function DataContextProvider({ children }: { children: ReactNode }) {
  const [isProviderView, setIsProviderView] = useState(false)
  const [currentData, setCurrentData] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('mira-data')
      return savedData ? JSON.parse(savedData) : data
    }
    return data
  })
  const [chat, setChat] = useState(CHAT_DEFAULT)

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
      (_: any, medIndex: number) => medIndex !== index
    )
    setCurrentData({ ...currentData, OTC: filteredOTC })
  }

  function addMedicine(medicineData: any) {
    const typeObj = MEDICINE_TYPES.find(
      (item) => item.value === medicineData.type
    )
    const medicineDataFormatted = { ...medicineData, type: typeObj?.text }
    const newMed = [...currentData.OTC, medicineDataFormatted]
    setCurrentData((currentState: any) => ({ ...currentState, OTC: newMed }))
  }

  function updateComplaintAndSelfCare({ selfCareTips, chiefComplaint }: any) {
    setCurrentData((currentState: any) => ({
      ...currentState,
      selfCareTips,
      miraOSsummary: { ...currentState.miraOSsummary, chiefComplaint },
    }))
  }
  return (
    <DataContext.Provider
      value={
        {
          chat,
          currentData,
          isProviderView,
          updateComplaintAndSelfCare,
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
