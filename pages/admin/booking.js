import React, { useEffect } from 'react'
import Profile from '../../components/Student/Booking'
import { useDispatch } from 'react-redux'
import { setStudentTitle } from '../../redux/actions/StudentTitleAction'

const BookingPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setStudentTitle(dispatch, 'Bookings')
  }, [])
  return <Profile />
}

export default BookingPage
