'use client'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import './styles.css'
import { Input } from '@nextui-org/react'
import { DataContext } from '~/contexts/dataContext'
import { Message } from '~/types'

function SendButton() {
  return (
    <button title="Send message">
      <Image src="/icons/send.svg" alt="Send message" width={16} height={16} />
    </button>
  )
}

export function Chat() {
  const { chat, isProviderView, sendMessage }: any =
    useContext(DataContext)
  const [message, setMessage] = useState('')

  useEffect(() =>{
    console.log('change')
  }, [chat])

  return (
    <div className="fixed bottom-3 right-3 flex flex-col items-end">
      <div className="bg-gray-50 shadow-md rounded-md px-2 py-2 mb-3">
        <div className="messages p-2">
          {chat.map((msg: Message, index: number) => {
            return (
              <div
                key={`msg${index}`}
                className="msg bg-cyan-100"
              >
                {msg.text}
              </div>
            )
          })}
        </div>
        <div>
          <Input
            type="text"
            endContent={<SendButton />}
            defaultValue={message}
            onChange={(event) => {
              // event.preventDefault()
              setMessage(event.target.value)
            }}
          />
        </div>
      </div>
      <button
        className="chat-btn flex gap-x-1 bg-sky-400 rounded-full shadow-md text-white px-3 py-2"
        onClick={(event) => {
          event.preventDefault()
          sendMessage(message)
          setMessage('')
        }}
      >
        <Image src="/icons/chat.svg" alt="Chat icon" height={16} width={16} />
        Chat
      </button>
    </div>
  )
}
