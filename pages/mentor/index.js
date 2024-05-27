import React, { useEffect } from 'react'
import LeftMenu from '../../components/Mentor/LeftMenu'
import MainContent from '../../components/Mentor/MainContent'
import { useDispatch } from 'react-redux'
import { setMentorTitle } from '../../redux/actions/MentorTitleAction'
// import { withAuthenticator } from '@aws-amplify/ui-react'
// import withAuthenticator from '../add-todo'
import KYC_Done from '../../hoc/kyc_done'

const Mentor = ({ children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (!children) setMentorTitle(dispatch, 'Home')
  }, [])
  return (
    <main className="flex flex-row min-h-screen">
      <LeftMenu />
      <MainContent content={children ? children : null} />
    </main>
  )
}

export default KYC_Done(Mentor)
