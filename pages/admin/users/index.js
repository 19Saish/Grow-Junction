import React, { useEffect } from 'react'
// import LeftMenu from '../../../components/Mentor/Services/LeftMenu'
import MainContent from '../../../components/Student/Services/Home'
import { useDispatch } from 'react-redux'
import { setServicesTitle } from '../../../redux/actions/ServicesTitleAction'
import { withAuthenticator } from '@aws-amplify/ui-react'
// import withAuthenticator from '../add-todo'
const Users = ({ children }) => {
  // const dispatch = useDispatch()
  // const checkLogin = async () => {
  //   try {
  //     const userData = await Auth.currentAuthenticatedUser()
  //     console.log('userData', userData)
  //     // debugger
  //     // const credentials = await Auth.federatedSignIn()
  //   } catch (error) {}
  //   try {
  //     const userData = await Auth.currentAuthenticatedUser()
  //     if (userData.username) {
  //       return userData.username
  //     }
  //     return userData.attributes.sub
  //   } catch (err) {
  //     console.log("err", err)
  //   }
  // }

  // useEffect(() => {
  //   if (!children) setServicesTitle(dispatch, 'Users')
  //   checkLogin()
  // }, [])
  return (
    <main className="flex flex-row min-h-screen">
      <MainContent content={children ? children : null} />
    </main>
  )
}

// export default withAuthenticator(Users)
export default Users
