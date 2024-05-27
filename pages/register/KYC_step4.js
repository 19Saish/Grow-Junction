import React, { useEffect, useState } from 'react'
import { color } from '../../public/theme/Color'
import BoxBodyContainer from '../components/common/BoxBodyContainer'
import KYC_header from '../components/registration/KYC_header'
import Button from '../ui-kit/Button'
import SkeletonLoader from '../ui-kit/SkeletonLoader'
import * as mutations from '../../src/graphql/mutations'
import * as queries from '../../src/graphql/queries'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import TextField from '../ui-kit/TextField'
import ACTION_KEYS from '../../constants/action-keys'
import { countryCodeJson } from '../../public/utils/CountryCodeJson'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, useFormikContext } from 'formik'
import { verifyStep4 } from '../../public/utils/schema'
import { v4 as uuid } from 'uuid'
import {
  listUserInfos,
  listMentorRegisters,
  listStudentRegisters,
} from '../../src/graphql/queries'
import { getLoggedinUserEmail } from '../../utilities/user'
import WithAuthenticatedKYCDone from '../../hoc/withAuthenticatedKYCDone'
const numberValidation = new RegExp(/^[0-9]{0,10}$/)
const KYC_step4 = () => {
  const registerType = useSelector((state) => state.AuthReducer)
  const router = useRouter()
  const dispatch = useDispatch()
  //   const [phoneNumber, setPhoneNumber] = useState()
  const [loading, setLoading] = useState()
  const [state, setState] = useState()
  // window.mentor = registerType
  console.log('registerType', registerType)
  const AutoSubmitToken = ({ setValues }) => {
    // Grab values and submitForm from context
    const { values, submitForm } = useFormikContext()

    React.useEffect(() => {
      debugger
      console.log('context_values', values)
      // values.questions = questions
      setValues(values)
      // setProfile(values)
      // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
      // if (values.token.length === 6) {
      //   submitForm();
      // }
    }, [values, submitForm])
    return null
  }
  const setValues = (values) => {
    setState(values)
  }
  const handleClick = async () => {
    let postData
    if (registerType?.registerType === 'STUDENT') {
      const usrname = getLoggedinUserEmail()
      const { registerType: rt, ...restKycStep1 } =
        registerType?.kycStep1?.STUDENT
      let payload = {
        ...registerType?.professionalDetails,

        ...restKycStep1,
        whatsapp_number: state.phoneNumber,
      }
      payload.interestedSkills = payload.interestedSkills.map((i) => i.id)
      payload.username = usrname
      try {
        const results = await API.graphql(
          graphqlOperation(listStudentRegisters, {
            filter: { username: { contains: usrname } },
          }),
        )
        if (results.data.listStudentRegisters.items.length > 0) {
          const { createdAt, updatedAt, profile_image_url, ...rest } = {
            ...results.data.listStudentRegisters.items[0],
            ...payload,
          }
          try {
            rest.username = usrname
            postData = await API.graphql({
              query: mutations.updateStudentRegister,
              variables: {
                input: { ...rest },
                // condition: { username: { contains: state.username } },
              },
            })
            // toast.success('Profile updated successfully')
          } catch (error) {
            debugger
            // toast.error(`Save Error:${error.errors[0].message}`)
            console.log(error)
          }
        } else {
          try {
            postData = await API.graphql({
              query: mutations.createStudentRegister,
              variables: { input: payload },
              // authMode: 'AMAZON_COGNITO_USER_POOLS',
            })
            console.log(postData)
          } catch (e) {
            console.log('e', e)
          }
        }
        if (postData) {
          if (postData) {
            const results = await API.graphql(
              graphqlOperation(listUserInfos, {
                filter: {
                  username: {
                    eq: getLoggedinUserEmail(),
                  },
                },
              }),
            )
            if (results.data.listUserInfos?.items?.length > 0) {
              const data = { ...results.data.listUserInfos?.items[0] }
              const { updatedAt, createdAt, owner, ...updateduser } = data
              try {
                await API.graphql({
                  query: mutations.updateUserInfo,
                  variables: {
                    input: { ...updateduser, kyc_done: true },
                    // condition: { username: { contains: state.username } },
                  },
                  // authMode: 'AMAZON_COGNITO_USER_POOLS',
                })
                // toast.success('Profile updated successfully')
              } catch (error) {
                debugger
                toast.error(`Save Error:${error.errors[0].message}`)
                console.log(error)
              }
            }
            if (registerType.userAuth) {
              let user = await Auth.currentAuthenticatedUser()
              let data = {
                'custom:kyc_done': 'true',
              }
              Auth.updateUserAttributes(user, data)
                .then((res) => {
                  console.log('res', res)
                  window.location.replace(window.location.origin + '/student')
                  // setSubmitting(false)
                })
                .catch((e) => {
                  console.log('err', e)
                })
            } else {
              window.location.replace(window.location.origin + '/student')
            }
            // router.replace('/mentor')
          }
        }
      } catch (error) {}
    } else {
      const usrname = getLoggedinUserEmail()
      const { registerType: rt, ...restKycStep1 } =
        registerType?.kycStep1?.MENTOR
      let payload = {
        ...registerType?.kycStep2,
        ...restKycStep1,
        whatsapp_number: state.phoneNumber,
      }
      payload.mentor_service_id = payload.mentor_service_id.map((i) => i.id)
      payload.domain_id = payload.domain_id.map((i) => i.id)
      // payload.username = usrname
      console.log(payload)

      try {
        const results = await API.graphql(
          graphqlOperation(listMentorRegisters, {
            filter: { username: { contains: usrname } },
          }),
        )
        if (results.data.listMentorRegisters.items.length > 0) {
          const { createdAt, updatedAt, profile_image_url, owner, ...rest } = {
            ...results.data.listMentorRegisters.items[0],
            ...payload,
          }
          // const { createdAt, profile_image_url, ...rest } = {
          //   ...state,
          //   ...remaining,
          // }
          // rest.username = getLoggedinUserEmail()
          try {
            postData = await API.graphql({
              query: mutations.updateMentorRegister,
              variables: {
                input: { ...rest },
                // condition: { username: { contains: state.username } },
              },
            })
            // toast.success('Profile updated successfully')
          } catch (error) {
            debugger
            // toast.error(`Save Error:${error.errors[0].message}`)
            console.log(error)
          }
        } else {
          try {
            postData = await API.graphql({
              query: mutations.createMentorRegister,
              variables: { input: payload },
              // authMode: 'AMAZON_COGNITO_USER_POOLS',
            })
            console.log(postData)
          } catch (e) {
            console.log('e', e)
          }
        }
      } catch (error) {}
      if (postData) {
        const results = await API.graphql(
          graphqlOperation(listUserInfos, {
            filter: {
              username: {
                eq: getLoggedinUserEmail(),
              },
            },
          }),
        )
        if (results.data.listUserInfos?.items?.length > 0) {
          const data = { ...results.data.listUserInfos?.items[0] }
          const { updatedAt, createdAt, owner, ...updateduser } = data
          try {
            await API.graphql({
              query: mutations.updateUserInfo,
              variables: {
                input: { ...updateduser, kyc_done: true },
                // condition: { username: { contains: state.username } },
              },
              // authMode: 'AMAZON_COGNITO_USER_POOLS',
            })
            // toast.success('Profile updated successfully')
          } catch (error) {
            debugger
            // toast.error(`Save Error:${error.errors[0].message}`)
            console.log(error)
          }
        }
        if (registerType.userAuth) {
          let user = await Auth.currentAuthenticatedUser()
          let data = {
            'custom:kyc_done': 'true',
          }
          Auth.updateUserAttributes(user, data)
            .then((res) => {
              console.log('res', res)
              window.location.replace(window.location.origin + '/mentor')
              // setSubmitting(false)
            })
            .catch((e) => {
              console.log('err', e)
            })
        } else {
          window.location.replace(window.location.origin + '/mentor')
        }
        // router.replace('/mentor')
      }
    }
  }
  debugger
  const initialState = {
    phoneNumber:
      registerType?.kycStep4?.[registerType.registerType]?.phoneNumber,
  }
  // useEffect(() => {
  //   if (registerType) {
  //     setState(registerType)
  //   }
  // }, registerType)
  return (
    <div className="md:p-40 lg:p-40  bg-white p-10">
      <div
        className="flex flex-col justify-start items-center"
        style={{
          backgroundColor: color.headerColor,
        }}
      >
        <KYC_header
          stepImage={
            registerType?.registerType === 'STUDENT'
              ? '/assets/icon/stu_StepIndicator3.png'
              : '/assets/icon/StepIndicator4.png'
          }
        />
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'column',
              // alignSelf: "center",
              // backgroundColor: "red",
            }}
          >
            <div
              style={{
                color: color.blackVariant,
                fontWeight: 400,
                fontSize: 26,
                marginTop: 20,
                padding: 20,
              }}
            >
              Receive updates on Whatsapp
            </div>
            <div
              style={{
                color: color.lightGrey,
                fontSize: 16,
                fontWeight: 400,
                marginTop: 5,
                marginBottom: 10,
                padding: 20,
              }}
            >
              Add your Whats app number so that you get reminder of session on
              time
            </div>
            {registerType && (
              <Formik
                enableReinitialize={true}
                initialValues={initialState}
                onSubmit={(values, e) => {
                  debugger
                  if (!values.phoneNumber) return
                  // setSubmitting(true)
                  handleSubmitOutside(values)
                }}
                validationSchema={verifyStep4}
                validateOnChange={true}
                validateOnBlur={true}
                validateOnMount={true}
              >
                {({
                  handleChange,
                  values,
                  isSubmitting,
                  errors,
                  touched,
                  handleBlur,
                  setErrors,
                  handleSubmit,
                  setFieldValue,
                  ...restProps
                }) => (
                  <form>
                    <TextField
                      label="Whatsapp Number"
                      id="number"
                      // type="number"
                      placeholder="000 000 000"
                      value={values.phoneNumber}
                      phoneNumber={true}
                      onChangeValue={(text) => {
                        if (numberValidation.test(text.target.value)) {
                          setFieldValue('phoneNumber', text.target.value)
                        }
                      }}
                      style={{ padding: 20 }}
                      styleOverride={{
                        backgroundColor: color.white,
                        padding: 20,
                        height: 56,
                      }}
                      textStyleOverride={{
                        backgroundColor: color.white,
                        paddingLeft: 8,
                      }}
                      // errMsg={touched.email && errors.email}
                    />
                    <div
                      style={{
                        display: 'flex',
                        padding: 20,
                        flexDirection: 'row',
                      }}
                    >
                      <Button
                        label={'Previous'}
                        className="cursor-pointer"
                        styleOverride={{
                          paddingLeft: 20,
                          paddingRight: 20,
                          // paddingTop: 6,
                          // paddingBottom: 6,
                          color: color.white,
                          borderRadius: 22,
                          // height: 43,
                          fontSize: 12,
                          backgroundColor: color.blackVariant,
                          // width: 186,
                          // marginTop: 70,
                          // marginBottom: 48,
                          marginRight: 24,
                        }}
                        loader={loading}
                        onClick={() => {
                          debugger
                          dispatch({
                            type: ACTION_KEYS.KYCSTEP4,
                            payload: {
                              phoneNumber: values.phoneNumber,
                              registerType: registerType?.registerType,
                            },
                          })
                          //   setShowDomainInput(true);
                          //   if (showDomainInput) {
                          //     saveDomainSkills();
                          //   }
                          // router.push("/register/KYC_step1    ");
                          router.back()
                        }}
                      />
                      <Button
                        label={'Complete'}
                        className="cursor-pointer"
                        styleOverride={{
                          paddingLeft: 20,
                          paddingRight: 20,
                          // paddingTop: 6,
                          // paddingBottom: 6,
                          color: color.white,
                          borderRadius: 22,
                          // height: 43,
                          fontSize: 12,
                          backgroundColor: color.btnColor,
                          // width: 186,
                          // marginTop: 70,
                          // marginBottom: 48,
                        }}
                        // type="submit"
                        loader={isSubmitting}
                        // onClick={() => {
                        //   //   setShowDomainInput(true);
                        //   //   if (showDomainInput) {
                        //   //     saveDomainSkills();
                        //   //   }
                        //   // router.push("/register/MentorAvailability");
                        // }}
                        onClick={handleClick}
                      />
                    </div>
                    <AutoSubmitToken setValues={setValues} />
                  </form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WithAuthenticatedKYCDone(KYC_step4)
