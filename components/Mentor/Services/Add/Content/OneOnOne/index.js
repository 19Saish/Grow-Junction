import React, { useState, useEffect } from 'react'
import { Formik, useFormikContext } from 'formik'
import Pill from '../../Header/Pill'
import TextField from '../../../../../../pages/ui-kit/TextField'
import { v4 as uuid } from 'uuid'
const AutoSubmitToken = ({ setValues, questions }) => {
  // Grab values and submitForm from context
  const { values, submitForm } = useFormikContext()

  React.useEffect(() => {
    debugger
    console.log('context_values', values)
    values.questions = questions
    setValues(values)
    // setProfile(values)
    // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
    // if (values.token.length === 6) {
    //   submitForm();
    // }
  }, [values, submitForm])
  return null
}
const OneOnOne = ({
  setValues,
  state: initial,
  oneOnOne = {
    sessionTitle: '',
    listedPrice: '',
    finalPrice: '',
    numberOfSessions: '',
    sessionDuration: '',
    sessionDurationIn: '',
    description: '',
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
    sessionTitle: '',
    listedPrice: '',
    finalPrice: '',
    numberOfSessions: '',
    sessionDuration: '',
    sessionDurationIn: '',
    description: '',
    // questions: [],
  }
  const items = ['Text', 'Upload (Pdf,jpeg)']
  const [questionType, setQuestionType] = useState(items[0])
  const [state, setState] = useState(initialState)
  const [question, setQuestion] = useState('')
  const [required, setRequired] = useState(false)
  const [questions, setQuestions] = useState([])
  const onRequiredChanged = (e) => {
    setRequired(e.target.checked)
  }
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value)
  }
  const addQuestion = () => {
    debugger
    const found = questions.find(
      (item) => item.text === question && item.type === questionType,
    )
    if (!found) {
      questions.push({
        id: uuid(),
        text: question,
        type: questionType,
        required,
      })
    }
    setQuestionType(items[0])
    setQuestion('')
    setRequired(false)
  }
  const handleRemoveQuestion = (id) => {
    debugger
    const newQuestions = questions.filter((item) => item.id !== id)
    setQuestions(newQuestions)
  }
  return (
    <>
      <Formik
        initialValues={{ ...oneOnOne }}
        onSubmit={(values, e) => {
          debugger
          const { setSubmitting } = e
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false)
          }, 400)
          values.questions = questions
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
                    {/* <div className="flex flex-col ml-4 p-6 border-2 rounded-md bg-white">
          <div className="text-lg">40% of profile completed</div>
          <div className="flex w-1/2">
            <div className="w-2/5 bg-gray-600 h-2 rounded-l-lg"></div>
            <div className="w-3/5 bg-gray-300 h-2 rounded-r-lg"></div>
          </div>
          <p className="text-lg">
            Complete 100% of the profile to get a better reach
          </p>
        </div> */}
                    {/* <h2 className="p-2 leading-8 text-2xl font-semibold">
                    About Yourself
                  </h2> */}

                    <div className="px-2 mt-5">
                      <label className="leading-8 text-sm font-normal mt-5">
                        Session Title
                      </label>

                      <div className="flex flex-wrap items-start w-auto  mr-4 md:mr-1 lg:mr-1 relative">
                        {/* <div className="focus-outline flex flex-row rounded-md border border-gray-300 px-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 pr-1">
                        <label className="text-black py-2 flex-1 text-right pr-0  text-sm font-normal">
                          Growjunction.io/
                        </label>
                      </div> */}
                        <TextField
                          type="text"
                          name="sessionTitle"
                          onChangeValue={handleChange}
                          value={values.sessionTitle}
                          id="url"
                          placeholder="Session Title"
                          textStyleOverride={{
                            marginBottom: 0,
                            paddingLeft: 0,
                            width: '100%',
                          }}
                          className="text-sm"
                        />
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
                            value={values.sessionDurationIn}
                            name="sessionDurationIn"
                            onChange={handleChange}
                          >
                            <option value="min">Min</option>
                            <option value="hours">Hours</option>
                          </select>
                        </div>
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
                          className="w-full p-3 bg-gray-50 text-lg"
                        ></textarea>
                      </div>
                      <div className="flex justify-start text-xs mt-3 mb-10">
                        Describe yourself in 500 characters or less
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white basis-2/5"></div>
              </div>
              <div className="w-full h-px bg-gray-200 border-0"></div>

              <div className="flex flex-col-reverse md:flex-row lg:flex-row">
                <div className="bg-white basis-3/5 ">
                  <span className="text-xl font-semibold px-4">
                    Additional question
                  </span>
                  <div className="m-3 p-2 flex justify-start rounded-xl border-2 w-auto mr-6 md:mr-1 lg:mr-1">
                    <img
                      className=" w-4 h-4"
                      src="/assets/icon/exclamationmarkcircle.png"
                    />
                    <span className="text-sm text-gray-400 px-3">
                      You can collect links to resume, Linkedin or ask any
                      specific question
                    </span>
                  </div>
                  <div>
                    {questions.length > 0 && (
                      <div className="grid gap-2 grid-cols-4 px-10 py-5 text-lg uppercase border-b-2">
                        <span>Question</span>
                        <span>Type</span>
                        <span>Required</span>
                        <span className="px-5">Action</span>
                      </div>
                    )}

                    {questions.map((qns) => (
                      <div
                        key={qns.id}
                        className="grid grid-cols-4 px-10 py-5 items-center gap-2  text-lg "
                      >
                        <span>{qns.text}</span>
                        <span>{qns.type}</span>
                        <span>{qns.required.toString()}</span>
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
                    <div className="">
                      <label className="text-sm flex items-center">
                        <input
                          type="checkbox"
                          className="mr-3"
                          checked={required}
                          onChange={onRequiredChanged}
                        ></input>
                        <span>Required</span>
                      </label>
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
              <AutoSubmitToken setValues={setValues} questions={questions} />
            </form>
          )
        }}
      </Formik>
    </>
  )
}

export default OneOnOne
