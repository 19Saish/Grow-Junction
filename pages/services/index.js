import React, { useEffect } from 'react'
// import LeftMenu from '../../../components/Services/LeftMenu'
import MainContent from '../../components/Mentor/Services/MainContent'
import { useDispatch } from 'react-redux'
import { setServicesTitle } from '../../redux/actions/ServicesTitleAction'
import { withAuthenticator } from '@aws-amplify/ui-react'
// import withAuthenticator from '../add-todo'
const Services = ({ children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (!children) setServicesTitle(dispatch, 'Services')
  }, [])
  return (
    <main className="flex flex-row min-h-screen">
      {/* <LeftMenu /> */}
      <MainContent content={children ? children : null} />
    </main>
  )
}

export default withAuthenticator(Services)
