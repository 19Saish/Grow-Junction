import React, { useState, useEffect, useReducer } from 'react'
import classes from './Home.module.css'
import { toast } from 'react-toastify'
// import { useRouter } from 'next/router'
import OneOnOne from './OneOnOne'
import TextQuery from './TextQuery'
import Workshop from './Workshop'
import Courses from './Courses'
import Packages from './Packages'
import Link from 'next/link'
// import { useDispatch } from 'react-redux'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { listOneOnOnes } from '/src/graphql/queries'
import { listTextQueries } from '/src/graphql/queries'
import { listWorkshops } from '/src/graphql/queries'
import { listCourses } from '/src/graphql/queries'
import { listPackages } from '/src/graphql/queries'
import { getLoggedinUserEmail } from '../../../../utilities/user'
import ACTION_KEYS from '../../../../constants/action-keys'
const reducerFunction = (
  state = {
    oneOnOne: [],
    workshop: [],
    courses: [],
    textQuery: [],
    packages: [],
  },
  action,
) => {
  switch (action.type) {
    case 'ONE_ON_ONE':
      return { ...state, oneOnOne: action.payload }
    case 'WORKSHOP':
      return { ...state, workshop: action.payload }
    case 'COURSES':
      return { ...state, courses: action.payload }
    case 'TEXT_QUERY':
      debugger
      return { ...state, textQuery: action.payload }
    case 'PACKAGES':
      return { ...state, packages: action.payload }
    default:
      return state
  }
}
const Home = () => {
  // return <div>Hi</div>
  // const router= useRouter()
  // const dispatchRedux = useDispatch()
  const [state, dispatch] = useReducer(reducerFunction)
  const checkIfItems = () => {
    if (state) {
      const keys = Object.keys(state)
      let itemsExist = false
      keys.forEach((key) => {
        if (state[key].length > 0) {
          itemsExist = true
          return
        }
      })
      return itemsExist
    }
  }

  const [openTab, setOpenTab] = useState(1)
  const [loading, setLoading] = useState(true)
  // const [services, setServices] = useState({
  //   oneOnOne: [],
  //   workshop: [],
  //   courses: [],
  //   textQuery: [],
  //   packages: [],
  // })
  const loadOneOnOne = async () => {
    try {
      setLoading(true)
      // const usr = await Auth.currentAuthenticatedUser()
      // console.log('usr', usr)
      const usrname = getLoggedinUserEmail()
      const results = await API.graphql(
        graphqlOperation(listOneOnOnes, {
          filter: { username: { contains: usrname } },
        }),
      )
      if (results.data.listOneOnOnes.items.length > 0) {
        dispatch({
          type: ACTION_KEYS.ONE_ON_ONE,
          payload: results.data.listOneOnOnes.items,
        })
        // dispatchRedux({
        //   type: ACTION_KEYS.ONE_ON_ONE,
        //   payload: results.data.listOneOnOnes.items,
        // })
        // setServices((prev) => ({
        //   ...prev,
        //   oneOnOne: results.data.listOneOnOnes.items,
        // }))
      }
    } catch (error) {
      // toast.error(`Load Error:${error.errors[0].message}`)
    }
    setLoading(false)
  }

  const loadWorkshop = async () => {
    debugger
    try {
      setLoading(true)
      try {
        const usr = await Auth.currentAuthenticatedUser()
        console.log('usr', usr)
      } catch (error) {}
      debugger
      const usrname = getLoggedinUserEmail()
      const results = await API.graphql(
        graphqlOperation(listWorkshops, {
          filter: { username: { contains: usrname } },
        }),
      )
      if (results.data.listWorkshops.items.length > 0) {
        dispatch({
          type: ACTION_KEYS.WORKSHOP,
          payload: results.data.listWorkshops.items,
        })
        // dispatchRedux({
        //   type: ACTION_KEYS.WORKSHOP,
        //   payload: results.data.listWorkshops.items,
        // })
        // setServices((prev) => ({
        //   ...prev,
        //   workshop: results.data.listWorkshops.items,
        // }))
      }
    } catch (error) {
      toast.error(`Load Error:${error.errors[0].message}`)
    }
    setLoading(false)
  }

  const loadCourses = async () => {
    debugger
    try {
      setLoading(true)
      // const usr = await Auth.currentAuthenticatedUser()
      // console.log('usr', usr)
      const usrname = getLoggedinUserEmail()
      const results = await API.graphql(
        graphqlOperation(listCourses, {
          filter: { username: { contains: usrname } },
        }),
      )
      if (results.data.listCourses.items.length > 0) {
        dispatch({
          type: ACTION_KEYS.COURSES,
          payload: results.data.listCourses.items,
        })
        // dispatchRedux({
        //   type: ACTION_KEYS.COURSES,
        //   payload: results.data.listCourses.items,
        // })
        // setServices((prev) => ({
        //   ...prev,
        //   courses: results.data.listCourses.items,
        // }))
      }
    } catch (error) {
      toast.error(`Load Error:${error.errors[0].message}`)
    }
    setLoading(false)
  }

  const loadTextQuery = async () => {
    try {
      setLoading(true)
      // const usr = await Auth.currentAuthenticatedUser()
      // console.log('usr', usr)
      const usrname = getLoggedinUserEmail()
      const results = await API.graphql(
        graphqlOperation(listTextQueries, {
          filter: { username: { contains: usrname } },
        }),
      )
      debugger
      if (results.data.listTextQueries.items.length > 0) {
        dispatch({
          type: ACTION_KEYS.TEXT_QUERY,
          payload: results.data.listTextQueries.items,
        })
        // dispatchRedux({
        //   type: ACTION_KEYS.TEXT_QUERY,
        //   payload: results.data.listTextQueries.items,
        // })
        // setServices((prev) => ({
        //   ...prev,
        //   textQuery: results.data.listTextQueries.items,
        // }))
      }
    } catch (error) {
      // toast.error(`Load Error:${error.errors[0].message}`)
    }
    setLoading(false)
  }

  const loadPackages = async () => {
    debugger
    try {
      setLoading(true)
      // const usr = await Auth.currentAuthenticatedUser()
      // console.log('usr', usr)
      const usrname = getLoggedinUserEmail()
      const results = await API.graphql(
        graphqlOperation(listPackages, {
          filter: { username: { contains: usrname } },
        }),
      )
      if (results.data.listPackages.items.length > 0) {
        dispatch({
          type: ACTION_KEYS.PACKAGES,
          payload: results.data.listPackages.items,
        })
        // dispatchRedux({
        //   type: ACTION_KEYS.PACKAGES,
        //   payload: results.data.listPackages.items,
        // })
        // setServices((prev) => ({
        //   ...prev,
        //   packages: results.data.listPackages.items,
        // }))
      }
    } catch (error) {
      toast.error(`Load Error:${error.errors[0].message}`)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadOneOnOne()
    loadTextQuery()
    loadWorkshop()
    loadCourses()
    loadPackages()
  }, [])
  if (loading) return null
  if (checkIfItems()) {
    return (
      <div>
        {' '}
        <div className="flex flex-row w-full">
          <div className="w-full">
            <div className="bg-grey-50">
              <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
                <li className="mr-2">
                  <a
                    href="#"
                    className={
                      openTab === 1
                        ? 'inline-block p-4 text-xl text-white bg-amber-400 rounded-t-lg active'
                        : 'inline-block p-4 text-xl text-black rounded-t-lg hover:text-white hover:bg-amber-400'
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      setOpenTab(1)
                    }}
                  >
                    1 on 1 Session
                  </a>
                </li>
                <li className="mr-2">
                  <a
                    href="#"
                    className={
                      openTab === 2
                        ? 'inline-block p-4 text-xl text-white bg-amber-400 rounded-t-lg active'
                        : 'inline-block p-4 text-xl text-black rounded-t-lg hover:text-white hover:bg-amber-400'
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      setOpenTab(2)
                    }}
                  >
                    Workshop
                  </a>
                </li>
                <li className="mr-2">
                  <a
                    href="#"
                    className={
                      openTab === 3
                        ? 'inline-block p-4 text-xl text-white bg-amber-400 rounded-t-lg active'
                        : 'inline-block p-4 text-xl text-black rounded-t-lg hover:text-white hover:bg-amber-400'
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      setOpenTab(3)
                    }}
                  >
                    Courses
                  </a>
                </li>
                <li className="mr-2">
                  <a
                    href="#"
                    className={
                      openTab === 4
                        ? 'inline-block p-4 text-xl text-white bg-amber-400 rounded-t-lg active'
                        : 'inline-block p-4 text-xl text-black rounded-t-lg hover:text-white hover:bg-amber-400'
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      setOpenTab(4)
                    }}
                  >
                    Text query
                  </a>
                </li>
                <li className="mr-2">
                  <a
                    href="#"
                    className={
                      openTab === 5
                        ? 'inline-block p-4 text-xl text-white bg-amber-400 rounded-t-lg active'
                        : 'inline-block p-4 text-xl text-black rounded-t-lg hover:text-white hover:bg-amber-400'
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      setOpenTab(5)
                    }}
                  >
                    Packages
                  </a>
                </li>
              </ul>
              <div className={openTab === 1 ? 'block' : 'hidden'}>
                <OneOnOne services={state.oneOnOne} />
              </div>
              <div className={openTab === 2 ? 'block' : 'hidden'}>
                <Workshop services={state.workshop} />
              </div>
              <div className={openTab === 3 ? 'block' : 'hidden'}>
                <Courses services={state.courses} />
              </div>
              <div className={openTab === 4 ? 'block' : 'hidden'}>
                <TextQuery services={state.textQuery} />
              </div>
              <div className={openTab === 5 ? 'block' : 'hidden'}>
                <Packages services={state.packages} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <section
        className={`flex flex-col min-h-screen items-center justify-center`}
      >
        <div className="hidden md:flex justify-center items-center ">
          <section
            className={`${classes.container} p-6 flex flex-col justify-center`}
          >
            <section className="flex flex-col md:flex-row">
              <article className="leading-loose px-7 w-3/4  order-2 md:order-1 mx-auto md:mx-0 mb-20 md:mb-10">
                <h2 className="text-4xl mb-6">
                  Launch your 1 on 1 sessions, workshops, courses and
                </h2>
                <h2 className="text-4xl mb-6">Text query services</h2>

                <p className="text-xl">
                  Monetise your knowledge and help students in need at same time
                </p>
              </article>
              <div className="h-52 w-1/4 order-1 md:order-2 mb-32 mx-auto md:mx-0  md:mb-0">
                <img
                  className=" object-cover"
                  src="/assets/icon/mentor-dashboard/article-image.png"
                  alt=""
                />
              </div>
            </section>
            <section className="md:px-16 flex justify-center md:justify-start">
              <div>
                <Link href={'services/add'}>
                  <span
                    className={`${classes['left-button']} text-lg mr-6`}
                    onClick={(e) => {}}
                  >
                    Start adding services
                  </span>
                </Link>
              </div>
            </section>
          </section>
        </div>
        <div className="lock md:hidden">
          <section className={`p-6 flex flex-col justify-between`}>
            <section className="flex flex-col md:flex-row">
              <article className=" order-2 md:order-1 mx-auto md:mx-0 mb-16 md:mb-0">
                <h2 className="text-4xl mb-6">
                  Launch your 1 on 1 sessions, workshops, courses and
                </h2>
                <h2 className="text-4xl mb-6">Text query services</h2>

                <p className="text-xl">
                  Monetise your knowledge and help students in need at same time
                </p>
              </article>
              <div className="h-52  order-1 md:order-2 mb-32 mx-auto md:mx-0  md:mb-0">
                <img
                  className=" object-cover"
                  src="/assets/icon/mentor-dashboard/article-image.png"
                  alt=""
                />
              </div>
            </section>
            <section className="md:px-16 flex justify-center">
              <div className="flex flex-col items-center">
                <Link href={'/services/add'}>
                  <span className={`${classes['left-button']} text-lg mr-6`}>
                    Start adding services
                  </span>
                </Link>
              </div>
            </section>
          </section>
        </div>
      </section>
    </>
  )
}

export default Home
