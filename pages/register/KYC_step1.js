import { API, Auth } from 'aws-amplify'
import { config } from 'process'
import React, { useEffect, useState } from 'react'
import { color } from '../../public/theme/Color'
import BoxBodyContainer from '../components/common/BoxBodyContainer'

import TextField from '../ui-kit/TextField'
// import {createDemo} from '../../src/graphql/mutations';
import * as mutations from '../../src/graphql/mutations'

import KYC_header from '../components/registration/KYC_header'
import {
  listDemoSkillsLists,
  listDomainInterestedLists,
  listTodos,
} from '../../src/graphql/queries'
import {
  deleteDomainInterestedList,
  deleteDemoSkillsList,
} from '../../src/graphql/mutations.js'
import Button from '../ui-kit/Button'
import SkeletonLoader from '../ui-kit/SkeletonLoader'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import useWindowDimensions from '../../public/utils/useWindowDimensions'

import ACTION_KEYS from '../../constants/action-keys'
import Toaster from '../ui-kit/Toaster'
import WithAuthenticatedKYCDone from '../../hoc/withAuthenticatedKYCDone'
Auth.configure(config)

const spaceValidation = new RegExp(/^[^ ]*$/)
const KYC_step1 = () => {
  const registerType = useSelector((state) => state.AuthReducer)
  const dispatch = useDispatch()

  const { width, height } = useWindowDimensions()
  debugger
  debugger
  const router = useRouter()
  const url =
    registerType?.kycStep1?.[registerType?.registerType]?.linkedIn_url ||
    registerType?.kycStep1?.[registerType?.registerType]?.url ||
    ''

  const [link, setLink] = useState(url)
  const [domainList, setdomainList] = useState([])
  const [showDomainInput, setShowDomainInput] = useState(false)
  const [domainName, setDomainName] = useState({ value: '' })
  const [loading, setLoading] = useState(false)
  const [domainListLoading, setDomainListLoading] = useState(false)
  const [selectedList, setSelectedList] = useState([])
  const [showtoast, setShowToast] = useState(false)
  const [toastContent, setToastContent] = useState({ message: '', type: '' })

  //   console.log(registerType?.registerType)

  useEffect(() => {
    // debugger
    // if (!domainList.length) {
    getCurrentUser()
    // }
  }, [])
  useEffect(() => {
    debugger
    if (registerType?.registerType) {
      if (registerType?.registerType === 'STUDENT') {
        if (
          registerType?.kycStep1?.[registerType?.registerType]?.interestedSkills
            ?.length > 0
        ) {
          setSelectedList(
            registerType?.kycStep1?.[registerType?.registerType]
              ?.interestedSkills,
          )
        }
      } else {
        if (
          registerType?.kycStep1?.[registerType?.registerType]?.domain_id
            ?.length > 0
        ) {
          setSelectedList(
            registerType?.kycStep1?.[registerType?.registerType]?.domain_id,
          )
        }
      }
    }
  }, [registerType])

  const getCurrentUser = async () => {
    debugger

    if (registerType?.registerType === 'STUDENT') {
      try {
        const listData = await API.graphql({
          query: listDomainInterestedLists,
        })
        console.log(listData)

        setdomainList(listData?.data?.listDomainInterestedLists?.items)
        setDomainListLoading(false)
        // setShowDomainInput(false)
        setLoading(false)
      } catch (err) {
        setDomainListLoading(false)
        setLoading(false)
        console.log('err', err)
        setDomainListLoading(false)
      }
    } else {
      try {
        const listData = await API.graphql({
          query: listDemoSkillsLists,
        })
        setdomainList(listData?.data?.listDemoSkillsLists?.items)
        setDomainListLoading(false)
        // setShowDomainInput(false)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setDomainListLoading(false)
        console.log('err', err)
        // setDomainListLoading(false)
      }
    }
    // getCurrentUser()
  }

  const saveDomainSkills = async () => {
    debugger
    if (!domainName?.value) {
      // setShowDomainInput(false)
      return
    }
    setLoading(true)
    try {
      // const data = { value: domainName }

      if (registerType?.registerType === 'STUDENT') {
        const postData = await API.graphql({
          query: mutations.createDomainInterestedList,
          variables: { input: domainName },
        })
      } else {
        const postData = await API.graphql({
          query: mutations.createDemoSkillsList,
          variables: { input: domainName },
        })
      }
      getCurrentUser()
      setDomainListLoading(false)
      console.log('e', e)
      setLoading(false)
      const newDomain = { value: '' }
      setDomainName(newDomain)
      // setShowDomainInput(false)
    } catch (e) {
      setDomainListLoading(false)
      console.log('e', e)
      setLoading(false)
      const newDomain = { value: '' }
      setDomainName(newDomain)
      // setShowDomainInput(false)
    }
  }

  useEffect(() => {
    if (link?.length || selectedList.length) {
      setShowToast(false)
    }
  }, [link, selectedList.length])
  console.log(`domainName`, domainName)
  return (
    <div className="flex h-screen bg-white">
      <div className="m-auto px-4">
        <div
          className="flex flex-col justify-center items-center bg-gray-50 md:p-20 lg:p-20 m-5 p-5"
          // style={{
          //   backgroundColor: color.headerColor,
          // }}
        >
          <KYC_header
            stepImage={
              registerType?.registerType === 'STUDENT'
                ? '/assets/icon/stu_StepIndicator.png'
                : '/assets/icon/StepIndicator.png'
            }
          />
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <div
                className="flex justify-center items-center text-3xl font-semibold text-gray-900 mt-10 mb-5"
                // style={{
                //   color: color.blackVariant,
                //   fontWeight: 400,
                //   fontSize: 36,
                //   //marginTop: 60,
                // }}
              >
                {registerType?.registerType === 'STUDENT'
                  ? 'Learn and grow from mentors'
                  : 'Get ready to mentor and share'}
              </div>
              <div
                className="flex justify-center item-center text-base font-normal text-gray-400 mb-10"
                // style={{
                //   color: color.lightGrey,
                //   fontSize: 16,
                //   fontWeight: 400,
                //   //marginTop: 16,
                // }}
              >
                Add some basic details to personalise the experience
              </div>
              <div
                className="text-sm font-normal text-gray-900 mt-5"
                // style={{
                //   display: 'flex',
                //   flex: 1,
                //   flexDirection: 'row',
                //  // marginTop: 60,
                // }}
              >
                LinkedIn Profile URL
                <TextField
                  //label="LinkedIn Profile URL"
                  id="url"
                  type="url"
                  placeholder="Paster Linkedin profile URL "
                  value={link}
                  styleOverride={{
                    backgroundColor: color.white,
                    fontSize: 14
                    //height: 56,
                  }}
                  textStyleOverride={{
                    backgroundColor: color.white,
                    paddingLeft: 8,
                    fontSize:14
                  }}
                  link="https://linkedin.com"
                  infoMsg="Get yout linkedin URL, click here."
                  onChangeValue={(text) => {
                    if (spaceValidation.test(text.target.value)) {
                      setLink(text.target.value)
                    }
                  }}
                  // errMsg={touched.email && errors.email}
                />
              </div>
              <div
                className="text-base font-semibold text-gray-900 mt-10"
                // style={{
                //   color: color.blackVariant,
                //  // marginBottom: 20,
                //   fontSize: 16,
                //   fontWeight: 400,
                //  // marginTop: 56,
                //   //marginBottom: 24,
                // }}
              >
                {registerType?.registerType === 'STUDENT'
                  ? 'Domain you are intrested to learn'
                  : 'Domain you want to provide mentorship'}
              </div>
              <div
                // className="flex flex-row  justify-center p-4 text-gray-900 font-normal text-sm"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  flex: 1,
                  maxWidth: 700,
                }}
              >
                {!domainListLoading ? (
                  <>
                    {domainList?.map((item, index) => {
                      let selectedItem = false
                      selectedList?.map((key, index) => {
                        if (key?.id === item?.id) {
                          selectedItem = true
                        }
                      })

                      return (
                        <div key={index} className="relative mt-5">
                          <div
                            key={index.toString()}
                            style={{
                              cursor: 'pointer',
                              paddingLeft: 20,
                              paddingRight: 20,
                              // backgroundColor: "red",
                              borderWidth: 1,
                              borderColor: selectedItem
                                ? color.btnColor
                                : color.blackVariant,
                              borderRadius: 22,
                              marginRight: 10,

                              marginBottom: 10,
                              height: 35,
                              alignItems: 'center',
                              justifyContent: 'center',
                              display: 'flex',
                              fontSize: 14,
                              fontWeight: 400,
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
                            <div
                              style={{
                                fontSize: 14,
                                fontWeight: 400,
                                color: color.blackVariant,
                              }}
                            >
                              {item?.value}
                            </div>
                          </div>
                          {/* <div
                            className="w-10 -top-5 text-sm right-0 h-10 rounded-full bg-red-600 text-white cursor-pointer absolute flex justify-center items-center p-5"
                            onClick={deleteDomainList.bind(null, item?.id)}
                          >
                            X
                          </div> */}
                        </div>
                      )
                    })}

                    <div className="flex flex-col md:flex-row justify-between mt-5 ">
                      {showDomainInput && (
                        <input
                          style={{
                            textAlign: 'center',
                            backgroundColor: 'transparent',
                            borderRadius: 25,
                            borderWidth: 1,
                            borderColor: color.blackVariant,
                            color: color.blackVariant,
                          marginRight: 10,
                          width: 129,
                            fontSize: 14,
                          }}
                          placeholder="Enter here..."
                          name="value"
                          value={domainName?.value}
                          onChange={(e) => {
                            setDomainName(() => ({
                              [e.target.name]: e.target.value,
                            }))
                          }}
                        />
                      )}
                      <Button
                        className="cursor-pointer"
                        label={
                          showDomainInput
                            ? 'Save'
                            : `Add ${domainList.length > 0 ? ' another' : ''}`
                        }
                        styleOverride={{
                          // paddingLeft: 20,
                          // paddingRight: 20,
                          // paddingTop: 6,
                          // paddingBottom: 6,
                          color: color.white,
                          borderWidth: 1,
                          borderColor: color.blackVariant,
                          borderRadius: 22,
                        // marginBottom: 10,
                        // height: 43,
                          backgroundColor: color.blackVariant,
                          width: showDomainInput ? 100 : 160,
                          fontSize: 14,
                        }}
                        loader={loading}
                        onClick={() => {
                          debugger
                          if (showDomainInput) {
                            if (domainName?.value) saveDomainSkills()
                          } else {
                            setShowDomainInput(true)
                          }
                        }}
                      />
                      {showDomainInput && (
                        <Button
                          label={'Cancel'}
                          className="cursor-pointer md:ml-5"
                          styleOverride={{
                            // paddingLeft: 20,
                            // paddingRight: 20,
                            // marginLeft: 20,
                            // paddingTop: 6,
                            // paddingBottom: 6,

                            color: color.white,
                            borderWidth: 1,
                            borderColor: color.blackVariant,
                            borderRadius: 22,
                            // height: 43,
                            backgroundColor: color.blackVariant,
                          width: showDomainInput ? 100 : 160,
                            fontSize: 14,
                          }}
                          // loader={loading}
                          onClick={() => {
                            setShowDomainInput(false)
                          }}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <SkeletonLoader />
                )}
              </div>
              <Button
                label={'Continue'}
                className="cursor-pointer"
                styleOverride={{
                  // paddingLeft: 20,
                  // paddingRight: 20,
                  // paddingTop: 6,
                  // paddingBottom: 6,
                  color: color.white,
                  borderRadius: 22,
                  // height: 43,
               // marginTop: 10,

                  fontSize: 14,
                  backgroundColor: color.btnColor,
                width: 186,
                marginTop: 10,
                marginBottom: 10,
                }}
                onClick={() => {
                  if (registerType?.registerType === 'STUDENT') {
                    if (link && selectedList.length) {
                      dispatch({
                        type: ACTION_KEYS.KYCSTEP1,
                        payload: {
                          linkedIn_url: link,
                          interestedSkills: selectedList,
                          registerType: 'STUDENT',
                        },
                      })
                      router.push('/register/StudentProfessionalDetails')
                    } else {
                      setToastContent({
                        message: 'Please fill all details',
                        type: 'failure',
                      })
                      setShowToast(true)
                    }
                  } else {
                    if (link && selectedList.length) {
                      dispatch({
                        type: ACTION_KEYS.KYCSTEP1,
                        payload: {
                          url: link,
                          domain_id: selectedList,
                          registerType: 'MENTOR',
                        },
                      })
                      router.push('/register/KYC_step2')
                    } else {
                      setToastContent({
                        message: 'Please fill all details',
                        type: 'failure',
                      })
                      setShowToast(true)
                    }
                  }
                }}
              />
              {showtoast ? (
                <Toaster
                  message={toastContent?.message}
                  type={toastContent.type}
                />
              ) : null}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default WithAuthenticatedKYCDone(KYC_step1)
