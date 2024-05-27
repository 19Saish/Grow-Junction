import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { API, Auth, graphqlOperation, Storage } from 'aws-amplify'
import TextField from '../../../../../pages/ui-kit/TextField'
//import services from '../../../../../pages/services'
import classes from './Packages.module.css'
import { toast } from 'react-toastify'
import { getPackages } from '../../../../../src/graphql/queries'
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

const Packages = ({ services }) => {
  const searchRef = useRef()
  const [results, setResults] = useState(services)
  const [showReschedule, setShowReschedule] = useState(false)
  const [packages, setPackages] = useState({})
  const [id, setId] = useState()
  const [state, setState] = useState({})
  useEffect(() => {
    setResults(services)
  }, [services])
  const setValues = (values) => {
    setPackages(values)
    console.log('values - ', values)
  }
  debugger
  console.log('packages - ', packages)

  const searchClick = () => {
    const filtered = services.filter((i) =>
      i.title.toLowerCase().includes(searchRef.current.value.toLowerCase()),
    )
    setResults(filtered)
    searchRef.current.value = ''
  }

  const findPost = async (id) => {
    debugger
    console.log('id', id)
    setId(id)
    try {
      // const usr = await Auth.currentAuthenticatedUser()
      // console.log('usr', usr)
      const usrname = getLoggedinUserEmail()
      const packagesResult = await API.graphql({
        query: getPackages,
        variables: { id },
        username: usrname,
      })
      if (packagesResult.data.getPackages.id !== null) {
        setState({ ...state, packages: packagesResult.data.getPackages })
      }
      console.log(packagesResult.data.getPackages)
      console.log('idResult - ', JSON.stringify(state))
      setShowReschedule(true)
    } catch (error) {
      toast.error(`Get Error:${error.errors[0].message}`)
    }
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
                          Packages
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
                        {item.packageTitle}
                      </div>
                      <div className="flex justify-start text-black text-lg font-semibold p-6">
                        {item.description}
                      </div>
                      <div className="flex justify-start text-black text-xl font-normal px-6 mb-10"></div>
                    </div>
                    <div className="py-4 px-6 border-t border-gray-300 text-gray-600 md:flex-row flex-col flex md:justify-between items-center">
                      {/* <div className="flex justify-end"> */}
                      <div className="flex">
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
          No packages found
        </div>
      )}
    </>
  )
}

export default Packages
