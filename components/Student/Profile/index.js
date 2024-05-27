import React, { useState, useEffect } from 'react'
import ProfileInfo from './ProfileInfo'
import ContactInfo from './ContactInfo'
import EducationalInfo from './EducationalInfo'
import { API, Auth, input, Storage, graphqlOperation } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import { toast } from 'react-toastify'
import { getS3FileUrl, setS3FileUrl } from '../../../utilities/others'
// import nestedkeys from 'nested-keys'
// import useWindowDimensions from '../../public/utils/useWindowDimensions'

import {
  createStudentRegister,
  updateStudentRegister,
} from '../../../src/graphql/mutations'

import { listStudentRegisters } from '../../../src/graphql/queries'
import { getLoggedinUserEmail } from '../../../utilities/user'
const initialState = {
  about_yourself: {
    first_name: '',
    last_name: '',
    short_description: '',
  },
  social: {
    linkedin_url: '',
    facebook_url: '',
    instagram_url: '',
    personal_web_url: '',
    other_url: '',
  },
  contact_info: {
    email: '',
    mobile: '',
    whatsapp: '',
  },
  education: {
    degree: '',
    college_university: '',
    course: '',
    graduation_year: 0,
  },
  professional_info: {
    occupation: '',
    organization: '',
    location: '',
    position: '',
    experience: {
      years: '',
      months: '',
    },
  },
  profile_image: '',
  student_profile: '',
}

