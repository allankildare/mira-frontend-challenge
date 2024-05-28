'use client'
import Image from 'next/image'
import { useContext, useState } from 'react'
import './styles.css'
import { Input } from '@nextui-org/react'
import { DataContext } from '~/contexts/dataContext'
import { Message } from '~/types'
import { SendButtonInterface } from './types'

function SendButton({ message, setMessage }: SendButtonInterface) {
  const { sendMessage }: any = useContext(DataContext)

  return (
    <button title="Send message">
      <Image
        src="/icons/send.svg"
        alt="Send message"
        width={16}
        height={16}
        onClick={(event) => {
          event.preventDefault()
          sendMessage(message)
          setMessage('')
        }}
      />
    </button>
  )
}

export function Chat() {
  const { chat, sendMessage }: any = useContext(DataContext)
  const [message, setMessage] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)

  function handleMessageSend() {
    sendMessage(message)
    setMessage('')
  }

  return (
    <div className="fixed bottom-3 right-3 flex flex-col items-end">
      {isChatOpen && (
        <div className="bg-gray-50 shadow-md rounded-md px-2 py-2 mb-3">
          <div
            className="messages p-2"
            style={{
              maxHeight: '500px',
              overflowY: 'auto',
            }}
          >
            {chat.map((msg: Message, index: number) => {
              return (
                <div
                  key={`msg${index}`}
                  className="msg bg-cyan-100"
                  style={{
                    backgroundColor:
                      msg.type === 'patient' ? '#cffafe' : '#f5f5f4',
                  }}
                >
                  {msg.text}
                </div>
              )
            })}
          </div>
          <div>
            <Input
              type="text"
              endContent={
                <SendButton message={message} setMessage={setMessage} />
              }
              value={message}
              onChange={(event) => {
                setMessage(event.target.value)
              }}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  handleMessageSend()
                }
              }}
            />
          </div>
        </div>
      )}
      <button
        className="chat-btn flex gap-x-1 bg-sky-400 rounded-full shadow-md text-white px-3 py-2"
        onClick={(event) => {
          event.preventDefault()
          setIsChatOpen((currentState) => !currentState)
        }}
      >
        <Image src="/icons/chat.svg" alt="Chat icon" height={16} width={16} />
        Chat
      </button>
    </div>
  )
}
