import { useContext } from 'react'
import { DataContext } from '~/contexts/dataContext'
import { ToastContainer, toast } from 'react-toastify';

export function CareNavigatorView() {
  const { currentData }: any = useContext(DataContext)

  const notifyCareOptionsSend = () => {
    toast.success('Care options sent')
  }

  const notifyCareOptionsCancel = () => {
    toast.error('Order cancelled')
  }

  return (
    <>
      <h2 className="text-xl font-medium">Condition Category</h2>
      <p>{currentData.conditionCategory}</p>
      <h2 className="text-xl font-medium">Triage Level</h2>
      <p>{currentData.triageLevel}</p>
      {currentData.miraCareOptions.map(
        (
          careOption: {
            active: string
            careType: string
            description: string
          },
          index: number
        ) => {
          return (
            careOption.active === 'true' && (
              <div key={`careOption${index}`}>
                <h2 className="text-xl font-medium">Mira Care Options</h2>
                <p className="mb-2">
                  {careOption.careType === 'virtual_primary_care' &&
                    'Virtual Primary Care: '}
                  {careOption.description}
                </p>
              </div>
            )
          )
        }
      )}
      <details className="provider-details mb-2">
        <summary className="text-lg py-1 px-2 rounded bg-mira-dark-green text-white">
          Diagnostic
        </summary>
        <ul className="bg-green-50 py-1 px-2 mb-4">
          <li>No diagnostic information available.</li>
        </ul>
      </details>

      <details className="provider-details mb-2">
        <summary className="text-lg py-1 px-2 rounded bg-mira-dark-green text-white">
          Self-care tips
        </summary>
        <ul className="bg-green-50 py-1 px-2 mb-4">
          <li>{currentData.selfCareTips}</li>
        </ul>
      </details>

      <details className="provider-details mb-2">
        <summary className="text-lg py-1 px-2 rounded bg-mira-dark-green text-white">
          Intake
        </summary>
        <ul className="bg-green-50 py-1 px-2 mb-4">
          <li>Symptoms: Runny nose, sore throat, mild fever</li>
          <li>Duration: 3 days</li>
          <li>Past Medical History: None</li>
          <li>Current Medications: None</li>
          <li>Medication Allergies: None</li>
          <li>Weight: 70 kg</li>
          <li>Height: 170 cm</li>
          <li>BMI: 24.2</li>
          <li>Smoking Status: Non-smoker</li>
          <li>Drinking Status: Occasional drinker</li>
        </ul>
      </details>

      <details className="provider-details mb-2">
        <summary className="text-lg py-1 px-2 rounded bg-mira-dark-green text-white">
          Patient History
        </summary>
        <ul className="bg-green-50 py-1 px-2">
          <li>Last Visit Date: 01/06/2022</li>
          <li>Type: In-person</li>
          <li>Chief Complaint: {currentData.miraOSsummary.chiefComplaint}</li>
          <li>Treatment: Prescribed cough syrup</li>
        </ul>
      </details>
      <button className="w-fit bg-sky-600 text-white px-2 py-1 rounded mt-2 mb-1" onClick={notifyCareOptionsSend}>
        Send Care Options
      </button>
      <button className="w-fit bg-red-600 text-white px-2 py-1 rounded mt-2 mb-1 ml-2" onClick={notifyCareOptionsCancel}>
        Cancel Order
      </button>
      <ToastContainer position="bottom-left" closeOnClick />
    </>
  )
}
