'use client'
import data from '~/data/index.json'
import './styles.css'
import { useContext, useEffect, useState, MouseEvent } from 'react'
import { DataContext } from '~/contexts/dataContext'
import { Modal } from '~/ui/components/Modal'
import { Input, Select, SelectItem, Button } from '@nextui-org/react'

export const MEDICINE_TYPES = [
  { text: 'Antihistamine', value: 'antihistamine' },
  { text: 'Nasal corticosteroid', value: 'nasalCorticosteroid' },
  { text: 'Analgesic', value: 'analgesic' },
  { text: 'Antibiotic', value: 'antibiotic' },
  { text: 'Antiseptic', value: 'antiseptic' },
  { text: 'Bronchodilator', value: 'bronchodilator' },
  { text: 'Diuretic', value: 'diuretic' },
  { text: 'Antacid', value: 'antacid' },
  { text: 'Antidepressant', value: 'antidepressant' },
  { text: 'Antiviral', value: 'antiviral' },
]

export function ProviderView() {
  const [isModalAddMedicineOpen, setIsModalAddMedicineOpen] = useState(false)
  const {
    currentData,
    addMedicine,
    deleteMedicine,
    updateComplaintAndSelfCare,
  }: any = useContext(DataContext)
  const [medicineForm, setMedicineForm] = useState({
    name: '',
    type: '',
    dose: '',
    frequency: '',
    source: 'Available at most pharmacies',
  })

  const [chiefComplaint, setChiefComplaint] = useState(
    currentData.miraOSsummary.chiefComplaint
  )
  const [selfCareTips, setSelfCareTips] = useState(currentData.selfCareTips)

  function openMedicineModal(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setIsModalAddMedicineOpen(true)
  }

  function closeMedicineModal() {
    setIsModalAddMedicineOpen(false)
  }

  function handleDeleteMedicine(event: any, index: number) {
    event.preventDefault()
    deleteMedicine(index)
  }

  function handleUpdateChiefComplaintAndSelfCare() {
    updateComplaintAndSelfCare({ chiefComplaint, selfCareTips })
  }

  return (
    <>
      <hr className="my-4" />
      <h2 className="text-xl font-medium">Mira AI</h2>
      <div className="mb-4">
        <p>
          <strong>Diagnosis:</strong> {data.miraOSsummary.dx[0].diagnosis}
        </p>
        <p>
          <strong>Probability:</strong> {data.miraOSsummary.dx[0].probability}
        </p>
        <p>
          <strong>ICD10CM Code:</strong> {data.miraOSsummary.dx[0].ICD10CMCode}
        </p>

        <p>
          <strong>Diagnosis:</strong>
        </p>
        <ul className="list-disc list-inside">
          {data.rxRecommendation.map((recommendation, index) => {
            return (
              <li key={`recommendation${index}`}>
                {recommendation.name}: {recommendation.dose}
                <br />
                <span className="ml-3 italic">
                  {recommendation.instruction}
                </span>
              </li>
            )
          })}
        </ul>
        <p>
          <strong>Reasons for Dx:</strong> {data.rxExplanation}
        </p>
      </div>

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

      <hr className="my-4" />

      <h2 className="text-xl font-medium mt-2">Treatment Plan</h2>
      <h3>
        <b>Provider Name:</b> {currentData.provider.name}
        <button className="italic underline">(edit)</button>
      </h3>
      <form className="flex flex-col">
        <label htmlFor="selfCareTips" className="font-medium mt-2 mb-1">
          Chief Complaint
        </label>
        <textarea
          name="selfCareTips"
          value={chiefComplaint}
          cols={30}
          rows={3}
          onChange={(event) => {
            setChiefComplaint(event.target.value)
          }}
        />
        {/* <Textarea
          label="Chief complaint"
          defaultValue={currentData.miraOSsummary.chiefComplaint}
          rows={1}
          isRequired
          color="primary"
          className="mt-2"
        /> */}

        <label htmlFor="medicalPrescription" className="font-medium mt-2 mb-1">
          Medical prescription
        </label>
        {currentData.OTC.map(
          (medicine: Record<string, string>, index: number) => {
            return (
              <details key={`medicine${index}`} className="mb-2 cursor-pointer">
                <summary className="flex items-end justify-between bg-slate-50 px-4 py-2 rounded">
                  <span>
                    <b>{medicine.name}:</b> {medicine.dose}{' '}
                    <span className="text-xs italic">{medicine.type}</span>
                  </span>
                  <button
                    className="text-sm text-red-500"
                    onClick={(event) => handleDeleteMedicine(event, index)}
                  >
                    Remove
                  </button>
                </summary>
                <div className="bg-slate-200 px-4 py-2">
                  <p>{medicine.frequency}</p>
                  <p>{medicine.source}</p>
                </div>
              </details>
            )
          }
        )}
        <button
          className="w-fit text-mira-darker-green"
          onClick={(event) => openMedicineModal(event)}
        >
          + Add medicine
        </button>

        <label htmlFor="selfCareTips" className="font-medium mt-2 mb-1">
          Self-care tips
        </label>
        <textarea
          name="selfCareTips"
          value={selfCareTips}
          cols={30}
          rows={3}
          onChange={(event) => {
            setSelfCareTips(event.target.value)
          }}
        />

        <button
          className="w-fit bg-mira-dark-green text-white px-2 py-1 rounded mt-2 mb-1"
          type="submit"
          onClick={(event) => {
            event.preventDefault()
            handleUpdateChiefComplaintAndSelfCare()
          }}
        >
          Finish
        </button>
        {isModalAddMedicineOpen && (
          <Modal title="Add new medicine" closeFunc={closeMedicineModal}>
            <form>
              <Input
                type="text"
                label="Medicine name"
                placeholder="Enter medicine name"
                className="mb-2"
                onChange={(event) => {
                  setMedicineForm((currentState) => {
                    return { ...currentState, name: event.target.value }
                  })
                }}
              />

              <Input
                type="text"
                label="Dose"
                className="mb-2"
                placeholder="10 mg"
                onChange={(event) => {
                  setMedicineForm((currentState) => {
                    return { ...currentState, dose: event.target.value }
                  })
                }}
              />

              <Select
                label="Type"
                className="mb-2"
                onChange={(event) => {
                  setMedicineForm((currentState) => {
                    return {
                      ...currentState,
                      type: event.target.value,
                    }
                  })
                }}
              >
                {MEDICINE_TYPES.map((medicineType) => {
                  return (
                    <SelectItem
                      key={medicineType.value}
                      value={medicineType.value}
                    >
                      {medicineType.text}
                    </SelectItem>
                  )
                })}
              </Select>

              <Input
                type="text"
                label="Frequency"
                className="mb-2"
                placeholder="Once daily"
                onChange={(event) => {
                  setMedicineForm((currentState) => {
                    return { ...currentState, frequency: event.target.value }
                  })
                }}
              />

              <Input
                type="text"
                label="Source"
                className="mb-2"
                defaultValue={medicineForm.source}
                onChange={(event) => {
                  setMedicineForm((currentState) => {
                    return { ...currentState, source: event.target.value }
                  })
                }}
              />

              <Button
                color="primary"
                className="ml-auto mr-0"
                onClick={(event) => {
                  event.preventDefault()
                  addMedicine(medicineForm)
                  // closeMedicineModal()
                }}
              >
                Finish
              </Button>
            </form>
          </Modal>
        )}
      </form>
    </>
  )
}
