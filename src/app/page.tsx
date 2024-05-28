'use client'
import { Chat, Menu } from '~/ui/components'
import { HomePage } from '~/ui/views'
import { NextUIProvider } from '@nextui-org/react'
import { DataContextProvider } from '~/contexts/dataContext'

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
