import React, { useState, useEffect } from 'react'
import { slice } from 'lodash'
import classes from './Preview.module.css'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import OneOnOne from '../../Student/Services/Booking/OneOnOne'
import {
  listMentorRegisters,
  listUserInfos,
  listOneOnOnes,
  listTextQueries,
  listWorkshops,
  listCourses,
  listPackages,
  // listDemoSkillsLists
} from '../../../src/graphql/queries'
import { getLoggedinUserEmail } from '../../../utilities/user'
import { getS3FileUrl } from '../../../utilities/others'
const Preview = ({ showServices, mentor }) => {
  const [preImage, setPreImage] = useState('')
  const [firstName, setFirstName] = useState(mentor?.about_yourself?.first_name)
  const [lastName, setLastName] = useState(mentor?.about_yourself?.last_name)
  const [url, setUrl] = useState(mentor?.about_yourself?.grow_junction_url)
  const [linkedin_url, setfacebook_url] = useState(mentor?.social?.linkedin_url)
  const [facebook_url, setLinkedin_url] = useState(mentor?.social?.facebook_url)
  const [domainNames, setDomainNames] = useState([])
  const [showBooking, setShowBooking] = useState(false)
  const [component, setComponent] = useState(null)
  const [instagram_url, setInstagram_url] = useState(
    mentor?.social?.instagram_url,
  )
  // let component = null
  const serviceClicked = (service) => {
    debugger
    switch (service.text) {
      case '1 on 1 Session':
        setComponent(
          <div className="relative w-[100vw] h-[100vh] ">
            <div className="absoloute left-0 top-0 right-0 bottom-0 bg-gray-700 z-0"></div>
            <OneOnOne
              className=""
              setShow={setShowBooking}
              oneOnOneService={service?.service}
              show={true}
            />
          </div>,
        )
    }
    setShowBooking(true)
  }
  const [shortDescription, setShortDescription] = useState(
    mentor?.about_yourself?.short_description,
  )
  const [aboutYourself, setAboutYourself] = useState(
    mentor?.about_yourself?.about_yourself,
  )
  const [occupation, setOccupation] = useState(
    mentor?.Professionalinfo?.occupation,
  )
  const [organisation, setOrganisation] = useState(
    mentor?.Professionalinfo?.organization,
  )
  const [linkedin, setLinkedin] = useState()
  const [instagram, setInstagram] = useState()
  const [personalurl, setPersonalurl] = useState()
  const [sessionResults, setSessionResults] = useState([])
  const [workshopResults, setWorkshopResults] = useState([])
  const [textQueryResults, setTextQueryResults] = useState([])
  const [initialPosts, setInitialPosts] = useState([])
  const [coursesResults, setCoursesResults] = useState([])
  const [totalServiceResults, setTotalServiceResults] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [index, setIndex] = useState(4)
  useEffect(() => {
    console.log('initialPosts', initialPosts)
    setInitialPosts(slice(totalServiceResults, 0, index))
  }, [totalServiceResults, index])
  // const initialPosts = slice(totalServiceResults, 0, index)

  const loadMore = () => {
    setIndex(index + 4)
    console.log(index)
    if (index >= totalServiceResults.length) {
      setIsCompleted(true)
    } else {
      setIsCompleted(false)
    }
  }

  const usrName = mentor ? mentor.username : getLoggedinUserEmail()
  const getUser = async () => {
    // debugger
    //const usrName = getLoggedinUserEmail()
    console.log('username - ', usrName)
    const results = await API.graphql(
      graphqlOperation(listMentorRegisters, {
        filter: { username: { contains: mentor ? mentor.username : usrName } },
      }),
    )
    if (results.data.listMentorRegisters.items.length > 0) {
      const data = { ...results.data.listMentorRegisters.items[0] }
      let where = ``
      data.domain_id.forEach((i, index) => {
        if (index == data.domain_id.length - 1) {
          where += `{id: {eq: "${i}"}}`
        } else {
          where += `{id: {eq: "${i}"}},`
        }
      })
      debugger
      const listDomains = `query MyQuery {
        listDemoSkillsLists(filter: {or: [
          ${where}
        ]}) 
          {
          nextToken
          items {
            value
          }
        }
      }`
      try {
        const results = await API.graphql(graphqlOperation(listDomains))
        debugger
        if (results.data.listDemoSkillsLists.items.length > 0) {
          setDomainNames(
            results.data.listDemoSkillsLists.items.map((i) => i.value),
          )
        }
      } catch (error) {
        debugger
        console.log('error', error)
      }
      if (data.profile_image) {
        try {
          // const img = await Storage.get(data.profile_image)
          const img = await getS3FileUrl(data.profile_image)
          console.log('image - ', img)
          setPreImage(img)
        } catch (errSt) {
          console.log(errSt)
        }
      }
      // debugger
      setFirstName(data.about_yourself?.first_name)
      setLastName(data.about_yourself?.last_name)
      setShortDescription(data.about_yourself?.short_description)
      setAboutYourself(data.about_yourself?.about_yourself)
      setOccupation(data.Professionalinfo?.occupation)
      setOrganisation(data.Professionalinfo?.organization)
      setLinkedin(data.SocialUrl?.linkedin_url)
      setInstagram(data.SocialUrl?.instagram_url)
      setPersonalurl(data.SocialUrl?.personal_web_url)
      setUrl(data.about_yourself?.grow_junction_url || '')
      setLinkedin_url(data.social?.linkedin_url || '')
      setfacebook_url(data.social?.facebook_url || '')
      setInstagram_url(data.social?.instagram_url || '')
    } else {
      const results = await API.graphql(
        graphqlOperation(listUserInfos, {
          filter: {
            username: { contains: mentor ? mentor.username : usrName },
          },
        }),
      )
      if (results.data.listUserInfos.items.length > 0) {
        // debugger
        const data = { ...results.data.listUserInfos.items[0] }
        if (data.profile_image) {
          // const img = await Storage.get(data.profile_image)
          setPreImage(data.profile_image)
        }
      }
    }
  }

  const loadOneOnOne = async () => {
    // debugger
    try {
      const results = await API.graphql(
        graphqlOperation(listOneOnOnes, {
          filter: { username: { contains: usrName } },
        }),
      )
      // debugger
      if (results.data.listOneOnOnes.items.length > 0) {
        setSessionResults(results.data.listOneOnOnes.items)
        setTotalServiceResults((prev) => {
          return [
            ...prev,
            ...results.data.listOneOnOnes.items
              .map((s, idx) => {
                if (
                  !prev.some(
                    (p) =>
                      p.text === '1 on 1 Session' && p.title === s.sessionTitle,
                  )
                )
                  return {
                    text: '1 on 1 Session',

                    title: s.sessionTitle,
                    description: s.description,
                    duration: s.sessionDuration + ' ' + s.sessionDurationIn,
                    price: s.finalPrice,
                    service: s,
                  }
              })
              .filter((a) => a),
          ]
        })

        //setTotalServiceResults(results.data.listOneOnOnes.items)
        console.log('oneonone- ', results)
      }
    } catch (error) {
      console.log(`Load Error:${error}`)
    }
  }

  const loadWorkshop = async () => {
    // debugger
    try {
      const results = await API.graphql(
        graphqlOperation(listWorkshops, {
          filter: { username: { contains: usrName } },
        }),
      )
      if (results.data.listWorkshops.items.length > 0) {
        setWorkshopResults(results.data.listWorkshops.items)
        setTotalServiceResults((prev) => {
          return [
            ...prev,
            ...results.data.listWorkshops.items
              .map((s, idx) => {
                if (
                  !prev.some(
                    (p) => p.text === 'Workshop' && p.title === s.title,
                  )
                )
                  return {
                    text: 'Workshop',
                    title: s.title,
                    description: s.description,
                    duration: s.callDuration + ' ' + s.callDurationIn,
                    price: s.finalPrice,
                    service: s,
                  }
              })
              .filter((a) => a),
          ]
        })

        //setTotalServiceResults(...results.data.listWorkshops.items)
        console.log('workshop- ', results)
      }
    } catch (error) {
      console.log(`Load Error:${error}`)
    }
  }

  const loadCourses = async () => {
    // debugger
    try {
      const results = await API.graphql(
        graphqlOperation(listCourses, {
          filter: { username: { contains: usrName } },
        }),
      )
      if (results.data.listCourses.items.length > 0) {
        setCoursesResults(results.data.listCourses.items)
        setTotalServiceResults((prev) => {
          return [
            ...prev,
            ...results.data.listCourses.items
              .map((s, idx) => {
                if (
                  !prev.some(
                    (p) => p.text === 'Courses' && p.title === s.courseTitle,
                  )
                )
                  return {
                    text: 'Courses',
                    title: s.courseTitle,
                    description: s.description,
                    duration: s.sessionDuration + ' ' + s.sessionDurationIn,
                    price: s.finalPrice,
                    service: s,
                  }
              })
              .filter((a) => a),
          ]
        })
        // results.data.listCourses.items.map((s, idx) => {
        //   totalServiceResults.push({
        //     text: 'Courses',
        //     title: s.courseTitle,
        //     description: s.description,
        //     duration: s.sessionDuration + ' ' + s.sessionDurationIn,
        //     price: s.finalPrice,
        //   })
        // })

        //setTotalServiceResults(...results.data.listCourses.items)
        console.log('courses- ', results)
      }
    } catch (error) {
      console.log(`Load Error:${error}`)
    }
  }

  const loadTextQuery = async () => {
    try {
      const results = await API.graphql(
        graphqlOperation(listTextQueries, {
          filter: { username: { contains: usrName } },
        }),
      )
      if (results.data.listTextQueries.items.length > 0) {
        setTextQueryResults(results.data.listTextQueries.items)
        setTotalServiceResults((prev) => {
          // debugger
          return [
            ...prev,
            ...results.data.listTextQueries.items
              .map((s, idx) => {
                if (
                  !prev.some(
                    (p) => p.text === 'TextQuery' && p.title === s.title,
                  )
                )
                  return {
                    text: 'TextQuery',
                    title: s.title,
                    description: s.description,
                    duration: s.responseTime + ' ' + s.responseTimeIn,
                    price: s.finalPrice,
                    service: s,
                  }
              })
              .filter((a) => a),
          ]
        })
        // results.data.listTextQueries.items.map((s, idx) => {
        //   totalServiceResults.push({
        //     text: 'TextQuery',
        //     title: s.title,
        //     description: s.description,
        //     duration: s.responseTime + ' ' + s.responseTimeIn,
        //     price: s.finalPrice,
        //   })
        // })

        //setTotalServiceResults(...results.data.listTextQueries.items)
        console.log('textquery- ', results)
      }
    } catch (error) {
      console.log(`Load Error:${error}`)
    }
  }

  const loadPackages = async () => {
    // debugger
    try {
      const results = await API.graphql(
        graphqlOperation(listPackages, {
          filter: { username: { contains: usrName } },
        }),
      )
      if (results.data.listPackages.items.length > 0) {
        setPackagesResults(results.data.listPackages.items)
        setTotalServiceResults((prev) => {
          return [
            ...prev,
            ...results.data.listPackages.items
              .map((s, idx) => {
                if (
                  !prev.some(
                    (p) => p.text === 'Packages' && p.title === s.title,
                  )
                )
                  return {
                    text: 'Packages',
                    title: s.title,
                    description: s.description,
                    duration: s.responseTime + ' ' + s.responseTimeIn,
                    price: s.finalPrice,
                    service: s,
                  }
              })
              .filter((a) => a),
          ]
        })
        // results.data.listPackages.items.map((s, idx) => {
        //   totalServiceResults.push({
        //     text: 'TextQuery',
        //     title: s.title,
        //     description: s.description,
        //     duration: s.responseTime + ' ' + s.responseTimeIn,
        //     price: s.finalPrice,
        //   })
        // })
        //setTotalServiceResults(...results.data.listPackages.items)
        console.log('listPackages- ', results)
      }
    } catch (error) {
      console.log(`Load Error:${error}`)
    }
  }

  useEffect(() => {
    //if (!mentor) getUser()
    getUser()
    loadOneOnOne()
    loadWorkshop()
    loadCourses()
    loadTextQuery()
    loadPackages()
  }, [showServices, mentor])

  return (
    <div className="flex flex-col items-center bg-white">
      <div className="w-full">
        <div className="flex justify-center items-center text-base text-semibold border-2 rounded-md bg-white h-14 mb-2 w-full">
          Preview
        </div>
      </div>
      {showBooking && component}
      <div className="p-5 items-center flex flex-col">
        <div
          className={`${classes['persona']} bg-gray-300 rounded-full flex justify-center`}
        >
          {preImage ? (
            <img
              src={preImage}
              alt=""
              className={`${classes['persona']} rounded-full`}
            />
          ) : null}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl font-semibold mt-5 text-center">
            {firstName} {lastName}
          </span>
          <span className="text-xl font-normal text-center">
            {occupation} {organisation}
          </span>
          <div className="flex flex-row mt-5">
            {linkedin_url && (
              <img src="../../../images/linkedin.png" alt="" className="px-4" />
            )}

            {instagram_url && (
              <img
                src="../../../images/instagram.png"
                alt=""
                className="px-4"
              />
            )}
            {facebook_url && (
              <img
                src="../../../images/facebook.svg"
                alt=""
                className="px-4 w-20"
              />
            )}
          </div>
          <span className="text-2xl font-semibold mt-5  text-center">
            {shortDescription}
          </span>

          <span className="text-2xl font-semibold mt-2  text-center">
            {/* also an entrepreneur from Newyork, USA. */}
          </span>
          <span className="text-xs font-semibold underline underline-offset-4 mt-5  text-center">
            About {firstName}
          </span>
          <span className="text-base font-normal mt-5  text-center">
            {aboutYourself}
          </span>
          <span className="text-xs font-normal mt-2  text-center">
            {/* mentor young entrepreneurs out there. Hey this is michael,
            co-founder and executive officer at */}
          </span>
          <span className="text-xs font-normal mt-2  text-center">
            {/* twitter. I’m here to offer my services , mentor young entrepreneurs
            out there. */}
          </span>
          <div className="flex flex-row mt-5">
            <img
              src="../../../images/Star.png"
              alt=""
              className="w-3 h-3 mr-2"
            ></img>
            <div className="text-xs font-semibold">4.8</div>
            <div className="text-xs font-normal">/5.0 (200+Sessions)</div>
          </div>
          <span className="text-xs font-semibold underline underline-offset-4 mt-5">
            Domain Experties
          </span>
          <div className="flex  flex-col md:flex-row  my-5">
            {domainNames.map((item) => (
              <span className="flex py-2 mr-1 px-5 mb-3 md:mb-0 justify-center items-center bg-black hover:bg-blue-700 text-sm  p-2 text-white rounded-full w-auto">
                {item}
              </span>
            ))}
          </div>
          {showServices && (
            <>
              <span className="text-2xl font-semibold m-10">
                Services Offered
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center ">
                {initialPosts !== null && initialPosts.length > 0 ? (
                  initialPosts.map((s, index) => {
                    // debugger
                    // debugger

                    return (
                      <div
                        className="cursor-pointer"
                        onClick={serviceClicked.bind(null, s)}
                      >
                        <div
                          key={index}
                          className="relative mx-auto overflow-hidden shadow-md md:ml-24 mt-4  "
                        >
                          <img
                            src="../../../images/CardRectangle.png"
                            className="object-cover "
                          />
                          <span className="text-left absolute inset-x-0 top-0 mt-5 p-2">
                            <div className="flex justify-between px-1">
                              <div className="text-left">
                                <p className="text-base text-black font-semibold p-1">
                                  {s.text}
                                </p>
                                <p className="text-base">{s.duration}</p>
                              </div>

                              <div className="flex justify-between items-center px-2 py-1 min-w-[11rem] rounded-full border border-gray-700 mb-3">
                                <img
                                  className="w-50 h-50"
                                  src="/assets/icon/video.svg"
                                  alt=""
                                  sizes=""
                                  srcset=""
                                />
                                <span className="text-sm">Video session</span>
                              </div>
                            </div>

                            <p className="text-sm text-black font-semibold p-1">
                              {s.title}
                            </p>
                            <p className="text-sm text-black font-normal p-2">
                              {(s.description + s.description)
                                .split(' ')
                                .slice(0, 10)
                                .join(' ')}
                            </p>
                            {/* <p className="text-xs text-black font-normal mt-2 p-2">
                              {s.duration}
                            </p> */}
                          </span>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div></div>
                )}

                {/* {
                  workshopResults !== null && workshopResults.length > 0 ?
                  (
                      workshopResults.map((s, index) =>{
                        return(
                          <>
                        <div key={index}
                        className="relative overflow-hidden w-auto  rounded-xl shadow-xl">
                        <img
                          src="../../../images/CardRectangle.png"
                          className="object-cover w-full"
                        />
                        <span className="absolute inset-x-0 top-0 mt-10">
                          <p className="text-sm text-black font-semibold mt-5 p-1">
                            {s.title}
                          </p>
                          <p className="text-sm text-black font-normal p-2">
                          {s.callDuration}{' '}
                                        {s.callDurationIn}
                          </p>
                          <p className="text-xs text-black font-normal mt-2 p-2">
                            {s.description}
                          </p>
                        </span>
                      </div>
                      </>
                      )})
                  ) :(<div></div>)
                }
                {
                  textQueryResults !== null && textQueryResults.length > 0 ? (
                    textQueryResults.map((s, index) =>{
                      return(
                        <>
                      <div key={index}
                      className="relative overflow-hidden w-auto  rounded-xl shadow-xl">
                      <img
                        src="../../../images/CardRectangle.png"
                        className="object-cover w-full"
                      />
                      <span className="absolute inset-x-0 top-0 mt-10">
                        <p className="text-sm text-black font-semibold mt-5 p-1">
                          {s.title}
                        </p>
                        <p className="text-sm text-black font-normal p-2">
                        {s.responseTime}{' '}
                                        {s.responseTimeIn}
                        </p>
                        <p className="text-xs text-black font-normal mt-2 p-2">
                          {s.description}
                        </p>
                      </span>
                    </div>
                    </>
                    )})
                  ) : (<div></div>)
                }
                {
                  coursesResults !== null && coursesResults.length > 0 ? (
                    coursesResults.map((s, index) =>{
                      return(
                        <>
                      <div key={index}
                      className="relative overflow-hidden w-auto  rounded-xl shadow-xl">
                      <img
                        src="../../../images/CardRectangle.png"
                        className="object-cover w-full"
                      />
                      <span className="absolute inset-x-0 top-0 mt-10">
                        <p className="text-sm text-black font-semibold mt-5 p-1">
                          {s.courseTitle}
                        </p>
                        <p className="text-sm text-black font-normal p-2">
                        {s.sessionDuration}{' '}{s.sessionDurationIn}
                        </p>
                        <p className="text-xs text-black font-normal mt-2 p-2">
                          {s.description}
                        </p>
                      </span>
                    </div>
                    </>
                    )})
                  ) : (<div></div>)
                } */}
                {/* repeat           */}

                {/* <div className="relative overflow-hidden w-full  rounded-xl shadow-xl">
                  <img
                    src="../../../images/CardRectangle.png"
                    className="object-cover w-full"
                  />
                  <span className="absolute top-0 left-0">
                    <p className="text-sm text-black font-semibold mt-3 p-1">
                      1 on 1 Mock Interview
                    </p>
                    <p className="text-sm text-black font-normal p-2">
                      60 min | 30 min | 15 min sessions
                    </p>
                    <p className="text-xs text-black font-normal mt-2 p-2">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula eget dolor.
                    </p>
                  </span>

                  <div className="absolute top-0 right-0 items-center inline-flex  p-2 rounded-full z-10 text-sm font-medium text-white select-none">
                    <button className="flex justify-center items-center border-2 border-gray-900 hover:border-none hover:bg-blue-700 hover:text-white text-white font-bold p-1 rounded-full">
                      <img
                        src="../../../images/camera.png"
                        alt=""
                        className="w-4 h-3"
                      ></img>
                      <p className="text-sm text-black dark:text-gray-100 ml-3">
                        Video session
                      </p>
                    </button>
                  </div>
                  <div className="flex flex-row justify-end bg-gray-200 bg-opacity-25 md:bg-opacity-50">
                    <button className="inset-x-0 bottom-0 mr-2">
                      <p className="text-sm text-black underline dark:text-gray-100">
                        View Details
                      </p>
                    </button>
                    <button className="bottom-0 right-0 bg-amber-400 hover:bg-blue-700 text-white p-2 rounded-full m-2">
                      <p className="text-xs text-black font-bold">
                        Book a session
                      </p>
                    </button>
                  </div>
                </div> */}
              </div>
              {initialPosts.length > 0 ? (
                <div className="flex justify-center item-center m-5">
                  {isCompleted
                    ? null
                    : // <button
                      //   onClick={loadMore}
                      //   type="button"
                      //   className="flex py-3 px-5 justify-center items-center bg-black text-sm p-2 text-white rounded-full w-auto ml-5"
                      // >
                      //   No more
                      // </button>
                      index < totalServiceResults.length && (
                        <button
                          onClick={loadMore}
                          type="button"
                          className="flex py-3 px-5 justify-center items-center bg-black hover:bg-blue-700 text-sm p-2 text-white rounded-full w-auto ml-5"
                        >
                          Load more +
                        </button>
                      )}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Preview
