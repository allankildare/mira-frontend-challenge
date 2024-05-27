'use client'
import { StatusCard } from './components/StatusCard'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Modal } from '../Modal'
import { Button, DatePicker, Select, SelectItem } from '@nextui-org/react'
import dayjs from 'dayjs'
import { parseDate } from '@internationalized/date'

type TimeOfDay = 'morning' | 'afternoon' | 'evening'
type StatusType = 'pending' | 'confirmed' | 'rejected'

export function OrderDetails() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [intendedDate, setIntendedDate] = useState(new Date(2022, 0, 12))
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning')
  const [status, setStatus] = useState<StatusType>('pending')

  function openModal() {
    setIsEditModalOpen(true)
  }

  function closeModal() {
    setIsEditModalOpen(false)
  }

  useEffect(() => {
    if (isEditModalOpen) document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isEditModalOpen])

  return (
    <div className="card-mira mx-auto">
      <div className="flex justify-between mb-2">
        <h1 className="card-mira-title text-2xl font-medium">Order details</h1>
        <div className="flex items-center gap-x-1">
          <StatusCard type={status} />
          <button className="ml-2" type="button" onClick={openModal}>
            <Image
              src="/icons/pencil-solid.svg"
              alt="Button to edit order details"
              width={24}
              height={24}
              title="Edit order"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-6 text-lg">
        <ul>
          <li>
            <b>Member:</b> ryan.bruns
          </li>
          <li>
            <b>Date of birth:</b> 01/01/1980
          </li>
          <li>
            <b>Request Address:</b> 98 St Marks Pl, New York, NY
          </li>
          <li>
            <b>Received:</b> 01/11/2022
          </li>
        </ul>

        <ul>
          <li>
            <b>Intended Date:</b> {dayjs(intendedDate).format('MM/DD/YYYY')}
          </li>
          <li>
            <b>Requested Time of Day:</b> {timeOfDay}
          </li>
          <li>
            <b>Assigned Agent:</b> Ryan Bruns
          </li>
          <li>
            <b>Time Zone:</b> EDT
          </li>
        </ul>
      </div>

      {isEditModalOpen && (
        <div className="modal-bg">
          <Modal title="Edit order detail" closeFunc={closeModal}>
            <form className="block mx-auto">
              <Select
                label="Status"
                defaultSelectedKeys={[status]}
                className="mb-2"
                onChange={(event) => {
                  setStatus(event.target.value as StatusType)
                }}
              >
                <SelectItem key="pending" value="pending">
                  Reviewing
                </SelectItem>
                <SelectItem
                  key="confirmed"
                  value="confirmed"
                  className="text-green-600"
                >
                  Confirmed
                </SelectItem>
                <SelectItem
                  key="rejected"
                  value="rejected"
                  className="text-red-500"
                >
                  Rejected
                </SelectItem>
              </Select>

              <Select
                label="Time of day"
                defaultSelectedKeys={['morning']}
                className="mb-2"
                onChange={(event) => {
                  setTimeOfDay(event.target.value as TimeOfDay)
                }}
              >
                <SelectItem key="morning" value="morning">
                  Morning
                </SelectItem>
                <SelectItem key="afternoon" value="afternoon">
                  Afternoon
                </SelectItem>
                <SelectItem key="evening" value="evening">
                  Evening
                </SelectItem>
              </Select>
              <DatePicker
                label="Intended date"
                defaultValue={parseDate(
                  dayjs(intendedDate).format('YYYY-MM-DD')
                )}
                className="mb-2"
                onChange={(date) => {
                  setIntendedDate(new Date(date.year, date.month - 1, date.day))
                }}
              />
              <Button color="primary" className="ml-auto mr-0" onClick={closeModal}>Finish</Button>
            </form>
          </Modal>
        </div>
      )}
    </div>
  )
}
