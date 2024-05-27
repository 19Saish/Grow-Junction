import React ,{useEffect}from 'react'
import Payment from '../../components/Mentor/Payment'
import { useDispatch } from 'react-redux'
import { setMentorTitle } from '../../redux/actions/MentorTitleAction'

const PaymentPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setMentorTitle(dispatch, 'Payment')
  }, [])
  return <Payment />
}

export default PaymentPage
