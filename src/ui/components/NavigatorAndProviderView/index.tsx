'use client'
import data from '~/data/index.json'
import { ProviderView } from './components/ProviderView'
import { CareNavigatorView } from './components/CareNavigatorView'
import { DataContext } from '~/contexts/dataContext'
import { useContext } from 'react'

export function NavigatorAndProviderView() {
  const { isProviderView, toggleView }: any = useContext(DataContext)

  return (
    <div className="card-mira mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h1 className="card-mira-title text-2xl font-medium">
          {isProviderView ? 'Provider View' : 'Care Navigator View'}
        </h1>
        <button
          className="bg-mira-darker-green rounded-lg font-medium px-2 py-1 text-white"
          onClick={toggleView}
        >
          {`Switch to ${
            isProviderView ? 'Care Navigator View' : 'Provider View'
          }`}
        </button>
      </div>

      <div>
        <h2 className="text-xl font-medium">Chief Complaint</h2>
        <p>{data.miraOSsummary.chiefComplaint}</p>
        {isProviderView ? <ProviderView /> : <CareNavigatorView />}
      </div>
    </div>
  )
}
