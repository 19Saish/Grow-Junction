import React, { useState, useEffect } from 'react'
import { Formik, useFormikContext } from 'formik'
import TimezoneSelect, { allTimezones } from 'react-timezone-select'
import TextField from '../../../pages/ui-kit/TextField'
import {
  createConfigurations,
  updateConfigurations,
} from '../../../src/graphql/mutations'
import { listConfigurations } from '../../../src/graphql/queries'
import { API, Auth, input, Storage, graphqlOperation } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import { toast } from 'react-toastify'
import { getLoggedinUserEmail } from '../../../utilities/user'

const Configurations = () => {
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  )

  const initialState = {
    calender: '',
    personalMeetingLink: '',
    bookingPeriod: 0,
    bookingPeriodIn: 'days',
    noticePeriod: 0,
    noticePeriodIn: 'minutes',
  }

  const [state, setState] = useState(initialState)
  const [user, setUser] = useState()
  const [isNew, setIsNew] = useState(true)

  useEffect(() => {
    getUser()
  }, [])
  const resetState = () => {
    setState({ ...initialState })
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }
  console.log('timezone', timezone)
  // useEffect(() => {
  //   const keys = [
  //     'timezone',
  //     'calender',
  //     'personalMeetingLink',
  //     'bookingPeriod',
  //     'bookingPeriodIn',
  //     'noticePeriod',
  //     'noticePeriodIn',
  //   ]
  // }, [state])

  const getUser = async () => {
    debugger
    try {
      try {
        const usr = await Auth.currentAuthenticatedUser()
        console.log('usr', usr)
      } catch (error) {}
      const usrName = getLoggedinUserEmail()
      const results = await API.graphql(
        graphqlOperation(listConfigurations, {
          filter: { username: { contains: usrName } },
        }),
      )
      if (results.data.listConfigurations.items.length > 0) {
        setIsNew(false)
        const data = { ...results.data.listConfigurations.items[0] }
        const { createdAt, updatedAt, timezone, owner, ...rest } = data
        console.log('data - ', data)
        setState({ ...rest })
        setTimezone(timezone)
      }
    } catch (error) {
      console.log(`Load Error:${error}`)
    }
  }

  return (
    <>
      <Formik
        initialValues={{ ...state }}
        enableReinitialize={true}
        onSubmit={async (values, e) => {
          debugger
          values.timezone = timezone
          values.username = getLoggedinUserEmail()
          try {
            if (!values?.id) {
              try {
                debugger
                // values.id = uuid()
                await API.graphql({
                  query: createConfigurations,
                  variables: { input: { ...values } },
                })
                toast.success('Configuration added successfully')
                // window.location.href = window.location.href
              } catch (error) {
                toast.error(`Save Error:${error.errors[0].message}`)
              }
            } else {
              const { createdAt, updatedAt, domain_id, owner, ...rest } = {
                ...values,
              }
              rest.username = getLoggedinUserEmail()
              try {
                await API.graphql({
                  query: updateConfigurations,
                  variables: {
                    input: { ...rest },
                    // condition: { username: { contains: state.username } },
                  },
                })
                toast.success('Configuration updated successfully')
              } catch (error) {
                debugger
                toast.error(`Save Error:${error.errors[0].message}`)
                console.log(error)
              }
            }
          } catch (e) {
            console.log('error-', e)
          }
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <form>
              <div className="flex flex-col md:flex-row lg:flex-row w-full p-10">
                <div className="flex flex-col md:flex-row lg:flex-row w-full justify-between">
                  <div className="flex justify-center items-center text-2xl font-semibold text-gray-900 p-6">
                    Configurations
                  </div>
                  <div className="flex flex-row px-4">
                    <div
                      className="flex justify-center items-center text-black text-base font-semibold cursor-pointer hover:bg-white px-5 py-1 hover:border-2 hover:border-black"
                      onClick={resetState}
                    >
                      Reset all
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="mt-2 text-base bg-white hover:bg-gray-900 hover:text-white text-black border-gray-900 font-bold py-4 px-6 ml-10 border rounded"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="m-5 md:m-20 lg:m-20 bg-white">
                <div className="flex flex-col md:flex-row lg:flex-row border-b-2 rounder-md w-auto">
                  <div className="basis-1/2">
                    <div className="flex flex-col justify-start items-start p-10">
                      <div className="flex flex-row text-gray-900 text-base font-bold">
                        <img
                          src="../../../assets/icon/clock.png"
                          alt=""
                          className="w-4 h-4 mt-1"
                        ></img>
                        <span className="px-5">Timezone</span>
                      </div>
                      <div className="px-9 text-gray-400 text-sm font-semibold">
                        Required for timely communications
                      </div>
                    </div>
                  </div>
                  <div className="basis-1/2">
                    <div className="p-8 w-full ">
                      <TimezoneSelect
                        value={timezone}
                        // value={values.time_zone}

                        // onChange={(val)=>handleChange(val)}
                        onChange={setTimezone}
                        // labelStyle="altName"
                        timezones={{
                          ...allTimezones,
                          'America/Lima': 'Pittsburgh',
                          'Europe/Berlin': 'Frankfurt',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row lg:flex-row border-b-2 rounder-md">
                  <div className="basis-1/2">
                    <div className="flex flex-col justify-start items-start p-10">
                      <div className="flex flex-row text-gray-900 text-base font-bold">
                        <img
                          src="../../../assets/icon/dateBlack.png"
                          className="w-3 h-3 mt-1"
                        ></img>
                        <span className="px-5">Calendar</span>
                      </div>
                      <div className="px-9 text-gray-400 text-sm font-semibold">
                        Sync your work calendar to avoid any clashed
                      </div>
                    </div>
                  </div>
                  <div className="basis-1/2">
                    <div className="p-8 w-full flex items-center">
                      <TextField
                        name="calender"
                        classOverrideContainer="w-3/6"
                        onChangeValue={handleChange}
                        style={{ marginBottom: 0 }}
                        value={values.calender}
                        type="url"
                        id="calender"
                        placeholder="Calendar id"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          // handleSubmit(e)
                        }}
                        className="w-2/6 text-base bg-white hover:bg-gray-900 hover:text-white text-black border-gray-900 font-bold py-4 px-6  border rounded"
                      >
                        + Add Calender
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row lg:flex-row border-b-2 rounder-md">
                  <div className="basis-1/2">
                    <div className="flex flex-col justify-start items-start p-10">
                      <div className="flex flex-row text-gray-900 text-base font-bold">
                        <img
                          src="../../../assets/icon/hyperlink.png"
                          className="w-4 h-3 mt-1"
                        />
                        <span className="px-5">Personal meeting link</span>
                      </div>
                      <div className="px-9 text-gray-400 text-sm font-semibold">
                        All your 1:1 meetings will be redirected to this URL
                      </div>
                    </div>
                  </div>
                  <div className="basis-1/2">
                    <div className="p-8 w-full ">
                      <TextField
                        name="personalMeetingLink"
                        onChangeValue={handleChange}
                        value={values.personalMeetingLink}
                        type="url"
                        id="personalMeetingLink"
                        placeholder="+ Add meeting link (Ex: Google meet, Zoom link)"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row lg:flex-row border-b-2 rounder-md">
                  <div className="basis-1/2">
                    <div className="flex flex-col justify-start items-start p-10">
                      <div className="flex flex-row text-gray-900 text-base font-bold">
                        <img
                          src="../../../assets/icon/dateBlack.png"
                          className="w-3 h-3 mt-1"
                        ></img>
                        <span className="px-5">Booking period</span>
                      </div>
                      <div className="px-9 text-gray-400 text-sm font-semibold">
                        How far in the future can attendees book
                      </div>
                    </div>
                  </div>
                  <div className="basis-1/2">
                    <div className="p-8 w-full ">
                      <div className="flex items-center flex-wrap w-auto mr-4 md:mr-1 lg:mr-1 relative">
                        <TextField
                          type="number"
                          min="0"
                          textStyleOverride={{ width: '87%' }}
                          value={values.bookingPeriod}
                          onChangeValue={handleChange}
                          name="bookingPeriod"
                          id="bookingPeriod"
                          widthPartial
                          className=""
                        />
                        <select
                          className="absolute px-3 py-3 top-1  text-lg right-1 bg-gray-50"
                          value={values.bookingPeriodIn}
                          name="bookingPeriodIn"
                          onChange={handleChange}
                        >
                          <option value="days">Days</option>
                          <option value="weeks">Weeks</option>
                          <option value="months">Months</option>
                          <option value="years">Years</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row lg:flex-row border-b-2 rounder-md">
                  <div className="basis-1/2">
                    <div className="flex flex-col justify-start items-start p-10">
                      <div className="flex flex-row text-gray-900 text-base font-bold">
                        <img
                          src="../../../assets/icon/dateBlack.png"
                          className="w-3 h-3 mt-1"
                        ></img>
                        <span className="px-5">Notice period</span>
                      </div>
                      <div className="px-9 text-gray-400 text-sm font-semibold">
                        Set the minimum amount of notice that is required
                      </div>
                    </div>
                  </div>
                  <div className="basis-1/2">
                    <div className="p-8 w-full ">
                      <div className="flex items-center flex-wrap w-auto mr-4 md:mr-1 lg:mr-1 relative">
                        <TextField
                          type="number"
                          min="0"
                          textStyleOverride={{ width: '87%' }}
                          value={values.noticePeriod}
                          onChangeValue={handleChange}
                          name="noticePeriod"
                          id="noticePeriod"
                          widthPartial
                          className=""
                        />
                        <select
                          className="absolute px-3 py-3 top-1  text-lg right-1 bg-gray-50"
                          value={values.noticePeriodIn}
                          name="noticePeriodIn"
                          onChange={handleChange}
                        >
                          <option value="minutes">Minutes</option>
                          <option value="hours">Hours</option>
                          <option value="days">Days</option>
                          <option value="weeks">Weeks</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )
        }}
      </Formik>
    </>
  )
}

export default Configurations
