import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { API, graphqlOperation } from 'aws-amplify'
import { getLoggedinUserEmail } from '../utilities/user'
import { listUserInfos } from '../src/graphql/queries'

const KYC_Done =
  (Component) =>
  ({ ...props }) => {
    const router = useRouter()
    useEffect(() => {
      const checkUserKyc = async () => {
        const username = getLoggedinUserEmail()
        if (!username) {
          router.replace('/auth/Login')
        } else {
          const results = await API.graphql(
            graphqlOperation(listUserInfos, {
              filter: {
                username: {
                  eq: username,
                },
              },
            }),
          )
          if (results.data.listUserInfos?.items?.length > 0) {
            const data = { ...results.data.listUserInfos?.items[0] }
            if (!data.kyc_done) {
              router.replace('/register/KYC_step1')
            }
          } else {
            router.replace('/auth/Login')
          }
        }
      }
      checkUserKyc()
    }, [])
    return <Component {...props} />
  }

export default KYC_Done
