import Image from 'next/image'
import { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  title: string
  closeFunc: () => void
}

export function Modal({ children, title, closeFunc }: ModalProps) {
  return (
    <div className="modal-bg">
      <div className="modal-wrapper">
        <div className="modal-view">
          <div className="flex justify-between items-center w-full mb-2">
            <h1 className="card-mira-title text-xl">{title}</h1>
            <button
              onClick={(event) => {
                event.preventDefault()
                closeFunc()
              }}
            >
              <Image
                src="/icons/xmark-solid.svg"
                alt="Close Order detail edition"
                width={16}
                height={16}
              />
            </button>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  )
}
