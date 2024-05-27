import React, { useState, useEffect, useRef } from 'react'
import { Formik, useFormikContext } from 'formik'
import Pill from '../../Header/Pill'
import TextField from '../../../../../../pages/ui-kit/TextField'
import { v4 as uuid } from 'uuid'
import classes from './Workshop.module.css'
import { Storage } from 'aws-amplify'
import { getS3FileUrl } from '../../../../../../utilities/others'
const AutoSubmitToken = ({ setValues, questions, image }) => {
  // Grab values and submitForm from context
  const { values, submitForm } = useFormikContext()

  React.useEffect(() => {
    debugger

    // values.questions = questions
    // values.limitedParticipants = limitedParticipants
    // values.hideService = hideService
    // values.workshopImage = image.name
    console.log('context_values', values)
    values.questions = questions
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

const Workshop = ({
  setWorkshopValues,
  workshop = {
    title: '',
    description: '',
    callDuration: '',
    callDurationIn: '',
    listedPrice: '',
    finalPrice: '',
    workshopDate: '',
    workshopTime: '',
    workshopImage: '',
    hideService: '',
    limitedParticipants: '',
    audienceSize: '',
    questions: [],
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
    title: '',
    description: '',
    callDuration: '',
    callDurationIn: '',
    listedPrice: '',
    finalPrice: '',
    workshopDate: '',
    workshopTime: '',
    workshopImage: '',
    hideService: '',
    limitedParticipants: '',
    audienceSize: '',
    //questions: []
  }
  const imageInputref = useRef()
  const [image, setImage] = useState()
  const [convertedImage, setConvertedImage] = useState()
  const [hideService, setHideService] = useState(true)
  const [limitedParticipants, setLimitedParticipants] = useState(true)
  const toggleClass = ' transform translate-x-5 bg-black'

  const items = ['Text', 'Upload (Pdf,jpeg)']
  const [questionType, setQuestionType] = useState(items[0])
  const [state, setState] = useState(workshop)
  const [question, setQuestion] = useState('')
  const [questions, setQuestions] = useState([])
  const [imageName, setImageName] = useState('')
  const [imageKey, setImageKey] = useState(state.workshopImage)
  useEffect(() => {
    const getImage = async () => {
      debugger
      debugger
      // const img = await Storage.get(workshop.workshopImage)
      const img = await getS3FileUrl(workshop.workshopImage)
      setConvertedImage(img)
    }
    if (workshop.workshopImage) {
      getImage()
    }
  }, [workshop.workshopImage])

  // useEffect(() => {
  //   debugger
  //   setImageName(image?.name)
  // }, [image])

  const setValues = (values) => {
    debugger
    values.file = image
    setWorkshopValues(values)
  }

  const handleFileInput = (e) => {
    e.preventDefault()
    debugger
    if (e.target.files?.[0]) {
      setImage(e.target.files[0])
    }
    setImageName(e.target.files[0]?.name)
    console.log('image - ', image)
    // setWorkshopValues((prev) => ({ ...prev, file: e.target.files[0] }))
  }

  // useEffect(() => {
  //   debugger
  //   //const key = ['workshopImage']
  //   const imgName = state['workshopImage']
  //   if (imgName) {
  //     setImageKey(imgName)
  //   }
  // }, [state])

  // useEffect(() => {
  //   debugger
  //   if (imageKey) {
  //     console.log('imageKey - ', imageKey)
  //     getImage()
  //   }
  // }, [imageKey])

  // const getImage = async () => {
  //   const imgUrl = await Storage.get(imageKey)
  //   setConvertedImage(imgUrl)
  // }

  //   console.log('image -', image)
  //   if (e.target.files[0]) {
  //     const name = e.target.files[0].name.substr(
  //       0,
  //       e.target.files[0].name.lastIndexOf('.'),
  //     )
  //     const ext = e.target.files[0].name.substr(
  //       e.target.files[0].name.lastIndexOf('.') + 1,
  //     )
  //     const filename = `${name}_${uuid()}.${ext}`
  //     setImageUrl(filename)
  //     console.log(imageUrl)
  //     // await Storage.put(filename, e.target.files[0], {
  //     //   contentType: `image/${ext}`, // contentType is optional
  //     // })
  //   }
  // }

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value)
  }
  const addQuestion = () => {
    const found = questions.find(
      (item) => item.text === question && item.type === questionType,
    )
    if (!found) {
      questions.push({
        id: uuid(),
        text: question,
        type: questionType,
      })
    }
    setQuestionType(items[0])
    setQuestion('')
  }
  const handleRemoveQuestion = (id) => {
    debugger
    const newQuestions = questions.filter((item) => item.id !== id)
    setQuestions(newQuestions)
  }
  return (
    <>
      <Formik
        initialValues={{ ...workshop }}
        onSubmit={(values, e) => {
          debugger
          const { setSubmitting } = e
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false)
          }, 400)
          values.questions = questions
          values.workshopImage = image
          values.limitedParticipants = limitedParticipants
          values.hideService = hideService
          console.log('onsubmit - ', values)
          // setProfileState(values)
        }}
        enableReinitialize={false}
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
                        Workshop Title
                      </label>

                      <div className="flex flex-wrap items-start w-auto  mr-4 md:mr-1 lg:mr-1 relative">
                        {/* <div className="focus-outline flex flex-row rounded-md border border-gray-300 px-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 pr-1">
                        <label className="text-black py-2 flex-1 text-right pr-0  text-sm font-normal">
                          Growjunction.io/
                        </label>
                      </div> */}
                        <TextField
                          type="text"
                          name="title"
                          onChangeValue={handleChange}
                          value={values.title}
                          id="title"
                          placeholder="Workshop Title"
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

                    <div className="px-2 text-sm w-full">
                      <label className="leading-8 text-lg font-normal mt-5">
                        Call duration
                      </label>
                      <div className="flex items-center flex-wrap w-auto mr-4 md:mr-1 lg:mr-1 relative">
                        <TextField
                          type="number"
                          min="0"
                          textStyleOverride={{ width: '80%' }}
                          value={values.callDuration}
                          onChangeValue={handleChange}
                          name="callDuration"
                          id="callDuration"
                          widthPartial
                          className=""
                        />
                        <select
                          className="absolute px-3 py-3 top-1  text-lg right-1 bg-gray-50"
                          value="values.callDurationIn"
                          name="callDurationIn"
                          onChange={handleChange}
                        >
                          <option value="min">Min</option>
                          <option value="hours">Hours</option>
                        </select>
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
                            value={values.workshopDate}
                            placeholder="₹"
                            name="workshopDate"
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
                            value={values.workshopTime}
                            onChangeValue={handleChange}
                            name="workshopTime"
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
                      Upload workshop thumbnail
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
                    Additional question
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
                    {questions.length > 0 && (
                      <div className="grid gap-2 grid-cols-3 px-10 py-5 text-lg uppercase border-b-2">
                        <span>Question</span>
                        <span>Type</span>
                        <span className="px-5">Action</span>
                      </div>
                    )}

                    {questions.map((qns) => (
                      <div
                        key={qns.id}
                        className="grid grid-cols-3 px-10 py-5 items-center gap-2  text-lg "
                      >
                        <span>{qns.text}</span>
                        <span>{qns.type}</span>
                        <span
                          className="text-red-700 cursor-pointer py-3 px-5 rounded-full hover:bg-gray-100 w-32 "
                          onClick={handleRemoveQuestion.bind(null, qns.id)}
                        >
                          Remove
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="ml-5 px-10 mt-5 bg-gray-50 rounded-md mr-4 md:mr-1 lg:mr-1 w-2/3">
                    <div className="bg-gray-50 text-base ">
                      <label>Enter question</label>
                      <TextField
                        name="social.facebook_url"
                        value={question}
                        onChangeValue={handleQuestionChange}
                        // styleOverride={{ backgroundColor: '#fff' }}
                        classOverride="bg-white"
                        //   value={values.social.facebook_url}
                        type="text"
                        id="linkedurl"
                        placeholder="Enter your question here"
                      />
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3"></input>
                      <span className="text-sm">Required</span>
                    </div>
                    <div className="text-lg bg-gray-50 py-4">
                      <label className="mb-3 text-sm">
                        Answer type (Select)
                      </label>
                      <section className="flex mt-3">
                        {items.map((item, index) => {
                          return (
                            <Pill
                              selected={item === questionType}
                              title={item}
                              key={index}
                              onSelected={setQuestionType}
                              className="mr-3 text-sm"
                            />
                          )
                        })}
                      </section>
                    </div>
                  </div>
                  <div className=" mt-5  bg-white"></div>
                </div>
                <div className="bg-white basis-2/5">
                  <div className="flex justify-center md:justify-end lg:justify-end w-auto mr-2">
                    <button
                      className="cursor-pointer mt-3 mr-3 px-6 py-3 leading-8 text-sm font-semibold  border-2 border-gray-900 rounded-md items-center  disabled:bg-gray-300 disabled:border-gray-50 disabled:text-gray-700    disabled:cursor-wait"
                      disabled={!question}
                      onClick={addQuestion}
                    >
                      Add another question
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
                          'bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform' +
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
                      className="md:w-14 md:h-7 w-12 h-6 mx-6 m-5 flex items-center bg-gray-400 rounded-full p-1 cursor-pointer"
                      onClick={() => {
                        setLimitedParticipants(!limitedParticipants)
                      }}
                    >
                      {/* Switch */}
                      <div
                        className={
                          'bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform' +
                          (limitedParticipants ? null : toggleClass)
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
                questions={questions}
                image={image}
              />
            </form>
          )
        }}
      </Formik>
    </>
  )
}

export default Workshop
