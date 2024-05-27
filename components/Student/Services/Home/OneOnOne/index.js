import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { API, Auth } from 'aws-amplify'
import TextField from '../../../../../pages/ui-kit/TextField'
import services from '../../../../../pages/services'
import classes from './OneOnOne.module.css'
import { toast } from 'react-toastify'
import { getOneOnOne } from '../../../../../src/graphql/queries'
import { getLoggedinUserEmail } from '../../../../../utilities/user'
import { listOneOnOnes } from '/src/graphql/queries'

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

const OneOnOne = ({ services }) => {
  const searchRef = useRef()
  const [results, setResults] = useState(services)
  const [showReschedule, setShowReschedule] = useState(false)
  const [oneOnOne, setoneOnOne] = useState({})
  const [id, setId] = useState()
  const [state, setState] = useState({})

  const setValues = (values) => {
    setoneOnOne(values)
    console.log('values - ', values)
  }

  console.log('OneOnOne - ', oneOnOne)

  // useEffect(() => {
  //   setResults(services)
  // }, [services])

  useEffect(() => {
    loadOneOnOne()
  }, [])

  const searchClick = () => {
    const filtered = services.filter((i) =>
      i.sessionTitle
        .toLowerCase()
        .includes(searchRef.current.value.toLowerCase()),
    )
    setResults(filtered)
    searchRef.current.value = ''
  }

  const findPost = async (id) => {
    debugger
    console.log('id - ', id)
    setId(id)
    try {
      // const usr = await Auth.currentAuthenticatedUser()
      // console.log('usr', usr)
      const usrname = getLoggedinUserEmail()
      const oneOnOneResult = await API.graphql({
        query: getOneOnOne,
        variables: { id },
        username: usrname,
      })
      if (oneOnOneResult.data.getOneOnOne.id !== null) {
        setState({ ...state, oneOnOne: oneOnOneResult.data.getOneOnOne })
      }
      console.log('getOneonOne - ', oneOnOneResult.data.getOneOnOne)
      console.log('state - ', JSON.stringify(state))
      setShowReschedule(true)
    } catch (error) {
      toast.error(`Get Error:${error.errors[0].message}`)
    }
  }

  const loadOneOnOne = async () => {
    try {
      debugger
      setLoading(true)

      const usrname = getLoggedinUserEmail()
      const results = await API.graphql(
        graphqlOperation(listOneOnOnes, {
          filter: { username: { contains: usrname } },
        }),
      )
      debugger
      if (results.data.listOneOnOnes.items.length > 0) {
        setResults(results.data.listOneOnOnes.items)
        // dispatch({
        //   type: 'ONE_ON_ONE',
        //   payload: results.data.listOneOnOnes.items,
        // })
        // // setServices((prev) => ({
        // //   ...prev,
        // //   oneOnOne: results.data.listOneOnOnes.items,
        // // }))
      }
    } catch (error) {
      toast.error(`Load Error:${error.errors[0].message}`)
    }
    setLoading(false)
  }

  return (
    <>
      {results.length > 0 ? (
        <div className="my-3 bg-white p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0">
            {results.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-center align-center mb-10  "
                >
                  <div
                    className={` bg-white text-center border border-b-2 rounded-2xl shadow-lg m-4 w-full md:w-5/6 lg:w-5/6 ${classes.itemContainer}`}
                  >
                    <div className="flex justify-between py-6 px-6 border-b border-gray-300">
                      <div className="flex justify-between p-2">
                        <img
                          src="../../../assets/icon/clock.png"
                          alt=""
                          className="w-3 h-3 mt-2"
                        ></img>
                        <span className="text-base font-normal md:text-xl lg:text-xl ml-2">
                          1 on 1 mock interview
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-start text-black text-2xl font-semibold p-6">
                        {item.sessionTitle}
                      </div>
                      <div className="flex justify-start text-black text-lg font-semibold p-6">
                        {item.description}
                      </div>
                      <div className="flex justify-start text-black text-xl font-normal px-6 mb-10"></div>
                    </div>
                    <div className="py-4 px-6 border-t border-gray-300 text-gray-600 md:flex-row flex-col flex md:justify-between items-center">
                      {/* <div className="flex justify-end"> */}
                      <div className="flex">
                        {/* <button
                          className="flex justify-center items-center bg-white border-2 border-gray-900 hover:border-amber-400 hover:bg-amber-400 hover:text-white text-black  rounded-full mr-5 w-full md:w-1/4 lg:w-1/4"
                          type="button"
                        > */}
                        <div className="flex items-center py-1 px-3 border-2 mr-5 border-black rounded-full min-w-[20%]">
                          <img
                            src="/assets/icon/mentor-dashboard/clock-two.svg"
                            className="h-5 mr-5"
                          />
                          <span className="text-sm font-semibold py-3">
                            {item.sessionDuration} {item.sessionDurationIn}
                          </span>
                        </div>

                        {/* </button> */}

                        {/* <button
                          className="flex justify-center items-center bg-black hover:bg-amber-400 text-white rounded-full mr-5 w-full md:w-1/4 lg:w-1/4"
                          type="button"
                        > */}
                        <div className="flex items-center  py-1 px-4 border-2 border-black rounded-full min-w-[20%]">
                          <img
                            src="/assets/icon/mentor-dashboard/price.svg"
                            className="h-5 mr-5"
                          />
                          <span className="text-sm font-semibold py-3">
                            ₹
                            {item.listedPrice === item.finalPrice ? (
                              item.finalPrice
                            ) : (
                              <>
                                <span className="  text-red-800 bold">
                                  <s className="bold">{item.listedPrice}</s>
                                </span>{' '}
                                <span className="bold">{item.finalPrice}</span>
                              </>
                            )}
                          </span>
                        </div>
                        {/* </button> */}
                      </div>
                      <div className="flex items-center bg-black text-white py-1 px-3 border-2 mr-5 border-white rounded-full justify-center w-[25%] md:w-auto">
                        <img
                          src="/assets/icon/mentor-dashboard/link.svg"
                          className="h-5 mr-5"
                        />
                        <span className="text-sm font-semibold py-3">
                          Copy link
                        </span>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* outer */}
        </div>
      ) : (
        <div className="bg-white py-5 px-5 w-full rounded-md text-2xl text-center cursor-pointer">
          No One on One sessions found
        </div>
      )}
    </>
  )
}

export default OneOnOne
