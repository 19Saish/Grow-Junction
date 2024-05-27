import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Auth, API, Storage, graphqlOperation } from 'aws-amplify'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'
import { ClearUser, StoreUserAuth } from '../../../../redux/actions/AuthAction'
import useComponentVisible from '../../../../hooks/useComponentVisible'
import ReactDOM from 'react-dom'
import classes from './Header.module.css'
import { getS3FileUrl } from '../../../../utilities/others'
import {
  listUserInfos,
  listMentorRegisters,
} from '../../../../src/graphql/queries'
import { getLoggedinUserEmail } from '../../../../utilities/user'

const Header = () => {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState('')

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false)
  const dispatch = useDispatch()
  // debugger
  useEffect(() => {
    // debugger
    setOpen(isComponentVisible)
  }, [isComponentVisible])

  useEffect(() => {
    getUrl()
  }, [])

  console.log('isComponentVisible', isComponentVisible)
  console.log('open', open)
  const { logout: oAuthLogout } = useAuth0()
  async function logout() {
    ClearUser(dispatch)
    StoreUserAuth(dispatch, null)
    try {
      await Auth.signOut()
    } catch (error) {}
    try {
      oAuthLogout({ returnTo: window.location.origin })
    } catch (error) {}
  }
  const mentorHeader = useSelector((state) => state.MentorHeaderReducer)

  const getUrl = async () => {
    const usrName = getLoggedinUserEmail()
    console.log('username - ', usrName)
    const results = await API.graphql(
      graphqlOperation(listMentorRegisters, {
        filter: { username: { contains: usrName } },
      }),
    )
    if (results.data.listMentorRegisters.items.length > 0) {
      const data = { ...results.data.listMentorRegisters.items[0] }
      // debugger
      if (data.profile_image) {
        // const img = await Storage.get(data.profile_image)
        const img = await getS3FileUrl(data.profile_image)
        console.log('image - ', img)
        setImage(img)
      }
    } else {
      const results = await API.graphql(
        graphqlOperation(listUserInfos, {
          filter: { username: { contains: usrName } },
        }),
      )
      if (results.data.listUserInfos.items.length > 0) {
        // debugger
        const data = { ...results.data.listUserInfos.items[0] }
        if (data.profile_image) {
          setImage(data.profile_image)
          // setImage(img)
        }
      }
    }
  }

  return (
    <div
      ref={ref}
      className="flex  px-3  md:px-10 sticky bg-white top-0 left-0 h-24 items-center w-full justify-between"
    >
      <div className="header"> {mentorHeader?.title}</div>
      <nav className="nav-links w-64 md:w-80">
        <ul className="w-full flex justify-evenly">
          <li className={'link w-10 h-10'}>
            <img
              className="w-full object-cover"
              src={`/assets/icon/mentor-dashboard/phone.png`}
            />
          </li>
          <li className="link w-10 h-10">
            <img
              className=" w-full object-cover"
              src={`/assets/icon/mentor-dashboard/mail.png`}
            />
          </li>
          <li className="link w-10 h-10">
            <img
              className=" w-full object-cover"
              src={`/assets/icon/mentor-dashboard/notification.png`}
            />
          </li>
          <li
            className={`${classes['profile-img']} link w-10 h-10 cursor-pointer overflow-hidden bg-gray-300`}
            onClick={() => {
              setOpen((prev) => !prev)
              setIsComponentVisible(true)
            }}
          >
            {image && (
              <img className=" w-full h-full object-cover" src={image} />
            )}
          </li>
        </ul>
      </nav>
      {open && isComponentVisible && (
        <div
          className="absolute cursor-pointer right-10 top-24 bg-white"
          onClick={logout}
        >
          <ul>
            <li className="px-3 py-2 border-2">Logout</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Header
