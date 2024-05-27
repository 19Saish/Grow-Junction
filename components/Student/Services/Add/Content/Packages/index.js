import React, { useState, useEffect, useRef } from 'react'
import { Formik, useFormikContext } from 'formik'
import Pill from '../../Header/Pill'
import TextField from '../../../../../../pages/ui-kit/TextField'
import { v4 as uuid } from 'uuid'
import classes from './Packages.module.css'
import { Storage } from 'aws-amplify'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { listOneOnOnes } from '/src/graphql/queries'
import { listTextQueries } from '/src/graphql/queries'
import { listWorkshops } from '/src/graphql/queries'
import { listCourses } from '/src/graphql/queries'
import { getLoggedinUserEmail } from '../../../../../../utilities/user'
import { getS3FileUrl, setS3FileUrl } from '../../../../../../utilities/others'
const AutoSubmitToken = ({
  setValues,
  hideService,
  limitParticipants,
  packageImage,
  uploadFileUrl,
  packageServices,
}) => {
  // Grab values and submitForm from context
  const { values, submitForm } = useFormikContext()
  // debugger
  React.useEffect(() => {
    // debugger
    console.log('context_values', values)
    values.limitParticipants = limitParticipants
    values.hideService = hideService
    if (packageImage) values.file = packageImage
    values.uploadFile = uploadFileUrl
    // if (sessions.length > 0) packageServices.push(sessions)
    // if (textQueries.length > 0) packageServices.push(textQueries)
    // if (workshops.length > 0) packageServices.push(workshops)
    // if (courses.length > 0) packageServices.push(courses)
    values.packageServices = packageServices
    setValues(values)
    // setProfile(values)
    // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
    // if (values.token.length === 6) {
    //   submitForm();
    // }
  }, [values, packageImage, submitForm, packageServices])
  return null
}

