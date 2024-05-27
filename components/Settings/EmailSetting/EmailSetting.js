import React, { useEffect, useState } from 'react'
import SaveButton from '../../Utilities/SaveBtn/SaveButton'
import ToggleButton from '../../Utilities/ToggleBtn/ToggleButton'
import { IoPencil } from 'react-icons/io5'
import { IconContext } from 'react-icons'
import { toast } from 'react-toastify'
import { API, input } from 'aws-amplify'
import {
  createEmailSetting,
  updateEmailSetting,
} from '../../../src/graphql/mutations'

const EmailSetting = () => {
  const initialState = {
    fromName: '',
    replyToEmail: '',
    supportEmail: '',
    contactForm: '',
    welcomeEmail: '',
    invoiceEmail: '',
    manuallyCreated: false,
    websiteSignups: false,
    forgotPassword: false,
    affiliateWelcome: false,
    learnerAffiliateWelcome: false,
    liveClassStart: false,
    cohortWelcome: false,
    contentAvailability: false,
    liveClassReminder: false,
  }

  const [state, setState] = useState(initialState)
  const [userId, setUserId] = useState('')
  const [firstSave, setFirstSave] = useState(true)

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    if (
      !state.fromName ||
      !state.replyToEmail ||
      !state.supportEmail ||
      !state.contactForm
    ) {
      toast.error('Mandatory fields not entered')
      return
    }
    if (state && firstSave) {
      try {
        const result = await API.graphql({
          query: createEmailSetting,
          variables: { input: { ...state } },
        })
        setUserId(result?.data?.createEmailSetting?.id)
        setFirstSave(false)
        toast.success('Saved Succesfully!')
      } catch (error) {
        toast.error(`Save Error:${error.errors[0].message}`)
      }
    }else{
      const {createdAt, updatedAt, ...rest} = {...state}
      rest.id = userId
      try {
        await API.graphql({
          query: updateEmailSetting,
          variables: {input: {...rest}}
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleSave1 = async () => {
    if (!state.welcomeEmail || !state.invoiceEmail) {
      toast.error('Mandatory fields not entered')
      return
    }
    const { createdAt, updatedAt, ...rest } = { ...state }
    rest.id = userId
    try {
      await API.graphql({
        query: updateEmailSetting,
        variables: { input: { ...rest } },
      })
    } catch (error) {
      toast.error(`Save Error:${error.errors[0].message}`)
    }
  }

  const handleChange1 = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }

  return (
    <div className="overflow-auto">
      <h1 className="text-4xl font-semibold mb-10">Settings</h1>
      <hr />
      <div className="grid sm:grid-cols-3 grid-cols-2">
        <div className="sm:m-10">
          <p className="text-xl font-semibold">Email Settings</p>
        </div>
        <div className="mt-10 col-span-2">
          <label htmlFor="fromName" className="text-lg">
            From Name:*
          </label>
          <input
            type="text"
            id="fromName"
            name="fromName"
            value={state.fromName}
            className="text-lg w-full border border-gray-300"
            onChange={handleChange}
            required
          />
          <p className="text-base text-gray-400 mt-4 mb-6">
            The sender name from which all emails will be sent to the learners.
          </p>
          <label htmlFor="replyEmail" className="text-lg">
            Reply to Email Address:*
          </label>
          <input
            type="text"
            id="replyEmail"
            name="replyToEmail"
            className="text-lg border border-gray-300 w-full"
            onChange={handleChange}
            required
          />
          <p className="text-base text-gray-400 mt-4 mb-6">
            Learners that reply to your emails sent from Spayee website will
            reach you on this email.
          </p>
          <label htmlFor="supportEmail" className="text-lg">
            Support Email*: Use comma for multiple email ids
          </label>
          <input
            type="text"
            id="supportEmail"
            name="supportEmail"
            className="text-lg border border-gray-300 w-full"
            onChange={handleChange}
            required
          />
          <p className="text-base text-gray-400 mt-4 mb-6">
            The support email is visible to your learners at various places like
            Login Pop-up, help and support tabs in apps etc.
          </p>
          <label htmlFor="contactform" className="text-lg">
            Contact Form Email*: Use comma for multiple email ids
          </label>
          <input
            type="text"
            id="contactform"
            name="contactForm"
            className="text-lg border border-gray-300 w-full"
            onChange={handleChange}
            required
          />
          <p className="text-base text-gray-400 mt-4 mb-6">
            The email to which all enquiries from contact us form will be
            forwarded.
          </p>
          <a href="#" className="text-3xl text-blue-800 mt-10">
            Show Advance Options
          </a>
          <SaveButton handleSave={handleSave} />
        </div>
        <div className="sm:m-10">
          <p className="text-xl font-semibold">Notifications</p>
        </div>
        <div className="mt-10 col-span-2">
          <label htmlFor="welcomeEmail" className="text-lg">
            Welcome Email BCC *: Use comma for multiple email ids
          </label>
          <input
            type="text"
            id="welcomeEmail"
            name="welcomeEmail"
            className="text-lg border border-gray-300 w-full"
            onChange={handleChange}
            required
          />
          <p className="text-base text-gray-400 mt-4 mb-6">
            Enter comma separated emails id to copy them in each welcome email
            sent during new registration of the learners.
          </p>
          <label htmlFor="invoiceemail" className="text-lg">
            Invoice Email BCC *: Use comma for multiple email ids
          </label>
          <input
            type="text"
            id="invoiceemail"
            name="invoiceEmail"
            className="text-lg border border-gray-300 w-full"
            onChange={handleChange}
            required
          />
          <p className="text-base text-gray-400 mt-4 mb-6">
            Enter comma separated email ids to copy them in each invoice email
            sent to learners after successful purchase..
          </p>
          <SaveButton handleSave={handleSave1} />
        </div>
        <div className="sm:m-10">
          <p className="text-xl font-semibold">Templates</p>
        </div>
        <div className="mt-10 col-span-2">
          <div className="grid grid-cols-4 w-full border-b-2 border-black pb-8">
            <p className="text-xl text-gray-500">ENABLED</p>
            <p className="text-xl text-gray-500 col-span-2">TEMPLATE TYPE</p>
            <p className="text-xl text-gray-500">ACTION</p>
          </div>
          <div>
            <div className="grid grid-cols-4 w-full border-b-2 border-gray-300 pt-8 pb-6">
              <div>
                <ToggleButton
                  special={'manuallyCreated'}
                  changeHandler={handleChange1}
                  value={state.manuallyCreated}
                />
              </div>
              <div className="col-span-2">
                <p className="text-lg m-0 p-0">
                  Learner Welcome, Manually Created
                </p>
              </div>
              <IconContext.Provider value={{ color: '#fab005' }}>
                <div className="cursor-pointer">
                  <IoPencil />
                </div>
              </IconContext.Provider>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-4 w-full border-b-2 border-gray-300 pt-8 pb-6">
              <div>
                <ToggleButton
                  special={'websiteSignups'}
                  changeHandler={handleChange1}
                  value={state.websiteSignups}
                />
              </div>
              <div className="col-span-2">
                <p className="text-lg m-0 p-0">
                  Learner Welcome - Website Signups
                </p>
              </div>
              <IconContext.Provider value={{ color: '#fab005' }}>
                <div className="cursor-pointer">
                  <IoPencil />
                </div>
              </IconContext.Provider>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-4 w-full border-b-2 border-gray-300 pt-8 pb-6">
              <div>
                <ToggleButton
                  special={'forgotPassword'}
                  changeHandler={handleChange1}
                  value={state.forgotPassword}
                />
              </div>
              <div className="col-span-2">
                <p className="text-lg m-0 p-0">Forgot Password Email</p>
              </div>
              <IconContext.Provider value={{ color: '#fab005' }}>
                <div className="cursor-pointer">
                  <IoPencil />
                </div>
              </IconContext.Provider>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-4 w-full border-b-2 border-gray-300 pt-8 pb-6">
              <div>
                <ToggleButton
                  special={'affiliateWelcome'}
                  changeHandler={handleChange1}
                  value={state.affiliateWelcome}
                />
              </div>
              <div className="col-span-2">
                <p className="text-lg m-0 p-0">Affiliate Welcome Email</p>
              </div>
              <IconContext.Provider value={{ color: '#fab005' }}>
                <div className="cursor-pointer">
                  <IoPencil />
                </div>
              </IconContext.Provider>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-4 w-full border-b-2 border-gray-300 pt-8 pb-6">
              <div>
                <ToggleButton
                  special={'learnerAffiliateWelcome'}
                  changeHandler={handleChange1}
                  value={state.learnerAffiliateWelcome}
                />
              </div>
              <div className="col-span-2">
                <p className="text-lg m-0 p-0">
                  Learner Affiliate Welcome Email
                </p>
              </div>
              <IconContext.Provider value={{ color: '#fab005' }}>
                <div className="cursor-pointer">
                  <IoPencil />
                </div>
              </IconContext.Provider>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-4 w-full border-b-2 border-gray-300 pt-8 pb-6">
              <div>
                <ToggleButton
                  special={'liveClassStart'}
                  changeHandler={handleChange1}
                  value={state.liveClassStart}
                />
              </div>
              <div className="col-span-2">
                <p className="text-lg m-0 p-0">Live Class Start Email</p>
              </div>
              <IconContext.Provider value={{ color: '#fab005' }}>
                <div className="cursor-pointer">
                  <IoPencil />
                </div>
              </IconContext.Provider>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-4 w-full border-b-2 border-gray-300 pt-8 pb-6">
              <div>
                <ToggleButton
                  special={'cohortWelcome'}
                  changeHandler={handleChange1}
                  value={state.cohortWelcome}
                />
              </div>
              <div className="col-span-2">
                <p className="text-lg m-0 p-0">Cohort Welcome Email</p>
              </div>
              <IconContext.Provider value={{ color: '#fab005' }}>
                <div className="cursor-pointer">
                  <IoPencil />
                </div>
              </IconContext.Provider>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-4 w-full border-b-2 border-gray-300 pt-8 pb-6">
              <div>
                <ToggleButton
                  special={'contentAvailability'}
                  changeHandler={handleChange1}
                  value={state.contentAvailability}
                />
              </div>
              <div className="col-span-2">
                <p className="text-lg m-0 p-0">Content Availability Email</p>
              </div>
              <IconContext.Provider value={{ color: '#fab005' }}>
                <div className="cursor-pointer">
                  <IoPencil />
                </div>
              </IconContext.Provider>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-4 w-full border-b-2 border-gray-300 pt-8 pb-6">
              <div>
                <ToggleButton
                  special={'liveClassReminder'}
                  changeHandler={handleChange1}
                  value={state.liveClassReminder}
                />
              </div>
              <div className="col-span-2">
                <p className="text-lg m-0 p-0">Live Class Reminder</p>
              </div>
              <IconContext.Provider value={{ color: '#fab005' }}>
                <div className="cursor-pointer">
                  <IoPencil />
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailSetting
