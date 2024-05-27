import { Formik } from 'formik'
import React, { useState } from 'react'
import { color } from '../../public/theme/Color'
import BoxBodyContainer from '../components/common/BoxBodyContainer'
import KYC_header from '../components/registration/KYC_header'
import Button from '../ui-kit/Button'
import TextField from '../ui-kit/TextField'
import DropDown from '../ui-kit/DropDown'
import { ProfessionalDetailSchema } from '../../public/utils/schema'
import { useRouter } from 'next/router'
import WithAuthenticatedKYCDone from '../../hoc/withAuthenticatedKYCDone'
// import { toast } from 'react-toastify'

import ACTION_KEYS from '../../constants/action-keys'
import { useDispatch, useSelector } from 'react-redux'
import Toaster from '../ui-kit/Toaster'
// import { toast, ToastContainer } from 'react-nextjs-toast'

const degree = [
  { name: 'B.E' },
  { name: 'B.Tech' },
  { name: 'M.Sc' },
  { name: 'M.Tech' },
]

const currentEmployer = ['Yes', 'No']

const experience = ['1', '2', '3', '4+']

const spaceValidation = new RegExp(/^[^ ]*$/)
const StudentProfessionalDetails = () => {
  // const professionalDetails = useSelector((state) => state.AuthReducer)
  const registerType = useSelector((state) => state.AuthReducer)
  const { professionalDetails } = registerType
  const router = useRouter()
  const dispatch = useDispatch()
  const [degreeDropDownBool, setDegreeDropDownBool] = useState(false)
  const [employerDropDownBool, setEmployeeDropDownBool] = useState(false)
  const [expDropDownBool, setExpDropDownBool] = useState(false)
  const [showToaster, setShowToaster] = useState(false)
  debugger
  const initialState = {
    recent_college: professionalDetails?.recent_college || '',
    degree: professionalDetails?.degree || '',
    current_employee: professionalDetails?.current_employee || '',
    your_role: professionalDetails?.your_role || '',
    experience: professionalDetails?.experience || '',
  }
  return (
    <div className="md:p-10 bg-white p-10">
      <div
        className="flex flex-col justify-start items-center"
        style={{
          backgroundColor: color.headerColor,
          padding: 10,
        }}
      >
        {/* <ToastContainer align={'right'} position={'bottom'} /> */}
        <KYC_header stepImage="/assets/icon/stu_Step_Indicator1.png" />
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // padding: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'column',
              maxWidth: 750,
              backgroundColor: color.headerColor,
            }}
          >
            <div
              className="text-gray-900 text-4xl font-semibold p-5"
              // style={{
              //   color: color.blackVariant,
              //   fontWeight: 400,
              //   fontSize: 26,
              //   marginTop: 20,
              //   padding: 5,
              // }}
            >
              Professional Details
            </div>
            <div
              className="text-gray-400 text-base font-normal p-5"
              // style={{
              //   color: color.lightGrey,
              //   fontSize: 10,
              //   fontWeight: 400,
              //   //marginTop: 16,
              //   padding: 5,
              // }}
            >
              Add some basic details to personalise the experience
            </div>
            <Formik
              enableReinitialize={true}
              initialValues={initialState}
              onSubmit={async (values, { setErrors }) => {
                let payload = {
                  recent_college: values.recent_college,
                  degree: values.degree,
                }
                if (values.current_employee !== '') {
                  payload = {
                    ...payload,
                    current_employee: values.current_employee,
                  }
                }
                if (values.your_role !== '') {
                  payload = {
                    ...payload,
                    your_role: values.your_role,
                  }
                }
                if (values.experience !== '') {
                  payload = {
                    ...payload,
                    experience: values.experience,
                  }
                }
                dispatch({
                  type: ACTION_KEYS.PROFESSIONAL_DETAILS,
                  payload: payload,
                })
                //   setShowToaster(true)
                router.push('/register/KYC_step4')
              }}
              validationSchema={ProfessionalDetailSchema()}
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
                <>
                  {showToaster ? (
                    <Toaster message={'hellow'} type="success" />
                  ) : null}

                  <TextField
                    label="Your Recent college"
                    id="recent_college"
                    //   type="Email"
                    placeholder="Enter college name"
                    style={{ padding: 5 }}
                    value={values.recent_college}
                    onChangeValue={(text) => {
                      // if (spaceValidation.test(text.target.value)) {
                      setFieldValue('recent_college', text.target.value)
                      // }
                    }}
                    styleOverride={{
                      backgroundColor: color.white,
                      height: 36,
                      borderColor: color.borderGrey,
                    }}
                    textStyleOverride={{
                      backgroundColor: color.white,
                      paddingLeft: 8,
                    }}
                    errMsg={touched.recent_college && errors.recent_college}
                  />
                  <TextField
                    value={values.degree}
                    label="Choose your degree"
                    placeholder="Choose college degree"
                    style={{ padding: 5 }}
                    onChangeValue={(text) => {
                      // if (spaceValidation.test(text.target.value)) {
                      setFieldValue('degree', text.target.value)
                      // }
                    }}
                    styleOverride={{
                      backgroundColor: color.white,
                      height: 36,
                      borderColor: color.borderGrey,
                    }}
                    textStyleOverride={{
                      backgroundColor: color.white,
                      paddingLeft: 8,
                    }}
                    errMsg={touched.degree && errors.degree}
                  />

                  {/* 

              <div className="px-4 ">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Choose your degree
                </label>
                <select
                  id="degree"
                  className="h-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                >
                  <option value="mtech" selected>
                    M.Tech
                  </option>
                  <option value="btech">B.Tech</option>
                  <option value="msc">M.SC</option>
                  <option value="bsc">BSC</option>
                </select>
              </div>
                    <DropDown
                      value={values.degree}
                      label="Choose your degree"
                      placeholder="Choose college degree"
                      containerStyle={{
                        backgroundColor: color.white,
                        height: 59,
                        borderColor: color.borderGrey,
                        borderWidth: 1,
                        borderRadius: 4,
                      }}
                      dropDownBool={degreeDropDownBool}
                      openDropDown={() => {
                        setDegreeDropDownBool(!degreeDropDownBool)
                      }}
                      iconOverride={{ marginRight: 28 }}
                      errMsg={touched.degree && errors.degree}
                    />

                    {degreeDropDownBool ? (
                      <div
                        style={{
                          backgroundColor: color.white,
                          paddingLeft: 10,
                          //   position: 'absolute',
                        }}
                      >
                        {degree.map((item, index) => {
                          return (
                            <div
                              key={index.toString()}
                              style={{
                                color: color.black,
                                paddingTop: 10,
                                paddingBottom: 10,
                                fontSize: 14,
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                setFieldValue('degree', item?.name)
                                setDegreeDropDownBool(false)
                              }}
                            >
                              {item?.name}
                            </div>
                          )
                        })}
                      </div>
                    ) : null} */}
                  <TextField
                    value={values.current_employee}
                    label="Current Employer (optional))"
                    placeholder="Choose current employer"
                    onChangeValue={(text) => {
                      // if (spaceValidation.test(text.target.value)) {
                      setFieldValue('current_employee', text.target.value)
                      // }
                    }}
                    style={{ padding: 5 }}
                    styleOverride={{
                      backgroundColor: color.white,
                      height: 36,
                      borderColor: color.borderGrey,
                    }}
                    textStyleOverride={{
                      backgroundColor: color.white,
                      paddingLeft: 8,
                    }}
                    errMsg={touched.current_employee && errors.current_employee}
                  />

                  {/* <DropDown
                      value={values.current_employee}
                      label="Current Employer (optional))"
                      placeholder="Choose current employer"
                      containerStyle={{
                        backgroundColor: color.white,
                        height: 59,
                        borderColor: color.borderGrey,
                        borderWidth: 1,
                        borderRadius: 4,
                      }}
                      iconOverride={{ marginRight: 28 }}
                      dropDownBool={employerDropDownBool}
                      openDropDown={() => {
                        setEmployeeDropDownBool(!employerDropDownBool)
                      }}
                    />
              <div className="px-4 mt-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Experience in years (optional)
                </label>
                <select
                  id="expyear"
                  className="h-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 "
                >
                  <option value="01" selected>
                    01
                  </option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                </select>
              </div>

                    {employerDropDownBool ? (
                      <div
                        style={{
                          backgroundColor: color.white,
                          paddingLeft: 10,
                        }}
                      >
                        {currentEmployer.map((item, index) => {
                          return (
                            <div
                              key={index.toString()}
                              style={{
                                color: color.black,
                                paddingTop: 10,
                                paddingBottom: 10,
                                fontSize: 14,
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                setFieldValue('current_employee', item)
                                setEmployeeDropDownBool(false)
                              }}
                            >
                              {item}
                            </div>
                          )
                        })}
                      </div>
                    ) : null} */}

                  <TextField
                    label="Your role (optional)"
                    id="your_role"
                    type="role"
                    placeholder="Enter your role"
                    //   icon={require('../../public/assets/icon/eye.png')}
                    style={{ padding: 5 }}
                    styleOverride={{
                      backgroundColor: color.white,
                      height: 36,
                      borderColor: color.borderGrey,
                    }}
                    textStyleOverride={{
                      backgroundColor: color.white,
                      paddingLeft: 8,
                    }}
                    value={values.your_role}
                    onChangeValue={(text) => {
                      // if (spaceValidation.test(text.target.value)) {
                      setFieldValue(text.target.id, text.target.value)
                      // }
                    }}
                    errMsg={touched.your_role && errors.your_role}
                  />

                  <TextField
                    value={values.experience}
                    label="Experience in years (optional)"
                    placeholder="Choose experience in year"
                    style={{ padding: 5 }}
                    id="experience"
                    type="number"
                    //   icon={require('../../public/assets/icon/eye.png')}
                    styleOverride={{
                      backgroundColor: color.white,
                      height: 36,
                      borderColor: color.borderGrey,
                    }}
                    textStyleOverride={{
                      backgroundColor: color.white,
                      paddingLeft: 8,
                    }}
                    onChangeValue={(text) => {
                      // if (spaceValidation.test(text.target.value)) {
                      setFieldValue(text.target.id, text.target.value)
                      // }
                    }}
                    errMsg={touched.your_role && errors.your_role}
                  />

                  {/* <DropDown
                      value={values.experience}
                      label="Experience in years (optional)"
                      placeholder="Choose experience in year"
                      containerStyle={{
                        backgroundColor: color.white,
                        height: 59,
                        borderColor: color.borderGrey,
                        borderWidth: 1,
                        borderRadius: 4,
                      }}
                      iconOverride={{ marginRight: 28 }}
                      dropDownBool={expDropDownBool}
                      openDropDown={() => {
                        setExpDropDownBool(!expDropDownBool)
                      }}
                    />

                    {expDropDownBool ? (
                      <div
                        style={{
                          backgroundColor: color.white,
                          paddingLeft: 10,
                        }}
                      >
                        {experience.map((item, index) => {
                          return (
                            <div
                              key={index.toString()}
                              style={{
                                color: color.black,
                                paddingTop: 10,
                                paddingBottom: 10,
                                fontSize: 14,
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                setFieldValue('experience', item)
                                setExpDropDownBool(false)
                              }}
                            >
                              {item}
                            </div>
                          )
                        })}
                      </div>
                    ) : null} */}

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      padding: 5,
                    }}
                  >
                    <Button
                      label={'Previous'}
                      className="cursor-pointer"
                      styleOverride={{
                        // paddingLeft: 20,
                        // paddingRight: 20,
                        // paddingTop: 6,
                        // paddingBottom: 6,

                        color: color.white,
                        borderRadius: 22,
                        height: 43,
                        fontSize: 12,
                        backgroundColor: color.blackVariant,
                        // width: 186,
                        // marginTop: 70,
                        // marginBottom: 48,
                        // marginRight: 24,
                      }}
                      // loader={loading}
                      onClick={() => {
                        router.back()
                      }}
                    />
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
                        fontSize: 12,
                        backgroundColor: color.btnColor,
                        // width: 186,
                        // marginTop: 70,
                        // marginBottom: 48,
                      }}
                      // loader={loading}
                      // onClick={() => {
                      //   router.push('/register/KYC_step4')
                      // }}
                      onClick={handleSubmit}
                    />
                  </div>
                </>
              )}
            </Formik>
            {/* <Toaster /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WithAuthenticatedKYCDone(StudentProfessionalDetails)