const Packages = ({
  setValues,
  state: initial,
  packages = {
    packageTitle: '',
    description: '',
    listedPrice: '',
    finalPrice: '',
    packageImage: '',
    emailContent: '',
    uploadFile: '',
    hideService: '',
    limitParticipants: '',
    audienceSize: '',
    packageServices: [],
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
  //   // questions: [],
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
    packageTitle: '',
    description: '',
    listedPrice: '',
    finalPrice: '',
    packageImage: '',
    emailContent: '',
    uploadFile: '',
    hideService: '',
    limitParticipants: '',
    audienceSize: '',
    //packageServices: []
  }

  // const [services, setServices] = useState({
  //   oneOnOne: [],
  //   workshop: [],
  //   courses: [],
  //   textQuery: [],
  // })

  useEffect(() => {
    loadOneOnOne()
    loadTextQuery()
    loadWorkshop()
    loadCourses()
  }, [packages.packageServices])
  useEffect(() => {
    const getImage = async () => {
      // const img = await Storage.get(packages.packageImage)
      const img = await getS3FileUrl(packages.packageImage)
      setConvertedImage(img)
    }
    if (packages.packageImage) {
      getImage()
    }
  }, [packages.packageImage])

  const [sessionResults, setSessionResults] = useState([])
  const [workshopResults, setWorkshopResults] = useState([])
  const [textQueryResults, setTextQueryResults] = useState([])
  const [coursesResults, setCoursesResults] = useState([])
  const [sessions, setSessions] = useState([])
  const [workshops, setWorkshops] = useState([])
  const [textQueries, setTextQueries] = useState([])
  const [courses, setCourses] = useState([])
  const [sessionState, setSessionState] = useState()
  const imageInputref = useRef()
  const fileInputref = useRef()
  const [image, setImage] = useState(null)
  const [uploadFile, setUploadFile] = useState(null)
  const [convertedImage, setConvertedImage] = useState()
  const [hideService, setHideService] = useState(true)
  const [limitParticipants, setLimitParticipants] = useState(true)
  const toggleClass = ' transform translate-x-5'

  // const [questionType, setQuestionType] = useState(items[0])
  // const [state, setState] = useState(initialState)
  // const [question, setQuestion] = useState('')
  const [packageServices, setPackageServices] = useState([])
  const [imageUrl, setImageUrl] = useState()
  const [fileUrl, setFileUrl] = useState()
  const [flag, setFlag] = useState(false)

  const items = ['Text', 'Upload (Pdf,jpeg)']
  const usrname = getLoggedinUserEmail()

  const loadOneOnOne = async () => {
    try {
      // const usr = await Auth.currentAuthenticatedUser()
      // console.log('usr', usr)
      const results = await API.graphql(
        graphqlOperation(listOneOnOnes, {
          filter: { username: { contains: usrname } },
        }),
      )
      // debugger
      if (results.data.listOneOnOnes.items.length > 0) {
        // debugger

        const resultsCloned = [...results.data.listOneOnOnes.items]
        const editedValues = [...packages.packageServices]
        editedValues.forEach((a) => {
          const foundItem = resultsCloned.find(
            (it) => a.title === it.sessionTitle,
          )
          if (foundItem) {
            foundItem.selected = true
          }
        })
        setSessionResults(resultsCloned)
        console.log('oneonone- ', sessionResults)
      }
    } catch (error) {
      console.log(`Load Error:${error}`)
    }
  }

  const loadWorkshop = async () => {
    // debugger
    try {
      // const usr = await Auth.currentAuthenticatedUser()
      // console.log('usr', usr)
      const results = await API.graphql(
        graphqlOperation(listWorkshops, {
          filter: { username: { contains: usrname } },
        }),
      )
      if (results.data.listWorkshops.items.length > 0) {
        const resultsCloned = [...results.data.listWorkshops.items]
        const editedValues = [...packages.packageServices]
        editedValues.forEach((a) => {
          const foundItem = resultsCloned.find((it) => a.title === it.title)
          if (foundItem) {
            foundItem.selected = true
          }
        })
        setWorkshopResults(resultsCloned)
        console.log('oneonone- ', sessionResults)
      }
    } catch (error) {
      console.log(`Load Error:${error}`)
    }
  }

  const loadCourses = async () => {
    try {
      // const usr = await Auth.currentAuthenticatedUser()
      // console.log('usr', usr)
      const results = await API.graphql(
        graphqlOperation(listCourses, {
          filter: { username: { contains: usrname } },
        }),
      )
      if (results.data.listCourses.items.length > 0) {
        const resultsCloned = [...results.data.listCourses.items]
        const editedValues = [...packages.packageServices]
        editedValues.forEach((a) => {
          const foundItem = resultsCloned.find(
            (it) => a.title === it.courseTitle,
          )
          if (foundItem) {
            foundItem.selected = true
          }
        })
        setCoursesResults(resultsCloned)
        console.log('oneonone- ', sessionResults)
      }
    } catch (error) {
      console.log(`Load Error:${error}`)
    }
  }

  const loadTextQuery = async () => {
    try {
      // const usr = await Auth.currentAuthenticatedUser()
      // console.log('usr', usr)
      const results = await API.graphql(
        graphqlOperation(listTextQueries, {
          filter: { username: { contains: usrname } },
        }),
      )
      if (results.data.listTextQueries.items.length > 0) {
        const resultsCloned = [...results.data.listTextQueries.items]
        const editedValues = [...packages.packageServices]
        editedValues.forEach((a) => {
          const foundItem = resultsCloned.find((it) => a.title === it.title)
          if (foundItem) {
            foundItem.selected = true
          }
        })
        setTextQueryResults(resultsCloned)
        console.log('oneonone- ', sessionResults)
      }
    } catch (error) {
      console.log(`Load Error:${error}`)
    }
  }

  const handleFileInput = async (e) => {
    e.preventDefault()
    // debugger
    if (e.target.files?.[0]) {
      setImage(e.target.files[0])
    }
    // setValues((prev) => ({ ...prev, file: e.target.files[0] }))
  }

  const handleFileUpload = async (e) => {
    e.preventDefault()
    // debugger
    if (e.target.files?.[0]) {
      setUploadFile(e.target.files[0])
    }
    console.log('file -', uploadFile)
    if (e.target.files[0]) {
      const name = e.target.files[0].name.substr(
        0,
        e.target.files[0].name.lastIndexOf('.'),
      )
      const ext = e.target.files[0].name.substr(
        e.target.files[0].name.lastIndexOf('.') + 1,
      )
      const filename = `${name}_${uuid()}.${ext}`
      setFileUrl(filename)
      console.log(fileUrl)
      await setS3FileUrl(filename, e.target.files[0], packages.packageImage)
      // await Storage.put(filename, e.target.files[0], {
      //   contentType: `text/${ext}`, // contentType is optional
      // })
    }
  }

  const sessionState1 = () => {
    return {
      sessionResults: [
        ...sessionResults.map((session) => {
          return { ...session }
        }),
      ],
    }
  }

  const toggleSessionSelect = (index) => {
    // debugger
    console.log('index - ', index)
    const { sessionResults } = sessionState1()
    sessionResults[index].selected = !sessionResults[index].selected
    setSessionResults(sessionResults)
    setSessions(sessionResults)
    sessionResults.map((s, idx) => {
      if (s.selected) {
        packageServices.push({
          id: uuid(),
          text: '1 on 1 Session',
          title: s.sessionTitle,
          duration: s.sessionDuration + ' ' + s.sessionDurationIn,
          price: s.finalPrice,
        })
      }
    })
  }

  const workshopState1 = {
    workshopResults: [
      ...workshopResults.map((workshop) => {
        return { ...workshop }
      }),
    ],
  }

  const toggleWorkshopSelect = (index) => {
    const { workshopResults } = workshopState1
    workshopResults[index].selected = !workshopResults[index].selected
    setWorkshopResults(workshopResults)
    setWorkshops(workshopResults)
    workshopResults.map((s, idx) => {
      if (s.selected) {
        packageServices.push({
          id: uuid(),
          text: 'Workshop',
          title: s.title,
          duration: s.callDuration + ' ' + s.callDurationIn,
          price: s.finalPrice,
        })
      }
    })
  }

  const coursesState1 = {
    coursesResults: [
      ...coursesResults.map((course) => {
        return { ...course }
      }),
    ],
  }

  const toggleCoursesSelect = (index) => {
    const { coursesResults } = coursesState1
    coursesResults[index].selected = !coursesResults[index].selected
    setCoursesResults(coursesResults)
    setCourses(coursesResults)
    coursesResults.map((s, idx) => {
      if (s.selected) {
        packageServices.push({
          id: uuid(),
          text: 'Courses',
          title: s.courseTitle,
          duration: s.sessionDuration + ' ' + s.sessionDurationIn,
          price: s.finalPrice,
        })
      }
    })
  }

  const textQueryState1 = {
    textQueryResults: [
      ...textQueryResults.map((textQuery) => {
        return { ...textQuery }
      }),
    ],
  }

  const toggleTextQuerySelect = (index) => {
    const { textQueryResults } = textQueryState1
    textQueryResults[index].selected = !textQueryResults[index].selected
    setTextQueryResults(textQueryResults)
    setTextQueries(textQueryResults)
    textQueryResults.map((s, idx) => {
      if (s.selected) {
        packageServices.push({
          id: uuid(),
          text: 'TextQuery',
          title: s.title,
          duration: s.responseTime + ' ' + s.responseTimeIn,
          price: s.finalPrice,
        })
      }
    })
  }

  return (
    <>
      <Formik
        initialValues={{ ...packages }}
        onSubmit={(values, e) => {
          // debugger
          const { setSubmitting } = e
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false)
          }, 400)
          if (sessions.length > 0) packageServices.push(sessions)
          if (textQueries.length > 0) packageServices.push(textQueries)
          if (workshops.length > 0) packageServices.push(workshops)
          if (courses.length > 0) packageServices.push(courses)
          values.packageServices = packageServices
          values.packageImage = imageUrl
          values.uploadFile = fileUrl
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
                        Package Title
                      </label>

                      <div className="flex flex-wrap items-start w-auto  mr-4 md:mr-1 lg:mr-1 relative">
                        {/* <div className="focus-outline flex flex-row rounded-md border border-gray-300 px-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 pr-1">
                        <label className="text-black py-2 flex-1 text-right pr-0  text-sm font-normal">
                          Growjunction.io/
                        </label>
                      </div> */}
                        <TextField
                          type="text"
                          name="packageTitle"
                          onChangeValue={handleChange}
                          value={values.packageTitle}
                          id="url"
                          placeholder="Package Title"
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
                      <div className="px-2 text-sm mb-10 w-full md:w-1/2 lg:w-1/2">
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
                  </div>
                </div>
                <div className="bg-white basis-2/5">
                  <div className="flex flex-col ml-10 mt-10 mr-10  w-auto">
                    <p className="flex justify-start items-start text-sm ">
                      Upload packages thumbnail
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
              <div className="w-full h-px bg-gray-300 border-0"></div>

              <div className="flex flex-col-reverse md:flex-row lg:flex-row">
                <div className="bg-white basis-3/5 ">
                  <div className="px-4 mt-5 rounded-md mr-4 md:mr-1 lg:mr-1 w-2/3">
                    <div className="flex flex-col text-base ">
                      <span className="text-xl font-semibold">
                        Email to registered students
                      </span>
                      <span className="text-sm font-normal mt-10"></span>

                      <div className="px-2 mt-5">
                        <label className="leading-8 text-sm font-normal mt-5">
                          Email content
                        </label>
                        <div className="flex flex-wrap items-stretch w-auto mr-4 md:mr-1 lg:mr-1 relative">
                          <textarea
                            onChange={handleChange}
                            placeholder="emailContent"
                            value={values.emailContent}
                            name="emailContent"
                            className="w-full p-3  text-sm border-2"
                          ></textarea>
                        </div>
                      </div>

                      <div className="flex flex-col mt-10 mb-10 px-2 w-1/3">
                        <p className="flex justify-start items-start text-sm ">
                          Upload file (optional)
                        </p>
                        <div className="flex justify-start items-start bg-white hover:bg-gray-900 hover:text-white text-black font-bold py-4 px-6 border-2 rounded-md">
                          <button
                            className="ml-3 text-lg"
                            onClick={(e) => {
                              e.preventDefault()
                              fileInputref.current.click()
                            }}
                          >
                            Upload file
                          </button>
                          <input
                            type="file"
                            accept="text/*"
                            ref={fileInputref}
                            className="absolute w-0 h-0 left-0 top-0"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-300 border-0"></div>
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
                  <div className="px-2 text-sm ml-5 mt-5 w-full md:w-1/2 lg:w-1/2">
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
              <div className="w-full h-px bg-gray-200 border-0"></div>

              <div className="flex flex-col-reverse md:flex-row lg:flex-row">
                <div className="bg-white basis-3/5 ">
                  <span className="text-xl font-semibold px-4">
                    Available services
                  </span>
                  <div className="m-3 p-2 flex justify-start rounded-xl border-2 w-auto mr-6 md:mr-1 lg:mr-1">
                    <img
                      className="px-3 w-4 h-4"
                      src="/assets/icon/exclamationmarkcircle.png"
                    />
                    <span className="text-sm text-gray-400">
                      Select services added by you to create a package
                    </span>
                  </div>

                  <div className=" mt-5  bg-white"></div>
                </div>
                <div className="bg-white basis-2/5"></div>
              </div>

              <div className="bg-white w-auto">
                {/* session start */}
                <div className="flex justify-start bg-amber-400 p-4 w-full rounded-lg text-xl font-bold">
                  Sessions
                </div>
                <div className="flex-wrap w-auto">
                  {sessionResults !== null && sessionResults.length > 0 ? (
                    <div className="my-3 bg-white p-2">
                      <div className="flex flex-wrap w-auto">
                        {sessionResults.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="flex relative w-1/3 m-5"
                              onClick={() => toggleSessionSelect(index)}
                            >
                              <div className="flex flex-col justify-center items-center p-2  text-center rounded-2xl shadow-lg m-4 w-full border-2">
                                <div className="flex text-black text-2xl font-semibold px-4 py-2">
                                  {item.sessionTitle}
                                </div>
                                <div className="flex items-center">
                                  <img
                                    src="/assets/icon/mentor-dashboard/clock-two.svg"
                                    className="h-5 mr-2"
                                  />
                                  <span className="text-sm font-semibold">
                                    {item.sessionDuration}{' '}
                                    {item.sessionDurationIn}
                                  </span>
                                </div>
                                <div className="flex items-center  py-1 px-2 ">
                                  <img
                                    src="/assets/icon/mentor-dashboard/price.svg"
                                    className="h-5 mr-2"
                                  />
                                  <span className="text-sm font-semibold py-3">
                                    ₹{item.finalPrice}
                                  </span>
                                </div>
                              </div>
                              {item.selected && (
                                <div
                                  className={`absolute w-full h-full  text-center rounded-2xl shadow-lg ${classes.backdrop} ${classes.itemContainer}`}
                                ></div>
                              )}
                            </div>
                          )
                        })}
                      </div>

                      {/* outer */}
                    </div>
                  ) : (
                    <div className="bg-white py-5 px-5 w-full rounded-md text-2xl text-center cursor-pointer">
                      No packages found
                    </div>
                  )}
                </div>
                {/*session  end */}
              </div>

              <div className="bg-white w-auto">
                {/* workshop start */}
                <div className="flex justify-start bg-amber-400 p-4 w-full rounded-lg text-xl font-bold">
                  Workshop
                </div>
                <div className="flex-wrap w-auto">
                  {workshopResults !== null && workshopResults.length > 0 ? (
                    <div className="my-3 bg-white p-2">
                      <div className="flex flex-wrap w-auto">
                        {workshopResults.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="flex relative w-1/3 m-5"
                              onClick={() => toggleWorkshopSelect(index)}
                            >
                              <div className="flex flex-col justify-center items-center p-2  text-center rounded-2xl shadow-lg m-4 w-full border-2">
                                <div className="flex text-black text-2xl font-semibold px-4 py-2">
                                  {item.title}
                                </div>
                                <div className="flex items-center">
                                  <img
                                    src="/assets/icon/mentor-dashboard/clock-two.svg"
                                    className="h-5 mr-2"
                                  />
                                  <span className="text-sm font-semibold">
                                    {item.callDuration} {item.callDurationIn}
                                  </span>
                                </div>
                                <div className="flex items-center  py-1 px-2 ">
                                  <img
                                    src="/assets/icon/mentor-dashboard/price.svg"
                                    className="h-5 mr-2"
                                  />
                                  <span className="text-sm font-semibold py-3">
                                    ₹{item.finalPrice}
                                  </span>
                                </div>
                              </div>
                              {item.selected && (
                                <div
                                  className={`absolute w-full h-full  text-center rounded-2xl shadow-lg ${classes.backdrop} ${classes.itemContainer}`}
                                ></div>
                              )}
                            </div>
                          )
                        })}
                      </div>

                      {/* outer */}
                    </div>
                  ) : (
                    <div className="bg-white py-5 px-5 w-full rounded-md text-2xl text-center cursor-pointer">
                      No workshop found
                    </div>
                  )}
                </div>
                {/*Workshop  end */}
              </div>

              <div className="bg-white w-auto">
                {/* courses start */}
                <div className="flex justify-start bg-amber-400 p-4 w-full rounded-lg text-xl font-bold">
                  Courses
                </div>
                <div className="flex-wrap w-auto">
                  {coursesResults !== null && coursesResults.length > 0 ? (
                    <div className="my-3 bg-white p-2">
                      <div className="flex flex-wrap w-auto">
                        {coursesResults.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="flex relative w-1/3 m-5"
                              onClick={() => toggleCoursesSelect(index)}
                            >
                              <div className="flex flex-col justify-center items-center p-2  text-center rounded-2xl shadow-lg m-4 w-full border-2">
                                <div className="flex text-black text-2xl font-semibold px-4 py-2">
                                  {item.courseTitle}
                                </div>
                                <div className="flex items-center">
                                  <img
                                    src="/assets/icon/mentor-dashboard/clock-two.svg"
                                    className="h-5 mr-2"
                                  />
                                  <span className="text-sm font-semibold">
                                    {item.sessionDuration}{' '}
                                    {item.sessionDurationIn}
                                  </span>
                                </div>
                                <div className="flex items-center  py-1 px-2 ">
                                  <img
                                    src="/assets/icon/mentor-dashboard/price.svg"
                                    className="h-5 mr-2"
                                  />
                                  <span className="text-sm font-semibold py-3">
                                    ₹{item.finalPrice}
                                  </span>
                                </div>
                              </div>
                              {item.selected && (
                                <div
                                  className={`absolute w-full h-full  text-center rounded-2xl shadow-lg ${classes.backdrop} ${classes.itemContainer}`}
                                ></div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                      {/* outer */}
                    </div>
                  ) : (
                    <div className="bg-white py-5 px-5 w-full rounded-md text-2xl text-center cursor-pointer">
                      No courses found
                    </div>
                  )}
                </div>
                {/*Courses  end */}
              </div>

              <div className="bg-white w-auto">
                {/* Text query start */}
                <div className="flex justify-start bg-amber-400 p-4 w-full rounded-lg text-xl font-bold">
                  Text Query
                </div>
                <div className="flex-wrap w-auto">
                  {textQueryResults !== null && textQueryResults.length > 0 ? (
                    <div className="my-3 bg-white p-2">
                      <div className="flex flex-wrap w-auto">
                        {textQueryResults.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="flex relative w-1/3 m-5"
                              onClick={() => toggleTextQuerySelect(index)}
                            >
                              <div className="flex flex-col justify-center items-center p-2  text-center rounded-2xl shadow-lg m-4 w-full border-2">
                                <div className="flex text-black text-2xl font-semibold px-4 py-2">
                                  {item.title}
                                </div>
                                <div className="flex items-center">
                                  <img
                                    src="/assets/icon/mentor-dashboard/clock-two.svg"
                                    className="h-5 mr-2"
                                  />
                                  <span className="text-sm font-semibold">
                                    {item.responseTime} {item.responseTimeIn}
                                  </span>
                                </div>
                                <div className="flex items-center  py-1 px-2 ">
                                  <img
                                    src="/assets/icon/mentor-dashboard/price.svg"
                                    className="h-5 mr-2"
                                  />
                                  <span className="text-sm font-semibold py-3">
                                    ₹{item.finalPrice}
                                  </span>
                                </div>
                              </div>
                              {item.selected && (
                                <div
                                  className={`absolute w-full h-full  text-center rounded-2xl shadow-lg ${classes.backdrop} ${classes.itemContainer}`}
                                ></div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                      {/* outer */}
                    </div>
                  ) : (
                    <div className="bg-white py-5 px-5 w-full rounded-md text-2xl text-center cursor-pointer">
                      No text query found
                    </div>
                  )}
                </div>
                {/*Text query  end */}
              </div>
              <div className="w-full h-px bg-gray-300 border-0"></div>
              <AutoSubmitToken
                setValues={setValues}
                hideService={hideService}
                limitParticipants={limitParticipants}
                packageImage={image}
                uploadFileUrl={fileUrl}
                packageServices={packageServices}
              />
            </form>
          )
        }}
      </Formik>
    </>
  )
}

export default Packages
