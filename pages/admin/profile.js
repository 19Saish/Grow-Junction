import React, { useEffect } from 'react'
import Profile from '../../components/Student/Profile'
import { useDispatch } from 'react-redux'
import { setStudentTitle } from '../../redux/actions/StudentTitleAction'

const ProfilePage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setStudentTitle(dispatch, 'Profile')
  }, [])
  return <Profile />
}

export default ProfilePage
