import React, { useEffect, useState } from 'react'
import { color } from '../../public/theme/Color'
import BoxBodyContainer from '../components/common/BoxBodyContainer'
import KYC_header from '../components/registration/KYC_header'
import Button from '../ui-kit/Button'
import SkeletonLoader from '../ui-kit/SkeletonLoader'
import * as mutations from '../../src/graphql/mutations'
import * as queries from '../../src/graphql/queries'
import { API, Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import ACTION_KEYS from '../../constants/action-keys'
import WithAuthenticatedKYCDone from '../../hoc/withAuthenticatedKYCDone'
const KYC_step2 = () => {
  const registerType = useSelector((state) => state.AuthReducer)
  const router = useRouter()
  const dispatch = useDispatch()
  const [serviceList, setServiceList] = useState()
  const [showServiceInput, setShowServiceInput] = useState(false)
  const [serviceName, setServiceName] = useState({ value: '' })
  const [loading, setLoading] = useState(false)
  const [serviceListLoading, setServiceListLoading] = useState(true)
  const [selectedList, setSelectedList] = useState([])

  useEffect(() => {
    getCurrentUser()
  }, [])
  useEffect(() => {
    debugger
    if (registerType?.registerType) {
      if (registerType?.registerType === 'STUDENT') {
        // if (registerType?.kycStep1?.interestedSkills?.length > 0) {
        //   setSelectedList(registerType?.kycStep1?.interestedSkills)
        // }
      } else if (registerType?.kycStep2?.mentor_service_id?.length > 0) {
        setSelectedList(registerType?.kycStep2?.mentor_service_id)
      }
    }
  }, [registerType])
  const getCurrentUser = async () => {
    // const { username } = await Auth.currentAuthenticatedUser({
    //   bypassCache: true,
    // })

    try {
      const listData = await API.graphql({
        query: queries.listSuggestedServiceLists,
        //   authMode: "AMAZON_COGNITO_USER_POOLS",
      })
      setServiceList(listData?.data?.listSuggestedServiceLists?.items)
      setServiceListLoading(false)
    } catch (err) {
      console.log('err', err)
      setServiceListLoading(false)
    }
  }

  const saveDomainSkills = async () => {
    setLoading(true)
    try {
      const data = { value: serviceName }
      const postData = await API.graphql({
        query: mutations.createSuggestedServiceList,
        variables: { input: serviceName },
        // authMode: "AMAZON_COGNITO_USER_POOLS",
      })
      console.log('post data', postData)
      getCurrentUser()
      setShowServiceInput(false)
      setLoading(false)
    } catch (e) {
      console.log('e', e)
      setLoading(false)
      setShowServiceInput(false)
    }
  }

  return (
    <div className="flex h-screen bg-white">
      <div className="m-auto px-4">
        <div className="flex flex-col justify-center items-center bg-gray-50 md:p-20 lg:p-20 m-5 p-5">
          <div
            className="flex flex-col justify-start items-center"
            style={{
              backgroundColor: color.headerColor,
            }}
          >
            <KYC_header stepImage={'/assets/icon/StepIndicator2.png'} />
            <div
              style={
                {
                  // display: 'flex',
                  // flex: 1,
                  // padding: 10,
                  // justifyContent: 'center',
                  // alignItems: 'center',
                }
              }
            >
              <div
                style={{
                  // display: 'flex',
                  // // flex: 1,
                  // justifyContent: 'center',
                  // flexDirection: 'column',
                  // padding: 20,
                  // alignSelf: "center",
                  // backgroundColor: "red",
                  backgroundColor: color.headerColor,
                }}
              >
                <div className="flex justify-center items-center text-3xl font-semibold text-gray-900 mt-10 mb-10"
                  // style={{
                  //   color: color.blackVariant,
                  //   padding: 20,
                  //   fontWeight: 400,
                  //   fontSize: 36,
                  //   marginTop: 60,
                  // }}
                >
                  What service you want to offer
                </div>
                <div className="flex justify-center item-center text-base font-normal text-gray-400 mb-10"
                  // style={{
                  //   color: color.lightGrey,
                  //   fontSize: 16,
                  //   fontWeight: 400,
                  //   marginTop: 16,
                  //   padding: 20,
                  // }}
                >
                  List the services which you think your target audience will
                  like
                </div>

                <div className="text-base font-semibold text-gray-900 mt-10 mb-5 md:ml-5 lg:ml-5"
                  // style={{
                  //   color: color.blackVariant,
                  //   marginBottom: 20,
                  //   fontSize: 16,
                  //   fontWeight: 400,
                  //   marginTop: 56,
                  //   marginBottom: 24,
                  //   padding: 20,
                  // }}
                >
                  Suggested services
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                   // padding: 20,
                    // flex: 1,
                  }}
                >
                  {!serviceListLoading ? (
                    <>
                      {serviceList?.map((item, index) => {
                        let selectedItem = false
                        selectedList?.map((key, index) => {
                          if (key?.id === item?.id) {
                            selectedItem = true
                          }
                        })
                        return (
                          <div
                            key={index.toString()}
                            style={{
                              paddingLeft: 20,
                              paddingRight: 20,
                              paddingTop: 6,
                              paddingBottom: 6,
                              color: color.blackVariant,
                              borderWidth: 1,
                              borderColor: selectedItem
                                ? color.btnColor
                                : color.blackVariant,
                              borderRadius: 22,
                              marginRight: 10,
                              marginBottom: 20,
                              height: 43,
                              alignItems: 'center',
                              justifyContent: 'center',
                              display: 'flex',
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              let count = 0
                              if (selectedList.length) {
                                selectedList.map((items, index) => {
                                  if (items?.id === item?.id) {
                                    count = 1
                                    setSelectedList(
                                      selectedList.filter(
                                        (items) => items?.id !== item?.id,
                                      ),
                                    )
                                  }
                                })
                                if (count == 0) {
                                  setSelectedList((selectedList) => [
                                    ...selectedList,
                                    item,
                                  ])
                                }
                              } else
                                setSelectedList((selectedList) => [
                                  ...selectedList,
                                  item,
                                ])
                            }}
                          >
                            <div className='text-sm font-semibold text-gray-900'
                              // style={{
                              //   fontSize: 14,
                              //   fontWeight: 400,
                              //   color: color.blackVariant,
                              // }}
                            >
                              {item?.value}
                            </div>
                          </div>
                        )
                      })}
                      {showServiceInput && (
                        <input
                          style={{
                            backgroundColor: 'transparent',
                            borderRadius: 25,
                            borderWidth: 1,
                            borderColor: color.blackVariant,
                            paddingLeft: 20,
                            color: color.blackVariant,
                            marginRight: 10,
                            //   marginLeft: 10,
                            height: 43,
                            fontSize: 14,
                          }}
                          placeholder="Enter here..."
                          name="value"
                          onChange={(e) => {
                            setServiceName(() => ({
                              [e.target.name]: e.target.value,
                            }))
                          }}
                        />
                      )}
                      <div className="flex justify-center mb-5">
                        <Button
                          label={showServiceInput ? 'Save' : 'Add another'}
                          styleOverride={{
                            color: color.white,
                            borderWidth: 1,
                            borderColor: color.blackVariant,
                            borderRadius: 22,
                            marginRight: 10,
                            backgroundColor: color.blackVariant,
                            // width: showServiceInput ? 100 : 160,
                            fontSize: 14,
                          }}
                          loader={loading}
                          onClick={() => {
                            if (showServiceInput) {
                              if (serviceName?.value) saveDomainSkills()
                            } else {
                              setShowServiceInput(true)
                            }
                          }}
                        />
                        {showServiceInput && (
                          <Button
                            label={'cancel'}
                            styleOverride={{
                              color: color.white,
                              borderWidth: 1,
                              borderColor: color.blackVariant,
                              borderRadius: 22,
                              backgroundColor: color.blackVariant,
                              // width: showServiceInput ? 100 : 160,
                              fontSize: 14,
                            }}
                            loader={loading}
                            onClick={() => {
                              setShowServiceInput(false)
                            }}
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <SkeletonLoader />
                  )}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}
                >
                  <Button
                    label={'Previous'}
                    className="cursor-pointer"
                    styleOverride={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      color: color.white,
                      borderRadius: 22,
                      fontSize: 15,
                      backgroundColor: color.blackVariant,
                      // width: 186,
                      marginRight: 24,
                    }}
                    loader={loading}
                    onClick={() => {
                      router.back()
                    }}
                  />
                  <Button
                    label={'Continue'}
                    className="cursor-pointer"
                    styleOverride={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      color: color.white,
                      borderRadius: 22,
                      fontSize: 15,
                      backgroundColor: color.btnColor,
                      // width: 186,
                    }}
                    loader={loading}
                    onClick={() => {
                      if (selectedList?.length) {
                        dispatch({
                          type: ACTION_KEYS.KYCSTEP2,
                          payload: {
                            mentor_service_id: selectedList,
                          },
                        })
                        router.push('/register/MentorAvailability')
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WithAuthenticatedKYCDone(KYC_step2)
