import React ,{useEffect}from 'react'
import Profile from '../../components/Mentor/Booking'
import { useDispatch } from 'react-redux'
import { setMentorTitle } from '../../redux/actions/MentorTitleAction'

const BookingPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setMentorTitle(dispatch, 'Bookings')
  }, [])
  return <Profile />
}

export default BookingPage
