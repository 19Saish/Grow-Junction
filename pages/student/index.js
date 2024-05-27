import React, { useEffect } from 'react'
import LeftMenu from '../../components/Student/LeftMenu'
import MainContent from '../../components/Student/MainContent'
import { useDispatch } from 'react-redux'
import { setStudentTitle } from '../../redux/actions/StudentTitleAction'
import { Auth, withAuthenticator } from '@aws-amplify/ui-react'
import KYC_Done from '../../hoc/kyc_done'
// import withAuthenticator from '../add-todo'
const Student = ({ children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (!children) setStudentTitle(dispatch, 'Students')
  }, [])
  return (
    <main className="flex flex-row min-h-screen">
      <LeftMenu />
      <MainContent content={children ? children : null} />
    </main>
  )
}

export default KYC_Done(Student)