const Profile = () => {
  // const { width, height } = useWindowDimensions()
  // console.log("nestedkeys",nestedkeys)
  const [openTab, setOpenTab] = useState(1)
  const [state, setState] = useState(initialState)
  const [user, setUser] = useState()
  const [isNew, setIsNew] = useState(true)
  const [loading, setLoading] = useState(false)
  const [percentage, setPercentage] = useState(40)
  const getUser = async () => {
    try {
      const usr = await Auth.currentAuthenticatedUser()
      if (usr) setUser(usr)
    } catch (error) {}
    debugger
    const usrname = getLoggedinUserEmail()
    const results = await API.graphql(
      graphqlOperation(listStudentRegisters, {
        filter: { username: { contains: usrname } },
      }),
    )
    if (results.data.listStudentRegisters.items.length > 0) {
      setIsNew(false)
      const data = { ...results.data.listStudentRegisters.items[0] }
      if (data.profile_image) {
        // const img = await Storage.get(data.profile_image)
        const img = await getS3FileUrl(data.profile_image)
        // const response = await fetch(img)
        // const arrBuf = await response.arrayBuffer()
        // const base64String = arrayBufferToBase64(arrBuf)
        // data.profile_image = `data:image/png;base64,${base64String}`
        data.profile_image_url = img
      }
      if (data.student_profile) {
        // debugger
        try {
          const img = await getS3FileUrl(data.student_profile)
          // const response = await fetch(img)
          // const arrBuf = await response.arrayBuffer()
          // const base64String = arrayBufferToBase64(arrBuf)
          // data.profile_image = `data:image/png;base64,${base64String}`
          data.student_profile_url = img
        } catch (error) {
          // debugger
        }
        // const img = await Storage.get(data.profile_image)
      }

      setState({ ...data })
    }

    // const results = await API.graphql(
    //   graphqlOperation(listMentorRegisters, {
    //     filter: {
    //       username: usr.username + '1',
    //     },
    //   }),
    // )

    console.log('results', results)
  }
  useEffect(() => {
    let total = 40
    const keys = [
      'about_yourself',
      'social',
      'contact_info',
      'education',
      'professional_info',
      'profile_image',
      'student_profile',
    ]
    const percEachKey = 60 / keys.length
    keys.forEach((key) => {
      const subKeys = Object.keys(state[key])

      if (subKeys.length > 0) {
        const percEachSubKey = percEachKey / subKeys.length
        subKeys.forEach((subKey) => {
          total += !!state[key][subKey] ? percEachSubKey : 0
        })
      } else {
        total += !!state[key] ? percEachKey : 0
      }
    })
    setPercentage(Math.round(total, 2))
  }, [state])
  useEffect(() => {
    setLoading(true)
    getUser()
    setLoading(false)
  }, [])
  console.log('user', user)
  const setModifiedState = async (profileState) => {
    debugger
    const { profile_image_file, student_profile_file, ...remaining } =
      profileState
    if (profile_image_file) {
      const name = profile_image_file.name.substr(
        0,
        profile_image_file.name.lastIndexOf('.'),
      )
      const ext = profile_image_file.name.substr(
        profile_image_file.name.lastIndexOf('.') + 1,
      )
      const filename = `${name}_${uuid()}.${ext}`
      await setS3FileUrl(filename, profile_image_file, remaining.profile_image)
      // await Storage.put(filename, profile_image_file, {
      //   contentType: `image/${ext}`, // contentType is optional
      // })
      remaining.profile_image = filename
    }
    if (student_profile_file) {
      debugger
      const name = student_profile_file.name.substr(
        0,
        student_profile_file.name.lastIndexOf('.'),
      )
      const ext = student_profile_file.name.substr(
        student_profile_file.name.lastIndexOf('.') + 1,
      )
      const filename = `${name}_${uuid()}.${ext}`
      await setS3FileUrl(
        filename,
        student_profile_file,
        remaining.student_profile,
      )
      // await Storage.put(filename, profile_image_file, {
      //   contentType: `image/${ext}`, // contentType is optional
      // })
      remaining.student_profile = filename
    }
    if (isNew) {
      const usrname = getLoggedinUserEmail()
      remaining.username = usrname
      try {
        await API.graphql({
          query: createStudentRegister,
          variables: { input: { ...state, ...remaining } },
        })
        toast.success('Profile added successfully')
      } catch (err) {
        toast.error(`Save Error:${error.errors[0].message}`)
      }
    } else {
      const {
        createdAt,
        updatedAt,
        student_profile_url,
        profile_image_url,
        ...rest
      } = {
        ...state,
        ...remaining,
      }
      // const { createdAt, profile_image_url, ...rest } = {
      //   ...state,
      //   ...remaining,
      // }
      try {
        const usrname = getLoggedinUserEmail()
        rest.username = usrname
        await API.graphql({
          query: updateStudentRegister,
          variables: {
            input: { ...rest },
            // condition: { username: { contains: state.username } },
          },
        })
        toast.success('Profile updated successfully')
      } catch (error) {
        debugger
        toast.error(`Save Error:${error.errors[0].message}`)
        console.log(error)
      }
      // await API.graphql(
      //   graphqlOperation(updateMentorRegister, {
      //     input: { ...state, ...remaining },
      //     authMode: 'AMAZON_COGNITO_USER_POOLS',
      //   }),
      // )
    }

    setState((prev) => {
      const prevVal = { ...prev, ...remaining }
      return prevVal
    })
  }
  console.log('state', state)
  return (
    <>
      {/* <BoxBodyContainer
       styleOverride={{ alignItems: "flex-start" }}
       body={
         <div
           style={{
             display: "flex",
             flex: 1,
             flexDirection: "column",
           }}
         >
         </div>
       }
     />  */}

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
                  Profile Info
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
                  Contact Info
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
                  Educational Info
                </a>
              </li>
            </ul>
            {/* Profile */}
            {!loading && (
              <>
                <div className={openTab === 1 ? 'block' : 'hidden'}>
                  <ProfileInfo
                    {...{
                      about_yourself: state.about_yourself,
                      social: state.social,
                      student_profile:state.student_profile,
                      profile_image_url: state.profile_image_url,
                      student_profile_url: state.student_profile_url,
                      setProfileState: setModifiedState,
                      percentage,
                      // ,
                      // profile_image: state.profile_image,
                    }}
                  />
                </div>

                {/* contact */}
                <div className={openTab === 2 ? 'block' : 'hidden'}>
                  <ContactInfo
                    {...{
                      contact_info: state.contact_info,
                      setContactState: setModifiedState,
                    }}
                  />
                </div>

                {/* Educational */}
                <div className={openTab === 3 ? 'block' : 'hidden'}>
                  <EducationalInfo
                    {...{
                      professional_info: state.professional_info,
                      education: state.education,
                      setProfessionalState: setModifiedState,
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
