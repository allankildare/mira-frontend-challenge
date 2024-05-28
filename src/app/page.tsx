'use client'
import { Chat, Menu } from '~/ui/components'
import { HomePage } from '~/ui/views'
import { NextUIProvider } from '@nextui-org/react'
import dynamic from 'next/dynamic'
const DataContextProvider = dynamic(() => import('~/contexts/dataContext'), { ssr: false })

export default function Home() {
  return (
    <DataContextProvider>
      <NextUIProvider>
        <Menu />
        <main>
          <HomePage />
        </main>
        <Chat />
      </NextUIProvider>
    </DataContextProvider>
  )
}
