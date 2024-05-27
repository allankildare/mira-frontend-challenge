import { createContext, ReactNode, useEffect, useState } from 'react'
import data from '~/data/index.json'

export const DataContext = createContext(data)

export function DataContextProvider({ children }: { children: ReactNode }) {
  const [currentData, setCurrentData] = useState(data)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('mira-data') === null) setCurrentData(data)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mira-data', JSON.stringify(currentData))
  }, [currentData])

  function deleteMedicine(index: number) {
    const filteredOTC = currentData.OTC.filter(
      (_, medIndex) => medIndex !== index
    )
    setCurrentData({ ...currentData, OTC: filteredOTC })
  }
  return (
    <DataContext.Provider value={{ currentData, deleteMedicine } as any}>
      {children}
    </DataContext.Provider>
  )
}
