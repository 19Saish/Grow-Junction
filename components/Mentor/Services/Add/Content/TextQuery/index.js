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
const TextQuery = ({
  setValues,
  state: initial,
  textQuery = {
    title: '',
    description: '',
    responseTime: '',
    responseTimeIn: '',
    listedPrice: '',
    finalPrice: '',
    // questions: [],
  },
}) => {
  // const {
  //   title,
  //   description,
  //   responseTime,
  //   responseTimeIn,
  //   listedPrice,
  //   finalPrice,
  // } = initial

  const initialState = {
    title: '',
    description: '',
    responseTime: '',
    responseTimeIn: '',
    listedPrice: '',
    finalPrice: '',
    // questions: [],
  }
  const items = ['Text', 'Upload (Pdf,jpeg)']
  const [questionType, setQuestionType] = useState(items[0])
  const [state, setState] = useState(initialState)
  const [question, setQuestion] = useState('')
  const [questions, setQuestions] = useState([])
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value)
  }
  console.log('textquery-', textQuery)
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
        initialValues={{ ...textQuery }}
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
                        Title
                      </label>

                      <div className="flex flex-wrap items-start w-auto  mr-4 md:mr-1 lg:mr-1 relative">
                        <TextField
                          type="text"
                          name="title"
                          onChangeValue={handleChange}
                          value={values.title}
                          id="url"
                          placeholder="Resume review"
                          textStyleOverride={{
                            marginBottom: 0,
                            paddingLeft: 0,
                            width: '100%',
                          }}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div className="px-2">
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

                    <div className="flex flex-col font-normal md:flex-row lg:flex-row">
                      <div className="px-2 text-sm w-full">
                        <label className="leading-8 text-lg font-normal mt-5">
                          Promising response time
                        </label>
                        <div className="flex items-center flex-wrap w-auto mr-4 md:mr-1 lg:mr-1 relative">
                          <TextField
                            type="number"
                            min="0"
                            textStyleOverride={{ width: '80%' }}
                            value={values.responseTime}
                            onChangeValue={handleChange}
                            name="responseTime"
                            id="lname"
                            widthPartial
                            className=""
                          />
                          <select
                            className="absolute px-3 py-3 top-1  text-lg right-1 bg-gray-50"
                            value="values.responseTimeIn"
                            name="responseTimeIn"
                            onChange={handleChange}
                          >
                            <option value="day">Days</option>
                            <option value="month">Months</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col font-normal mb-10 md:flex-row lg:flex-row">
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
                  </div>
                </div>
                <div className="bg-white basis-2/5"></div>
              </div>
              <div className="w-full h-px bg-gray-200 border-0"></div>
              <div className="flex flex-col-reverse md:flex-row lg:flex-row">
                <div className="bg-white basis-3/5 ">
                  <span className="text-xl font-semibold px-4 ">
                    Additional question
                  </span>
                  <div className="m-3 p-2 flex justify-start rounded-xl border-2 w-auto mr-6 md:mr-1 lg:mr-1">
                    <img
                      className=" w-4 h-4 "
                      src="/assets/icon/exclamationmarkcircle.png"
                    />
                    <span className="text-sm text-gray-400 px-3">
                      You can collect links to resume, Linkedin or ask any
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
                    <div className="bg-gray-50 text-base">
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
                        placeholder="Enter URL here"
                        textStyleOverride={{}}
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
              <AutoSubmitToken setValues={setValues} questions={questions} />
            </form>
          )
        }}
      </Formik>
    </>
  )
}

export default TextQuery
