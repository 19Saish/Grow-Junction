import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { API, Auth } from 'aws-amplify'
import TextField from '../../../../../pages/ui-kit/TextField'
import services from '../../../../../pages/services'
import classes from './OneOnOne.module.css'
import { toast } from 'react-toastify'
import {
  deleteOneOnOne,
  updateOneOnOne,
} from '../../../../../src/graphql/mutations'
import AddOneOnOne from '../../Add/Content/OneOnOne'
import { getOneOnOne } from '../../../../../src/graphql/queries'
import { getLoggedinUserEmail } from '../../../../../utilities/user'

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

  useEffect(() => {
    setResults(services)
  }, [services])

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

  const editPost = async (id) => {
    debugger
    console.log('id', id)
    try {
      // const usr = await Auth.currentAuthenticatedUser()
      const usrname = getLoggedinUserEmail()
      const { createdAt, updatedAt, owner, ...rest } = oneOnOne
      rest.username = usrname
      await API.graphql({
        query: updateOneOnOne,
        variables: { input: { ...rest } },
      })
      toast.success('OneOnOne update successfully')
      setTimeout(() => {
        window.location.href = window.location.href
      }, 2000)
    } catch (error) {
      toast.error(`Update Error:${error.errors[0].message}`)
    }
  }

  const deletePost = async (id) => {
    debugger
    console.log('id', id)
    try {
      // const usr = await Auth.currentAuthenticatedUser()
      const usrname = getLoggedinUserEmail()
      console.log('usr', usr)
      await API.graphql({
        query: deleteOneOnOne,
        variables: { input: { id } },
        username: usrname,
      })
      toast.success('Profile deleted successfully')
      window.location.href = window.location.href
    } catch (error) {
      toast.error(`Delete Error:${error.errors[0].message}`)
    }
  }
  return (
    <>
      <div className="py-5 relative items-center flex-col md:flex-row md:flex md:justify-between">
        <TextField
          ref={searchRef}
          // value={values.listedPrice}
          onChangeValue={() => {}}
          placeholder=""
          name="listedPrice"
          type="text"
          style={{ marginBottom: 0 }}
          // classOverride="w-5/6"
        />
        <img
          src="/assets/icon/mentor-dashboard/search.svg"
          className="absolute md:right-44 cursor-pointer top-10"
          onClick={searchClick}
        />
        <button className="text-lg py-2 block mx-auto mt-5 md:mt-0 rounded-md text-white px-5 bg-gray-800">
          <Link href="/mentor/services/add">Add Service</Link>
        </button>
      </div>
      {results.length > 0 ? (
        <div className="my-3 bg-white p-10  ">
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

                      <div>
                        <div className="group relative text-base">
                          <button className="py-4 px-4 rounded inline-flex items-center group">
                            <img
                              src="../../../assets/icon/menu.png"
                              alt=""
                              className=""
                            ></img>
                          </button>

                          {/* menu list */}
                          <ul className="rounded absolute hidden text-black group-hover:block w-30 border-2 border-gray-50 shadow-md">
                            <li
                              className="bg-white hover:bg-gray-300 py-4 px-2 cursor-pointer border-b-2 border-gray-300 text-left"
                              onClick={() => findPost(item.id)}
                            >
                              Reschedule
                            </li>
                            <li
                              className="bg-white hover:bg-gray-300 py-4 px-2 cursor-pointer text-left"
                              onClick={() => deletePost(item.id)}
                            >
                              Delete
                            </li>
                          </ul>
                        </div>
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
        <div
          className="bg-white py-5 px-5 w-full rounded-md text-2xl text-center cursor-pointer"
          onClick={searchClick}
        >
          No One on One Sessions found
        </div>
      )}

      {showReschedule && (
        <>
          <div className="flex justify-center items-center bg-gray-600 bg-opacity-50 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" bg-white text-start mt-9 rounded-2xl shadow-lg w-full md:w-3/5">
              <div className="flex sticky top-0 justify-between px-8 py-4 border-b border-gray-300">
                <div className="text-sm font-semibold mt-4">1 on 1 Session</div>
                <div>
                  <button
                    className=""
                    type="button"
                    onClick={() => setShowReschedule(false)}
                  >
                    <img
                      src="../../../assets/icon/cross.png"
                      alt=""
                      className="w-4 h-4 mr-2"
                    ></img>
                  </button>
                </div>
              </div>
              <AddOneOnOne oneOnOne={state.oneOnOne} setValues={setValues} />
              <div className="py-4 px-6 border-t border-gray-300 text-gray-600 mb-0">
                <div className="flex justify-between item-center w-auto">
                  <button
                    className="flex justify-center items-center bg-white border-2 border-gray-900 hover:border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 w-1/2 rounded-md mr-5"
                    type="button"
                    onClick={() => setShowReschedule(false)}
                  >
                    <span className="text-sm font-semibold py-2">Cancel</span>
                  </button>

                  <button
                    className="flex justify-center items-center bg-white border-2 border-gray-900 hover:border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 w-1/2 rounded-md"
                    type="button"
                    onClick={() => editPost(id)}
                  >
                    <span className="text-sm font-semibold py-2">Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default OneOnOne
