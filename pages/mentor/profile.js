import React ,{useEffect}from 'react'
import Profile from '../../components/Mentor/Profile'
import { useDispatch } from 'react-redux'
import { setMentorTitle } from '../../redux/actions/MentorTitleAction'

const ProfilePage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setMentorTitle(dispatch, 'Profile')
  }, [])
  return <Profile />
}

export default ProfilePage
