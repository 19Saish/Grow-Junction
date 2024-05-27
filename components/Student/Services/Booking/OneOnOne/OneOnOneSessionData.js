import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { getOneOnOne } from '../../../../../src/graphql/queries'
import { Formik } from 'formik'
const OneOnOneSessionData = ({
  // OneOnOneId
  oneOnOneService,
  closeBookSession4,
  backtoBookSession3,
  handleBookSession5,
}) => {
  const [questions, setQuestions] = useState(oneOnOneService?.questions)
  const [answers, setAnswers] = useState(oneOnOneService?.questions || [])
  const handleFileChange = (id, e) => {
    const prevAnswers = [...answers]
    const foundAnswer = prevAnswers.find((a) => a.id === id)
    if (foundAnswer) {
      foundAnswer.file = e.target.files[0]
    }
    setAnswers(prevAnswers)
  }
  const handleChange = (id, e) => {
    const prevAnswers = [...answers]
    const foundAnswer = prevAnswers.find((a) => a.id === id)
    if (foundAnswer) {
      foundAnswer.answer = e.target.value
    }
    setAnswers(prevAnswers)
  }
  useEffect(() => {
    // const getOneOnOneData = async () => {
    //   try {
    //     const results = await API.graphql({
    //       query: getOneOnOne,
    //       variables: { id: OneOnOneId },
    //     })
    //     if (results.data.getOneOnOne.id !== null) {
    //       setQuestions(results.data.getOneOnOne.questions)
    //     }
    //   } catch (error) {}
    // }
    // getOneOnOneData()
    setQuestions(oneOnOneService?.questions)
    setAnswers(oneOnOneService?.questions)
  }, [oneOnOneService?.questions])
  console.log('questions', questions)
  return (
    <form>
      <div className="flex justify-center items-center bg-gray-600 bg-opacity-50 overflow-x-hidden overflow-y-auto fixed inset-0 z-100 outline-none focus:outline-none ">
        <div
          className={`flex flex-col ${
            questions.length > 0 ? 'justify-between' : 'justify-between'
          } bg-white text-center mt-9 rounded-2xl shadow-lg w-full md:w-2/5 lg:w-2/5 min-h-[50vh]`}
        >
          {questions.length > 0 ? (
            <>
              <div className="flex justify-between px-8 pb-4 border-b border-gray-300 bg-slate-100 ">
                <div className="flex flex-col justify-start items-start border=b-2">
                  <span className="text-2xl font-semibold mt-3">
                    Answer to Mentor questions
                  </span>
                </div>

                <div>
                  <button
                    className=""
                    type="button"
                    onClick={() => closeBookSession4()}
                  >
                    <img
                      src="../../../assets/icon/cross.png"
                      alt=""
                      className="w-4 h-4 mr-2 mt-5"
                    ></img>
                  </button>
                </div>
              </div>
              <div>
                <div className=" flex flex-col items-center justify-start">
                  <span className="text-lg font-semibold mb-2 text-red-600 italic">
                    Please answer the mandatory questions marked with * for an
                    effective session
                  </span>

                  {questions.map((question) => {
                    return question.type.includes('Upload') ? (
                      <div className="w-4/5 px-2 ">
                        <label>
                          <div className="text-lg text-bold p-2 text-left">
                            {question?.text}{' '}
                            {question.required && (
                              <span className="text-red-600 text-lg bold">
                                {' '}
                                *
                              </span>
                            )}
                          </div>
                          <input
                            type="file"
                            onChange={(e) => handleFileChange(question.id, e)}
                            className="w-full border-2 text-lg text-bold p-2"
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="w-4/5 px-2">
                        <div className="text-lg text-bold p-2 text-left">
                          {question?.text}
                          {question.required && (
                            <span className="text-red-600 text-lg bold">
                              {' '}
                              *
                            </span>
                          )}
                        </div>
                        <textarea
                          className="w-full text-lg border-2 p-2 h-[5rem]"
                          onChange={(e) => handleChange(question.id, e)}
                        ></textarea>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          ):<div>
            <span className="text-2xl font-semibold mt-3">
                    Mentor questions
                  </span>
            </div>}

          <div className="flex justify-evenly items-end w-full">
            <div className="py-4 px-6 border-t border-gray-300 w-full">
              <div className="flex justify-center items-center w-full">
                <button
                  className="flex justify-center items-center text-base bg-white hover:bg-gray-900 text-black hover:text-white font-bold py-2 border border-black w-full rounded-md"
                  onClick={() => backtoBookSession3()}
                >
                  <span className="text-base font-semibold py-1">Back</span>
                </button>
              </div>
            </div>

            <div className="py-4 px-6 border-t border-gray-300 w-full">
              <div className="flex justify-center items-center w-full">
                <button
                  type="submit"
                  className="flex justify-center items-center text-base bg-white hover:bg-gray-900 text-black hover:text-white font-bold py-2 border border-black w-full rounded-md"
                  onClick={(e) => {
                    e.preventDefault()
                    handleBookSession5(answers)
                  }}
                >
                  <span className="text-base font-semibold py-1">
                    Schedule booking
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default OneOnOneSessionData
