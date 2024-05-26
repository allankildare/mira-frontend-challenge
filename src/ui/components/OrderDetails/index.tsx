import data from '~/data/index.json'
import { StatusCard } from './components/StatusCard'
import Link from 'next/link'
import './styles.css'

export function OrderDetails() {
  return (
    <div
      className="order-details px-6 py-4 rounded-xl mx-auto"
      style={{ backgroundColor: 'rgb(240, 240, 240)' }}
    >
      <div className="flex justify-between mb-2">
        <h1 className="card-mira-title text-2xl font-medium">Order details</h1>
        <div className="inline-block">
          <StatusCard type="pending" />
          <Link href="#" className="ml-2">Edit</Link>
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
            <b>Intended Date:</b> 01/12/2022
          </li>
          <li>
            <b>Requested Time of Day:</b> Morning
          </li>
          <li>
            <b>Assigned Agent:</b> Ryan Bruns
          </li>
          <li>
            <b>Time Zone:</b> EDT
          </li>
        </ul>
      </div>
    </div>
  )
}
