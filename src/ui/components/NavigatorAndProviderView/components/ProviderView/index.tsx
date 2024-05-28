'use client'
import data from '~/data/index.json'
import './styles.css'
import { useContext, useState, MouseEvent } from 'react'
import { DataContext } from '~/contexts/dataContext'
import { Modal } from '~/ui/components/Modal'
import { Input, Select, SelectItem, Button } from '@nextui-org/react'
import { ToastContainer, toast } from 'react-toastify'

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
  const [isModalProviderNameOpen, setIsModalProviderNameOpen] = useState(false)
  const {
    currentData,
    addMedicine,
    deleteMedicine,
    updateComplaintAndSelfCare,
    updateProviderName
  }: any = useContext(DataContext)
  const [medicineForm, setMedicineForm] = useState({
    name: '',
    type: '',
    dose: '',
    frequency: '',
    source: 'Available at most pharmacies',
  })
  const [formErrors, setFormErrors] = useState<string[]>([])

  const [chiefComplaint, setChiefComplaint] = useState(
    currentData.miraOSsummary.chiefComplaint
  )
  const [selfCareTips, setSelfCareTips] = useState(currentData.selfCareTips)
  const [providerName, setProviderName] = useState(currentData.provider.name)

  function openMedicineModal(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setIsModalAddMedicineOpen(true)
  }

  function closeMedicineModal() {
    setIsModalAddMedicineOpen(false)
  }

  function openProviderNameModal() {
    setIsModalProviderNameOpen(true)
  }

  function closeProviderNameModal() {
    setIsModalProviderNameOpen(false)
  }

  function handleDeleteMedicine(event: any, index: number) {
    event.preventDefault()
    deleteMedicine(index)
  }

  function handleUpdateChiefComplaintAndSelfCare() {
    updateComplaintAndSelfCare({ chiefComplaint, selfCareTips })
    toast.success('Treatment plan saved successfully')
  }

  function validateMedicineForm() {
    const isAnyFieldEmpty = medicineForm.name.length === 0 || medicineForm.dose.length === 0 || medicineForm.type.length === 0 || medicineForm.frequency.length === 0 || medicineForm.source.length === 0

    if (isAnyFieldEmpty) {
      setFormErrors([...formErrors, 'Oops! It seems some required information is missing'])
    } else {
      setFormErrors([])
      addMedicine(medicineForm)
      toast.success('Medicine added successfully')
      closeMedicineModal()
    }
  }

  function validateProviderNameForm() {
    const isFieldEmpty = providerName.length === 0

    if (isFieldEmpty) {
      setFormErrors([...formErrors, 'Oops! It seems provider name is empty'])
    } else {
      setFormErrors([])
      updateProviderName(providerName)
      toast.success('Provider name changed successfully')
      closeProviderNameModal()
    }
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
        <button className="italic underline ml-1" onClick={openProviderNameModal}>(edit)</button>
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
                required
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
                required
                onChange={(event) => {
                  setMedicineForm((currentState) => {
                    return { ...currentState, dose: event.target.value }
                  })
                }}
              />

              <Select
                label="Type"
                className="mb-2"
                required
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
                required
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
                required
                onChange={(event) => {
                  setMedicineForm((currentState) => {
                    return { ...currentState, source: event.target.value }
                  })
                }}
              />

              {formErrors.length > 0 && (<div className="text-red-500 mb-1">
                {formErrors[0]}
              </div>)}

              <Button
                color="primary"
                className="ml-auto mr-0"
                onClick={(event) => {
                  event.preventDefault()
                  validateMedicineForm()
                }}
              >
                Finish
              </Button>
            </form>
          </Modal>
        )}

        {isModalProviderNameOpen && (
          <Modal title="Edit provider name" closeFunc={closeProviderNameModal}>
            <Input label="Provider name" className="mb-2" value={providerName} onChange={(event) => {
              setProviderName(event.target.value)
            }} />

            {formErrors.length > 0 && (<div className="text-red-500 mb-1">
              {formErrors[0]}
            </div>)}

            <Button
              color="primary"
              className="ml-auto mr-0"
              onClick={(event) => {
                event.preventDefault()
                validateProviderNameForm()
              }}
            >
              Finish
            </Button>
          </Modal>
        )}

        <ToastContainer position="bottom-left" closeOnClick />
      </form>
    </>
  )
}
