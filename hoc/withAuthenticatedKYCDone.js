import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { API, graphqlOperation } from 'aws-amplify'
import { getLoggedinUserEmail } from '../utilities/user'
import { listUserInfos } from '../src/graphql/queries'
import { useSelector } from 'react-redux'
import { checkUserKyc } from '../utilities/others'
const WithAuthenticatedKYCDone =
  (Component) =>
  ({ ...props }) => {
    const authReducer = useSelector((state) => state.AuthReducer)
    const router = useRouter()
    useEffect(() => {
      // const checkUserKyc = async () => {
      //   debugger
      //   const username = getLoggedinUserEmail()
      //   if (!username) {
      //     router.replace('/auth/Login')
      //   } else {
      //     const results = await API.graphql(
      //       graphqlOperation(listUserInfos, {
      //         filter: {
      //           username: {
      //             eq: username,
      //           },
      //         },
      //       }),
      //     )
      //     if (results.data.listUserInfos?.items?.length > 0) {
      //       const data = { ...results.data.listUserInfos?.items[0] }
      //       if (data.kyc_done) {
      //         // debugger
      //         router.replace(
      //           `${
      //             authReducer.registerType === 'MENTOR' ? '/mentor' : '/student'
      //           }`,
      //         )
      //       }
      //     } else {
      //       router.replace('/auth/Login')
      //     }
      //   }
      // }
      checkUserKyc()
    }, [])
    return <Component {...props} />
  }

export default WithAuthenticatedKYCDone
