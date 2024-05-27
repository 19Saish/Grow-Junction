import React, { useEffect, useState } from 'react'
import Modal from '../../../Utilities/Modal'
import { toast } from 'react-toastify'
import { API } from 'aws-amplify'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'

import { learnersSchema } from '../../../../public/utils/schema'
import { setMentors } from '../../../../redux/actions/MentorTitleAction'
import { createMentorRegister } from '../../../../src/graphql/mutations'
import TextField from '../../../../pages/ui-kit/TextField'
// import { Auth } from 'aws-amplify'
// import { StoreUserAuth, Signup } from '../../../../redux/actions/AuthAction'
// import { createUserInfo } from '../../../../src/graphql/mutations'
const AddMentor = ({ show, setShow }) => {
  const dispatch = useDispatch()
  const initialState = {
    firstName: '',
    lastName: '',
    // password: '',
    // confirmPassword: '',
    email: '',
    mobile: '',
    access: {
      ['ONEONONE']: true,

      ['WORKSHOP']: true,
      ['COHORT']: true,
      ['PACKAGE']: true,
    },
  }
  const [state, setState] = useState(initialState)
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const saveLearner = (e) => {
    e.stopPropagation()

    // if (password.trim().length < 8 || confirmPassword.trim().length < 8) {
    //   toast.error(
    //     `Password or confirm Password length should be greater than 8 characters.`,
    //   )
    //   return
    // }
    // if (password.trim() !== confirmPassword.trim()) {
    //   toast.error(`Password and confirm Password do not match.`)
    //   return
    // }
  }
  // try {
  //   debugger
  //   const { user } = await Auth.signUp({
  //     email,
  //     password,
  //     username: email,
  //     attributes: {
  //       email: email,
  //       'custom:first_name': firstName,
  //       'custom:last_name': lastName,
  //       'custom:register_type': 'STUDENT',
  //       'custom:kyc_done': false,
  //     },
  //     autoSignIn: {
  //       enabled: true,
  //     },
  //   })
  //   debugger
  //   // Signup(dispatch)
  //   console.log('user', user)
  //   const userInfo = {
  //     kyc_done: false,
  //     register_type: 'STUDENT',
  //     email: email,
  //     name: `${firstName} ${lastName}`,
  //     username: email,
  //     profile_image: '',
  //   }
  //   await API.graphql({
  //     query: createUserInfo,
  //     variables: { input: { ...userInfo } },
  //   })
  //   // if (user) {
  //   //   StoreUserAuth(dispatch, user)
  //   // }
  // } catch (error) {
  //   debugger
  //   console.log('err', error)
  // }
  // try {
  //   await API.graphql({
  //     query: createUserInfo,
  //     variables: { input: { ...userInfo } },
  //   })
  // } catch (error) {
  //   debugger
  // }
  useEffect(() => {
    setShow(show)
  }, [show])
  return (
    <Formik
      initialValues={{ ...state }}
      // enableReinitialize={true}
      validationSchema={learnersSchema}
      onSubmit={async (values, e) => {
        debugger
        const {
          firstName,
          lastName,
          // password, confirmPassword,
          mobile,
          email,
          access,
        } = values
        const statuses = []
        Object.keys(access).forEach((item) => {
          if (access[item.toUpperCase()] == true) {
            statuses.push(item.toUpperCase())
          }
        })
        const data = {
          about_yourself: {
            first_name: firstName,
            last_name: lastName,
          },
          username: email,
          contact_info: {
            email: email,
            mobile: mobile,
            whatsapp: mobile,
          },
          access: statuses,
        }
        try {
          await API.graphql({
            query: createMentorRegister,
            variables: { input: { ...data } },
          })
          setMentors(dispatch)
          toast.success('Mentor added successfully')
          setTimeout(() => {
            setShow(false)
          }, 1000)
          // window.location.href = window.location.href
        } catch (error) {
          console.log('create error', error)
          toast.error(`Save Error:${error.errors[0].message}`)
        }
      }}
      validateOnMount={true}
      validateOnBlur={true}
      validateOnChange={true}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => {
        console.log('values', values)
        return (
          <form>
            <Modal
              title="Create"
              containerWidth="1/2"
              firstButtonTitle="Close"
              firstButtonHandler={setShow.bind(null, false)}
              secondButtonTitle="save"
              secondButtonHandler={handleSubmit}
              closeButtonHandler={setShow.bind(null, false)}
            >
              <div className="flex flex-col justify-start items-start px-[50px] py-4">
                <div className="text-lg font-normal mb-2 mt-5">First Name</div>
                <div className="flex flex-wrap items-stretch w-full border-2 ">
                  <TextField
                    name="firstName"
                    onChangeValue={handleChange}
                    value={values.name}
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    errMsg={touched.firstName && errors.firstName}
                  />
                  {/* <input
                    className="w-full"
                    name="firstName"
                    onChange={onChange}
                  /> */}
                </div>

                <div className="text-lg font-normal mb-2 mt-5">Last Name</div>
                <div className="flex flex-wrap items-stretch w-full border-2 ">
                  <TextField
                    name="lastName"
                    onChangeValue={handleChange}
                    value={values.name}
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    errMsg={touched.firstName && errors.lastName}
                  />
                  {/* <input
                    className="w-full"
                    name="lastName"
                    onChange={onChange}
                  /> */}
                </div>
                <div className="text-lg font-normal mb-2 mt-5">E Mail</div>
                <div className="flex flex-wrap items-stretch w-full border-2 ">
                  <TextField
                    name="email"
                    onChangeValue={handleChange}
                    value={values.name}
                    type="email"
                    id="email"
                    placeholder="Email"
                    errMsg={touched.email && errors.email}
                  />
                  {/* <input
                    className="w-full"
                    type="email"
                    name="email"
                    onChange={handleChange}
                  /> */}
                </div>
                {/* <div className="text-lg font-normal mb-2 mt-5">Password</div>
        <div className="flex flex-wrap items-stretch w-full border-2 ">
          <input
            className="w-full"
            type="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="text-lg font-normal mb-2 mt-5">Confirm Password</div>
        <div className="flex flex-wrap items-stretch w-full border-2 ">
          <input
            className="w-full"
            type="password"
            name="confirmPassword"
            onChange={onChange}
          />
        </div> */}
                <div className="text-lg font-normal mb-2 mt-5">Mobile</div>
                <div className="flex flex-wrap items-stretch w-full border-2 ">
                  <TextField
                    name="mobile"
                    onChangeValue={handleChange}
                    value={values.name}
                    type="mobile"
                    id="mobile"
                    placeholder="Mobile"
                    errMsg={touched.mobile && errors.mobile}
                  />
                  {/* <input
                    className="w-full"
                    name="mobile"
                    onChange={handleChange}
                  /> */}
                </div>
                <div className="flex flex-wrap items-stretch w-full border-2 ">
                  {Object.keys(values.access).map((item, index) => (
                    <div key={index}>
                      <label
                        // style={{ textTransform: 'lowercase', marginRight: 10 }}
                        className="text-lg capitalize mr-5"
                        htmlFor={`access${item}`}
                      >
                        {item.toLowerCase()}
                      </label>
                      <input
                        type="checkbox"
                        id={`access${item}`}
                        name={`access[${item}]`}
                        checked={values.access[item]}
                        onChange={handleChange}
                        style={{ marginRight: 10 }}
                        value={values.access[item]}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Modal>
          </form>
        )
      }}
    </Formik>
  )
}

export default AddMentor
