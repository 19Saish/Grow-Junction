import React ,{useEffect}from 'react'
import Profile from '../../components/Mentor/Availability'
import { useDispatch } from 'react-redux'
import { setMentorTitle } from '../../redux/actions/MentorTitleAction'

const AvailabilityPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setMentorTitle(dispatch, 'Availability')
  }, [])
  return <Profile />
}

export default AvailabilityPage
