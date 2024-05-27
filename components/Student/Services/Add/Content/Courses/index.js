import React, { useState, useEffect, useRef } from 'react'
import { Formik, useFormikContext } from 'formik'
import Pill from '../../Header/Pill'
import TextField from '../../../../../../pages/ui-kit/TextField'
import { v4 as uuid } from 'uuid'
import classes from './Courses.module.css'
import { Storage } from 'aws-amplify'
import { getS3FileUrl } from '../../../../../../utilities/others'
const AutoSubmitToken = ({
  setValues,
  sessions,
  hideService,
  limitParticipants,
  image,
}) => {
  // Grab values and submitForm from context
  const { values, submitForm } = useFormikContext()

  React.useEffect(() => {
    debugger
    console.log('context_values', values)
    //audienceSize ==='' ? values.audienceSize = 0: values.audienceSize = audienceSize
    values.sessions = sessions
    values.limitParticipants = limitParticipants
    values.hideService = hideService
    values.file = image
    setValues(values)
    // setProfile(values)
    // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
    // if (values.token.length === 6) {
    //   submitForm();
    // }
  }, [values, image, submitForm])
  return null
}
const Courses = ({
  setValues,
  state: initial,
  courses = {
    courseTitle: '',
    description: '',
    numberOfSessions: '',
    sessionDuration: '',
    sessionDurationIn: '',
    listedPrice: '',
    finalPrice: '',
    courseDate: '',
    courseTime: '',
    hideService: '',
    limitParticipants: '',
    audienceSize: '',
    courseImage: '',
    sessions: [],
  },
}) => {
  // const {
  //   sessionTitle,
  //   listedPrice,
  //   finalPrice,
  //   numberOfSessions,
  //   sessionDuration,
  //   sessionDurationIn,
  //   description,
  //   // sessions: [],
  // } = initial
  // useEffect(() => {
  //   setState(initial)
  // }, [
  //   sessionTitle,
  //   listedPrice,
  //   finalPrice,
  //   numberOfSessions,
  //   sessionDuration,
  //   sessionDurationIn,
  //   description,
  // ])
  const initialState = {
    courseTitle: '',
    description: '',
    numberOfSessions: '',
    sessionDuration: '',
    sessionDurationIn: '',
    listedPrice: '',
    finalPrice: '',
    courseDate: '',
    courseTime: '',
    hideService: '',
    limitParticipants: '',
    audienceSize: '',
    courseImage: '',
    sessions: [],
  }
  const imageInputref = useRef()
  const [image, setImage] = useState()
  const [convertedImage, setConvertedImage] = useState()
  const [hideService, setHideService] = useState(true)
  const [limitParticipants, setLimitParticipants] = useState(true)
  const toggleClass = ' transform translate-x-5'

  const items = ['Text', 'Upload (Pdf,jpeg)']
  // const [questionType, setQuestionType] = useState(items[0])
  const [state, setState] = useState(initialState)
  const [session, setSession] = useState('')
  const [sDate, setSDate] = useState('')
  const [sTime, setSTime] = useState('')
  const [sessions, setSessions] = useState([])
  useEffect(() => {
    const getImage = async () => {
      debugger
      debugger
      // const img = await Storage.get(courses.courseImage)
      const img = await getS3FileUrl(courses.courseImage)
      setConvertedImage(img)
    }
    if (courses.courseImage) {
      getImage()
    }
  }, [courses.courseImage])
  const handleSessionChange = (e) => {
    setSession(e.target.value)
  }

  const handleSessionDateChange = (e) => {
    setSDate(e.target.value)
  }

  const handleSessionTimeChange = (e) => {
    setSTime(e.target.value)
  }
  const handleFileInput = (e) => {
    debugger
    e.preventDefault()
    if (e.target.files?.[0]) {
      setImage(e.target.files[0])
    }
    // setValues((prev) => ({ ...prev, file: e.target.files[0] }))
  }

  const addSession = () => {
    const found = sessions.find(
      (item) =>
        item.text === session &&
        item.sessionDate === sDate &&
        item.sessionTime === sTime,
    )
    if (!found) {
      sessions.push({
        id: uuid(),
        text: session,
        sessionDate: sDate,
        sessionTime: sTime,
      })
    }
    setSession('')
  }
  const handleRemoveSession = (id) => {
    debugger
    const newSessions = sessions.filter((item) => item.id !== id)
    setSessions(newSessions)
  }
  return (
    <>
      <Formik
        initialValues={{ ...courses }}
        onSubmit={(values, e) => {
          debugger
          const { setSubmitting } = e
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false)
          }, 400)
          audienceSize === ''
            ? (values.audienceSize = 0)
            : (values.audienceSize = audienceSize)
          values.sessions = sessions
          values.file = image
          values.limitParticipants = limitParticipants
          values.hideService = hideService
          console.log('onsubmit - ', values)
          // setProfileState(values)
        }}
        // enableReinitialize={true}
        // validateOnChange={true}
        // validateOnBlur={true}
        // validateOnMount={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => {
          console.log('values', values)
          return (
            <form>
              <div className="flex flex-col md:flex-row lg:flex-row">
                <div className="bg-white basis-3/5">
                  <div className="flex flex-col tracking-wide text-black ml-4 w-full md:w-auto lg:w-auto">
                    <div className="px-2 mt-5">
                      <label className="leading-8 text-sm font-normal mt-5">
                        Course Title
                      </label>

                      <div className="flex flex-wrap items-start w-auto  mr-4 md:mr-1 lg:mr-1 relative">
                        {/* <div className="focus-outline flex flex-row rounded-md border border-gray-300 px-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 pr-1">
                        <label className="text-black py-2 flex-1 text-right pr-0  text-sm font-normal">
                          Growjunction.io/
                        </label>
                      </div> */}
                        <TextField
                          type="text"
                          name="courseTitle"
                          onChangeValue={handleChange}
                          value={values.courseTitle}
                          id="url"
                          placeholder="Course Title"
                          textStyleOverride={{
                            marginBottom: 0,
                            paddingLeft: 0,
                            width: '100%',
                          }}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div className="px-2 mt-5">
                      <label className="leading-8 text-sm font-normal mt-5">
                        Description
                      </label>
                      <div className="flex flex-wrap items-stretch w-auto mr-4 md:mr-1 lg:mr-1 relative">
                        <textarea
                          onChange={handleChange}
                          placeholder="Description"
                          value={values.description}
                          name="description"
                          className="w-full p-3 bg-gray-50 text-sm"
                        ></textarea>
                      </div>
                      <div className="flex justify-start text-xs mt-3 mb-10">
                        Describe yourself in 500 characters or less
                      </div>
                    </div>

                    <div className="flex flex-col font-normal mt-5 md:flex-row lg:flex-row">
                      <div className="px-2 text-sm w-full md:w-1/2 lg:w-1/2">
                        <label className="leading-8 text-lg font-normal mt-5">
                          Number of sessions
                        </label>
                        <div className="flex items-center flex-wrap w-auto mr-4 md:mr-1 lg:mr-1 relative">
                          <TextField
                            onChangeValue={handleChange}
                            type="number"
                            min="0"
                            value={values.numberOfSessions}
                            textStyleOverride={{ width: '100%' }}
                            name="numberOfSessions"
                            id="fname"
                            className=""
                          />
                          {/* <input
                          type="number"
                          value={values.numberOfSessions}
                          onChange={handleChange}
                          name="numberOfSessions"
                        /> */}
                        </div>
                      </div>
                      <div className="px-2 text-sm w-full md:w-1/2 lg:w-1/2">
                        <label className="leading-8 text-lg font-normal mt-5">
                          Session duration
                        </label>
                        <div className="flex items-center flex-wrap w-auto mr-4 md:mr-1 lg:mr-1 relative">
                          <TextField
                            type="number"
                            min="0"
                            textStyleOverride={{ width: '80%' }}
                            value={values.sessionDuration}
                            onChangeValue={handleChange}
                            name="sessionDuration"
                            id="lname"
                            widthPartial
                            className=""
                          />
                          <select
                            className="absolute px-3 py-3 top-1  text-lg right-1 bg-gray-50"
                            value="values.sessionDurationIn"
                            name="sessionDurationIn"
                            onChange={handleChange}
                          >
                            <option value="min">Min</option>
                            <option value="hours">Hours</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col font-normal mt-5 md:flex-row lg:flex-row">
                      <div className="px-2 text-sm w-full md:w-1/2 lg:w-1/2">
                        <label className="leading-8 text-lg font-normal mt-5">
                          Listed Price
                        </label>
                        <div className="flex flex-wrap items-stretch w-auto mr-4 md:mr-1 lg:mr-1 relative">
                          <TextField
                            onChangeValue={handleChange}
                            value={values.listedPrice}
                            placeholder="₹"
                            name="listedPrice"
                            type="text"
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div className="px-2 text-sm w-full md:w-1/2 lg:w-1/2">
                        <label className="leading-8 text-lg font-normal mt-5">
                          Final Price
                        </label>
                        <div className="flex flex-wrap items-stretch w-auto mr-4 md:mr-1 lg:mr-1 relative">
                          <TextField
                            type="text"
                            placeholder="₹"
                            value={values.finalPrice}
                            onChangeValue={handleChange}
                            name="finalPrice"
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col font-normal mt-5 md:flex-row lg:flex-row">
                      <div className="px-2 text-sm w-full md:w-1/2 lg:w-1/2">
                        <label className="leading-8 text-lg font-normal mt-5">
                          Date
                        </label>
                        <div className="flex flex-wrap items-stretch w-auto mr-4 md:mr-1 lg:mr-1 relative">
                          <TextField
                            onChangeValue={handleChange}
                            value={values.courseDate}
                            placeholder="₹"
                            name="courseDate"
                            type="date"
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div className="px-2 mb-10 text-sm w-full md:w-1/2 lg:w-1/2">
                        <label className="leading-8 text-lg font-normal mt-5">
                          Time
                        </label>
                        <div className="flex flex-wrap items-stretch w-auto mr-4 md:mr-1 lg:mr-1 relative">
                          <TextField
                            type="time"
                            placeholder="₹"
                            value={values.courseTime}
                            onChangeValue={handleChange}
                            name="courseTime"
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white basis-2/5">
                  <div className="flex flex-col ml-10 mt-10 mr-10  w-auto">
                    <p className="flex justify-start items-start text-sm ">
                      Upload thumbnail
                    </p>
                    <div className="flex flex-col md:flex-row lg:flex-row">
                      <div className="flex flex-col">
                        <div
                          className={`${classes['img-profile']} bg-gray-300 rounded-md border-dashed`}
                        >
                          {image ? (
                            <img
                              src={URL.createObjectURL(image)}
                              alt=""
                              className={`${classes['img-profile']}`}
                            />
                          ) : convertedImage ? (
                            <img
                              src={convertedImage}
                              alt=""
                              className={`${classes['img-profile']}`}
                            />
                          ) : null}
                        </div>
                        <div className="flex flex-col justify-start items-start mt-16 px-2 py-2">
                          <button className="flex justify-start items-start bg-white hover:bg-gray-900 hover:text-white text-black font-bold py-4 px-6 border-2 rounded-md min-w-40">
                            <button
                              className="ml-3 text-lg"
                              onClick={(e) => {
                                e.preventDefault()
                                imageInputref.current.click()
                              }}
                            >
                              Upload image
                            </button>
                            <input
                              type="file"
                              accept="image/*"
                              ref={imageInputref}
                              className="absolute w-0 h-0 left-0 top-0"
                              onChange={handleFileInput}
                            />
                          </button>
                          <p className="w-auto ml-3 mt-3 text-xs tracking-wide">
                            Max file size 5mb
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-px bg-gray-200 border-0"></div>

              <div className="flex flex-col-reverse md:flex-row lg:flex-row">
                <div className="bg-white basis-3/5 ">
                  <span className="text-xl font-semibold px-4">
                    Add Sessions
                  </span>
                  <div className="m-3 p-2 flex justify-start rounded-xl border-2 w-auto mr-6 md:mr-1 lg:mr-1">
                    <img
                      className="px-3 w-4 h-4"
                      src="/assets/icon/exclamationmarkcircle.png"
                    />
                    <span className="text-sm text-gray-400">
                      you can collect links to resume, Linkedin or ask any
                      specific question
                    </span>
                  </div>
                  <div>
                    {sessions.length > 0 && (
                      <div className="grid gap-2 grid-cols-4 px-10 py-5 text-lg uppercase border-b-2">
                        <span className="px-5">Session</span>
                        <span>Start Date</span>
                        <span>Start Time</span>
                      </div>
                    )}

                    {sessions.map((sns) => (
                      <div
                        key={sns.id}
                        className="grid grid-cols-4 px-10 py-5 items-center gap-2  text-lg "
                      >
                        <span className="px-5">{sns.text}</span>
                        <span>{sns.sessionDate}</span>
                        <span>{sns.sessionTime}</span>
                        <span
                          className="text-red-700 cursor-pointer  rounded-full hover:bg-gray-100  "
                          onClick={handleRemoveSession.bind(null, sns.id)}
                        >
                          Remove
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col justify-center items-center font-normal mt-5 ml-5 md:flex-row lg:flex-row bg-gray-50">
                    <div className="px-2 text-sm w-full md:w-1/2 lg:w-1/2">
                      <label className="leading-8 text-lg font-normal mt-5">
                        Session
                      </label>
                      <TextField
                        type="text"
                        name="session"
                        onChangeValue={handleSessionChange}
                        //value={values.sessionTitle}
                        id="session"
                        placeholder="Session"
                        textStyleOverride={{
                          marginBottom: 0,
                          paddingLeft: 0,
                          width: '100%',
                        }}
                        className="text-sm"
                      />
                    </div>
                    <div className="px-2 text-sm w-full md:w-1/2 lg:w-1/2">
                      <label className="leading-8 text-lg font-normal mt-5">
                        Start Date
                      </label>
                      <div className="flex flex-wrap items-stretch w-auto mr-4 md:mr-1 lg:mr-1 relative">
                        <TextField
                          onChangeValue={handleSessionDateChange}
                          //value={values.listedPrice}
                          placeholder="₹"
                          name="startDate"
                          type="date"
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="px-2 text-sm w-full md:w-1/2 lg:w-1/2">
                      <label className="leading-8 text-lg font-normal mt-5">
                        Start Time
                      </label>
                      <div className="flex flex-wrap items-stretch w-auto mr-4 md:mr-1 lg:mr-1 relative">
                        <TextField
                          type="time"
                          placeholder="₹"
                          //value={values.startTime}
                          onChangeValue={handleSessionTimeChange}
                          name="startTime"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" mt-5  bg-white"></div>
                </div>
                <div className="bg-white basis-2/5">
                  <div className="flex justify-center md:justify-end lg:justify-end w-auto mr-2">
                    <button
                      className="cursor-pointer mt-3 mr-3 px-6 py-3 leading-8 text-sm font-semibold  border-2 border-gray-900 rounded-md items-center  disabled:bg-gray-300 disabled:border-gray-50 disabled:text-gray-700    disabled:cursor-wait"
                      disabled={!session}
                      onClick={addSession}
                    >
                      Add another session
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full h-px bg-gray-300 border-0"></div>

              <div className="flex flex-col-reverse md:flex-row lg:flex-row">
                <div className="bg-white basis-3/5 ">
                  <span className="text-xl font-semibold px-4">Settings</span>
                  <div className="m-3 p-2 flex justify-start rounded-xl border-2 w-auto mr-6 md:mr-1 lg:mr-1">
                    <img
                      className="px-3"
                      src="/assets/icon/exclamationmarkcircle.png"
                    />
                    <span className="text-sm text-gray-400">
                      you can also record sessions during the call
                    </span>
                  </div>

                  <div className="flex flex-row bg-gray-50 ml-5 px-10 mt-5 rounded-md mr-4 md:mr-1 lg:mr-1 w-2/3">
                    <div
                      className="md:w-14 md:h-7 w-12 h-6 mx-6 m-5 flex items-center bg-gray-400 rounded-full p-1 cursor-pointer"
                      onClick={() => {
                        setHideService(!hideService)
                      }}
                    >
                      {/* Switch */}
                      <div
                        className={
                          'bg-black md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform' +
                          (hideService ? null : toggleClass)
                        }
                      ></div>
                    </div>
                    <div className="flex items-center text-sm">
                      Hide this service on your profile
                    </div>
                  </div>
                  <div> </div>
                  <div className="flex flex-row bg-gray-50 ml-5 px-10 mt-5 rounded-md mr-4 md:mr-1 lg:mr-1 w-2/3">
                    <div
                      className="md:w-14 md:h-7 w-12 h-6 mx-6 m-5 flex items-center bg-green-800 rounded-full p-1 cursor-pointer"
                      onClick={() => {
                        setLimitParticipants(!limitParticipants)
                      }}
                    >
                      {/* Switch */}
                      <div
                        className={
                          'bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform' +
                          (limitParticipants ? null : toggleClass)
                        }
                      ></div>
                    </div>
                    <div className="flex items-center text-sm">
                      Limit participants
                    </div>
                  </div>
                  <div className="px-2 text-sm ml-5 w-full md:w-1/2 lg:w-1/2">
                    <label className="leading-8 text-sm font-normal mt-5">
                      Audience size
                    </label>
                    <div className="flex items-center flex-wrap w-auto mr-4 md:mr-1 lg:mr-1 relative">
                      <TextField
                        onChangeValue={handleChange}
                        type="number"
                        min="0"
                        value={values.audienceSize}
                        textStyleOverride={{ width: '100%' }}
                        name="audienceSize"
                        id="audienceSize"
                        className=""
                      />
                    </div>
                  </div>
                  <div className=" mt-5  bg-white"></div>
                </div>
                <div className="bg-white basis-2/5"></div>
              </div>
              <div className="w-full h-px bg-gray-300 border-0"></div>
              <AutoSubmitToken
                setValues={setValues}
                sessions={sessions}
                hideService={hideService}
                limitParticipants={limitParticipants}
                image={image}
              />
            </form>
          )
        }}
      </Formik>
    </>
  )
}

export default Courses
