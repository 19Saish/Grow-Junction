import React, { useState } from 'react'
import SaveButton from '../../Utilities/SaveBtn/SaveButton'
import { toast } from 'react-toastify'
import { API, input } from 'aws-amplify'
import { createSecuritySetting } from '../../../src/graphql/mutations'

const SecuritySetting = () => {
  const initialState = {
    deviceLimit: '',
    maxDevices: '',
    twoFactorAuth: '',
    downloadsAllowed: '',
    maxDaysOffline: '',
  }

  const [state, setState] = useState(initialState)

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const securitySetting = async () => {
    try {
      await API.graphql({
        query: createSecuritySetting,
        variables: { input: { ...state } },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSave = () => {
    try {
      if (Object.values(state).every((value) => value.trim() !== '')) {
        securitySetting()
        toast.success('Saved Successfully !')
      } else {
        toast.error('Fill all Fields')
      }
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <div className="h-screen overflow-auto">
      <h1 className="mb-8 font-semibold text-3xl">Security</h1>
      <hr />
      <div className="grid md:grid-cols-3">
        <div className="md:m-10 text-2xl font-semibold">Security</div>
        <div className="mt-10 col-span-2">
          <label htmlFor="userlogin" className="text-xl">
            Device limit for User Login
          </label>
          <div className="flex items-center mt-6 mb-10">
            <input
              type="radio"
              name="deviceLimit"
              id="combined"
              value="Combined(Web + App)"
              onChange={handleChange}
            />
            <label htmlFor="combined" className="text-xl mr-24 ml-2">
              Combined(Web + App)
            </label>
            <input
              type="radio"
              name="deviceLimit"
              id="webapp"
              value="Web and App Separately"
              onChange={handleChange}
            />
            <label htmlFor="webapp" className="text-xl ml-2">
              Web and App Separately
            </label>
          </div>
          <div>
            <p className="text-base text-gray-400">
              This is used to restrict the learners from how many devices they
              can login to their accounts. This is to limit the sharing of email
              and passwords with other learners.
            </p>
          </div>
          <div className="my-10">
            <label htmlFor="maxNodevices" className="text-xl">
              Maximum Number of Devices for User Login: * 0 for unlimited
              devices
            </label>
            <input
              type="text"
              id="maxNodevices"
              name="maxDevices"
              className="text-xl w-full border border-gray-300"
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-10">
            <label className="text-xl">
              Enable Two Factor Authentication for Admins: *
            </label>
            <div className="mt-4 mb-8 flex items-center">
              <input
                type="radio"
                id="factorYes"
                value="Yes"
                name="twoFactorAuth"
                className=" mr-2"
                onChange={handleChange}
                required
              />
              <label htmlFor="factorYes" className="text-xl">
                Yes
              </label>
              <input
                type="radio"
                id="factorNo"
                value="No"
                name="twoFactorAuth"
                className="ml-32 mr-2"
                onChange={handleChange}
                required
              />
              <label htmlFor="factorNo" className="text-xl">
                No
              </label>
            </div>
          </div>
          <div className="my-10">
            <label htmlFor="allowedDownloads" className="text-xl">
              Downloads Allowed Per Cohort: *
            </label>
            <input
              id="allowedDownloads"
              type="text"
              name="downloadsAllowed"
              className="text-xl w-full border border-gray-300"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <p className="text-gray-400 text-base">
              This is used to restrict the learners to download the cohort in
              limited number of devices. Best practice is to restrict this to
              one device.
            </p>
          </div>
          <div className="my-10">
            <label htmlFor="maxdaysonline" className="text-xl">
              Maximum Number of Days without being online: *
            </label>
            <input
              id="maxdaysonline"
              type="text"
              name="maxDaysOffline"
              className="text-xl w-full border border-gray-300"
              onChange={handleChange}
              required
            />
          </div>
          <SaveButton handleSave={handleSave} />
        </div>
      </div>
    </div>
  )
}

export default SecuritySetting
