import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { getMentorData } from '../../../../../utilities/user'
import TextField from '../../../../../pages/ui-kit/TextField'
import moment from 'moment'
import classes from './Step2.module.css'
import { getS3FileUrl } from '../../../../../utilities/others'
import { OneOnOneBookingContactSchema } from '../../../../../public/utils/schema'
const Step3 = ({
  bookingdate,
  timeZone,
  timeSlot,
  oneOnOneService,
  closeBookSession3,
  backtoBookSession2,
  handleBookSession4,
  step3,
}) => {
  debugger
  debugger
  const [mentor, setMentor] = useState()
  const [image, setImage] = useState('')

  const initialState = {
    name: step3?.name || '',
    emailId: step3?.emailId || '',
    callAbout: step3?.callAbout || '',
    whatsappNumber: step3?.whatsappNumber || '',
    mobileNumber: step3?.mobileNumber || '',
    receiveUpdate: step3?.receiveUpdate || true,
  }
  const [initial, setInitial] = useState(initialState)
  useEffect(() => {
    const men = getMentorData(oneOnOneService.username)
    showPreview(men)
    setMentor(men)
  }, [])

  const showPreview = async (mentorPassed) => {
    // e.stopPropagation()

    if (mentorPassed) {
      debugger
      const newInitial = { ...initial }
      newInitial.name = `${mentorPassed?.about_yourself?.first_name} ${mentorPassed?.about_yourself?.last_name}`
      newInitial.emailId = mentorPassed?.username
      newInitial.whatsappNumber = mentorPassed?.whatsapp_number
      newInitial.mobileNumber = mentorPassed?.contact_info?.mobile
      setInitial(newInitial)
      if (mentorPassed.profile_image) {
        // const img = await Storage.get(mentorPassed.profile_image)
        const img = await getS3FileUrl(mentorPassed.profile_image)
        console.log('image - ', img)
        setImage(img)
      }

      // setMentor(mentorPassed)
      // setShowServiceDetail(false)
      // setShowMentor(true)
    }
    // debugger
    // console.log('mentorPassed', mentorPassed)
  }
  return (
    <Formik
      initialValues={initial}
      enableReinitialize={true}
      onSubmit={async (values, e) => {
        debugger

        try {
          debugger
          handleBookSession4({ ...values })
          // if (!values?.id) {
          //   try {
          //     debugger

          //     // values.username = mentor.username
          //     // values.serviceType = '1 on 1 Session'
          //     // values.bookingDate = moment(bookingdate).format('L')
          //     // values.timeSlot = timeSlot ? timeSlot : ''

          //     // await API.graphql({
          //     //   query: createStudentBooking,
          //     //   variables: { input: { ...values } },
          //     // })
          //     // toast.success('Student booking added successfully')
          //     // window.location.href = window.location.href
          //   } catch (error) {
          //     // toast.error(`Save Error:${error.errors[0].message}`)
          //   }
          // } else {
          //   const { createdAt, updatedAt, owner, ...rest } = {
          //     ...values,
          //   }
          //   rest.username = getLoggedinUserEmail()
          //   try {
          //     // await API.graphql({
          //     //   query: updateStudentBooking,
          //     //   variables: {
          //     //     input: { ...rest },
          //     //   },
          //     // })
          //     // toast.success('Student booking updated successfully')
          //   } catch (error) {
          //     // debugger
          //     // toast.error(`Save Error:${error.errors[0].message}`)
          //     // console.log(error)
          //   }
          // }
        } catch (e) {
          console.log('error-', e)
        }
      }}
      validationSchema={OneOnOneBookingContactSchema}
      validateOnChange={true}
      validateOnBlur={true}
      validateOnMount={true}
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
            <div className="flex justify-center items-center bg-gray-600 bg-opacity-50 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className=" bg-white text-center mt-9 rounded-2xl shadow-lg w-full md:w-2/5 lg:w-2/5">
                <div className="flex justify-between px-8 py-4 border-b border-gray-300 bg-slate-100 ">
                  <div className="flex flex-col justify-start items-start border=b-2">
                    <span className="text-2xl font-semibold mt-3">
                      Enter other details
                    </span>
                  </div>
                  <div>
                    <button
                      className=""
                      type="button"
                      onClick={() => closeBookSession3()}
                    >
                      <img
                        src="../../../assets/icon/cross.png"
                        alt=""
                        className="w-4 h-4 mr-2 mt-5"
                      ></img>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-0">
                  <div className="border-r-2">
                    <div className="bg-gray-100 m-2 mr-3 w-auto rounded-lg ">
                      <div className="flex flex-row justify-start items-start px-4 py-2">
                        <div
                          className={`${classes['persona']} bg-gray-300 rounded-full flex justify-center`}
                        >
                          {image ? (
                            <img
                              src={image}
                              alt=""
                              className={`${classes['persona']} rounded-full`}
                            />
                          ) : null}
                        </div>
                        <div>
                          <p className=" flex justify-start items-start text-lg font-semibold mt-5 px-6">
                            Call with{' '}
                            {(mentor?.about_yourself?.first_name &&
                              mentor?.about_yourself?.first_name) +
                              ' ' +
                              (mentor?.about_yourself?.last_name &&
                                mentor?.about_yourself?.last_name)}
                          </p>
                          <p className="text-base font-semibold text-black  text-left">
                            For 1 on 1 mock interview
                          </p>
                          <p className="text-sm text-left">
                            {oneOnOneService.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-around w-full p-2">
                        <div className="p-1 ">
                          <p className="text-sm text-black ml-1 hover:border-none hover:bg-blue-700 hover:text-white font-bold">
                            {bookingdate
                              .toString()
                              .split('GMT')[0]
                              .split(' ')
                              .slice(
                                0,
                                bookingdate
                                  .toString()
                                  .split('GMT')[0]
                                  .split(' ').length - 2,
                              )
                              .join(' ') +
                              ' ' +
                              timeSlot}
                          </p>
                          <p className="text-sm text-black ml-1 hover:border-none hover:bg-blue-700 hover:text-white font-bold">
                            {timeZone.label}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-around w-full p-2">
                        <div className="flex justify-center items-center border-2 border-gray-900 hover:border-none hover:bg-blue-700 hover:text-white text-white font-bold p-1 rounded-full">
                          <img
                            src="../../../assets/icon/clock.png"
                            alt=""
                            className="w-4 h-3"
                          ></img>
                          <p className="text-sm text-black ml-1 hover:border-none hover:bg-blue-700 hover:text-white font-bold">
                            {oneOnOneService.sessionDuration}
                            {oneOnOneService.sessionDurationIn}
                          </p>
                        </div>
                        {/* <div className="flex justify-center items-center border-2 border-gray-900 hover:border-none hover:bg-blue-700 hover:text-white text-white font-bold p-1 rounded-full">
                        <img
                          src="../../../images/camera.png"
                          alt=""
                          className="w-4 h-3"
                        ></img>
                        <p className="text-sm text-black ml-1 hover:border-none hover:bg-blue-700 hover:text-white font-bold">
                          Video session
                        </p>
                      </div> */}
                        <div className="flex justify-center items-center border-2 border-gray-900 hover:border-none hover:bg-blue-700 hover:text-white text-white font-bold p-1 rounded-full">
                          <img
                            src="../../../assets/icon/mentor-dashboard/price.svg"
                            alt=""
                            className="w-4 h-3"
                          ></img>
                          <p className="text-sm text-black ml-1 hover:border-none hover:bg-blue-700 hover:text-white font-bold">
                            ₹ {oneOnOneService.finalPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className=" text-base font-normal p-6 w-full">
                      {/* <Calendar onChange={onChange} value={value} />
                    <span>name</span> */}

                      <div className="flex flex-col">
                        <div className="text-sm w-full">
                          <label className="flex justify-start text-sm font-normal">
                            Name
                          </label>
                          <div className="flex flex-wrap items-stretch text-sm w-full relative">
                            <TextField
                              name="name"
                              onChangeValue={handleChange}
                              value={values.name}
                              type="text"
                              id="name"
                              placeholder="Name"
                              errMsg={touched.name && errors.name}
                            />
                          </div>
                        </div>

                        <div className="text-sm w-full">
                          <label className="flex justify-start text-sm font-normal">
                            Email
                          </label>
                          <div className="flex flex-wrap items-stretch text-sm w-full relative">
                            <TextField
                              name="emailId"
                              onChangeValue={handleChange}
                              value={values.emailId}
                              required
                              type="text"
                              id="emailId"
                              placeholder="examplemail@gmail.com"
                              errMsg={touched.emailId && errors.emailId}
                            />
                          </div>
                        </div>

                        <div className="text-sm w-full">
                          <label className="flex justify-start text-sm font-normal">
                            Comments (optional)
                          </label>
                          <div className="flex flex-wrap items-stretch text-sm w-full relative">
                            <textarea
                              id=""
                              cols="80"
                              rows="4"
                              className="border-2 p-1"
                              name="callAbout"
                              onChange={handleChange}
                              value={values.callAbout}
                            ></textarea>
                            {/* {errMsg ? (
        <div
          style={{
            //   position: 'absolute',
            //paddingTop: 35,
            fontSize: 12,
            color: 'red',
          }}
        >
          {errMsg}
        </div> */}
                            {/* <TextField
                              name="callAbout"
                              onChangeValue={handleChange}
                              value={values.callAbout}
                              type="text"
                              id="callAbout"
                              placeholder="Hey this is michael, co-founder and executive officer at twitter. "
                            /> */}
                          </div>
                        </div>
                        <div className="text-sm w-full">
                          <label className="flex justify-start text-sm font-normal">
                            Whatsapp Number
                          </label>
                          <div className="flex flex-wrap items-stretch text-sm w-full relative">
                            <TextField
                              name="whatsappNumber"
                              onChangeValue={handleChange}
                              value={values.whatsappNumber}
                              required
                              type="text"
                              id="whatsappNumber"
                              placeholder="000 000 0000"
                              errMsg={
                                touched.whatsappNumber && errors.whatsappNumber
                              }
                            />
                          </div>
                        </div>
                        <div className="text-sm w-full">
                          <label className="flex justify-start text-sm font-normal">
                            Mobile Number
                          </label>
                          <div className="flex flex-wrap items-stretch text-sm w-full relative">
                            <TextField
                              name="mobileNumber"
                              onChangeValue={handleChange}
                              value={values.mobileNumber}
                              required
                              type="text"
                              id="mobileNumber"
                              placeholder="000 000 0000"
                              errMsg={
                                touched.mobileNumber && errors.mobileNumber
                              }
                            />
                          </div>
                        </div>

                        <div className="flex justify-start text-sm w-full">
                          <input
                            id="receiveUpdate"
                            type="checkbox"
                            name="receiveUpdate"
                            checked={values.receiveUpdate}
                            onChange={handleChange}
                            value={values.receiveUpdate}
                            className="w-4 h-4 text-gray-900 bg-gray-100 rounded border-gray-300 focus:ring-black"
                          />
                          <label
                            htmlFor="receiveUpdate"
                            className="text-sm font-medium text-gray-900"
                          >
                            Receive updates on phone and whatsapp
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="select-wrapper  text-base font-normal w-full p-6">
                      {/* <TimezoneSelect
                        value={timeZone}
                        onChange={setTimeZone}
                        timezones={{
                          ...allTimezones,
                          'America/Lima': 'Pittsburgh',
                          'Europe/Berlin': 'Frankfurt',
                        }}
                      /> */}
                    </div>
                  </div>
                  {/* gird */}
                </div>
                <div className="flex justify-evenly w-full">
                  <div className="py-4 px-6 border-t border-gray-300 w-full">
                    <div className="flex justify-center items-center w-full">
                      <button
                        className="flex justify-center items-center text-base bg-white hover:bg-gray-900 text-black hover:text-white font-bold py-2 border border-black w-full rounded-md"
                        onClick={() => backtoBookSession2()}
                      >
                        <span className="text-base font-semibold py-1">
                          Back
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="py-4 px-6 border-t border-gray-300 w-full">
                    <div className="flex justify-center items-center w-full">
                      <button
                        className="flex justify-center items-center text-base bg-white hover:bg-gray-900 text-black hover:text-white font-bold py-2 border border-black w-full rounded-md"
                        onClick={handleSubmit}
                      >
                        <span className="text-base font-semibold py-1">
                          Continue
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}

export default Step3
