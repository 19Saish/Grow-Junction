import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
const WithAuthenticated =
  (Component) =>
  ({ ...props }) => {
    debugger
    const router = useRouter()
    const authReducer = useSelector((state) => state.AuthReducer)
    useEffect(() => {
      if (!authReducer.userAuth && !authReducer.user) {
        router.replace(`${window.location.origin}/auth/Login`)
        // return null
      }
    }, [])

    return <Component {...props} />
  }

export default WithAuthenticated
