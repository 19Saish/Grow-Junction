import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Formik } from 'formik'
import classes from './MentorEdit.module.css'
import Button from '../../../../pages/ui-kit/Button'
import TextField from '../../../../pages/ui-kit/TextField'
import { toast } from 'react-toastify'
import TimezoneSelect, { allTimezones } from 'react-timezone-select'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { API } from 'aws-amplify'
import { setMentors } from '../../../../redux/actions/MentorTitleAction'
import { mentorRegisterSchema } from '../../../../public/utils/schema'
import {
  changePassword,
  // setS3FileUrl,
  sendEmail,
} from '../../../../utilities/others'
import {
  createMentorRegister,
  updateMentorRegister,
} from '../../../../src/graphql/mutations'
const reminderTemplate = `
<h1>Sign Up</h1>
<p>Please signup to the system by visiting the Grow junction Portal</p>
`
const MentorEdit = ({ id }) => {
  const [timeZone, setTimeZone] = useState(
    {},
    // Intl.DateTimeFormat().resolvedOptions(),
  )
  const dispatch = useDispatch()
  // const [profile, setProfile] = useState()
  const [agreeDelete, setAgreeDelete] = useState(false)
  const profileInputRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const initialState = {
    about_yourself: {
      //   grow_junction_url,
      first_name: '',
      last_name: '',
      short_description: '',
      about_yourself: '',
    },
    // current_employee,
    linkedIn_url: '',
    // recent_college,
    // your_role,
    username: '',
    social: {
      linkedin_url: '',
      facebook_url: '',
      instagram_url: '',
      personal_web_url: '',
      other_url: '',
    },
    contact_info: {
      email: '',
      mobile: '',
      whatsapp: '',
    },
    education: {
      degree: '',
      college_university: '',
      course: '',
      graduation_year: '',
    },
    professional_info: {
      occupation: '',
      organization: '',
      location: '',
      position: '',
      experience: {
        years: '',
        months: '',
      },
    },
    profile_image: '',
    active: true,
    student_profile: '',
    time_zone: {},
    access: {
      ['ONEONONE']: true,

      ['WORKSHOP']: true,
      ['COHORT']: true,
      ['PACKAGE']: true,
    },
    revenueShare: [
      {
        serviceType: 'ONEONONE',
        revenueShare: 90,
      },
      {
        serviceType: 'WORKSHOP',
        revenueShare: 90,
      },
      {
        serviceType: 'COHORT',
        revenueShare: 90,
      },
      {
        serviceType: 'PACKAGE',
        revenueShare: 90,
      },
    ],
    bankDetails: {
      accountName: '',
      bankName: '',
      accountNumber: '',
      IFSCCode: '',
      UPIId: '',
    },
    growJunctionSelected: false,
  }
  const setNewPassword = () => {
    if (!passwordRef.current.value && !confirmPasswordRef.current.value) {
      toast.error(`Please enter Password and confirm Password.`)
      return
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      toast.error(`Password or confirm Password do not match.`)
      return
    }
    if (student) {
      debugger
      ;(async () => {
        try {
          await changePassword(student?.username, passwordRef.current.value)
          setPassword()
          toast.success('Password changed successfully.')
        } catch (error) {
          debugger
          toast.error(`Save Error:${error}`)
        }
      })()
    } else {
      toast.error(`User does not exist`)
    }
  }

  const saveMentor = async (profileState) => {
    debugger
    if (id == 'undefined') {
      try {
        await API.graphql({
          query: createMentorRegister,
          variables: { input: { ...state, ...profileState } },
        })
        setMentors(dispatch)
        toast.success('Profile added successfully')
      } catch (err) {
        toast.error(`Save Error:${error.errors[0].message}`)
      }
    } else {
      const {
        createdAt,
        updatedAt,
        student_profile_url,
        profile_image_url,
        ...rest
      } = {
        ...state,
        ...profileState,
      }
      rest.id = id

      rest.time_zone = timeZone
      // const { createdAt, profile_image_url, ...rest } = {
      //   ...state,
      //   ...remaining,
      // }
      try {
        await API.graphql({
          query: updateMentorRegister,
          variables: {
            input: { ...rest },
            // condition: { username: { contains: state.username } },
          },
        })
        setMentors(dispatch)
        toast.success('Profile updated successfully')
      } catch (error) {
        debugger
        toast.error(`Save Error:${error.errors[0].message}`)
        console.log(error)
      }
      // await API.graphql(
      //   graphqlOperation(updateMentorRegister, {
      //     input: { ...state, ...remaining },
      //     authMode: 'AMAZON_COGNITO_USER_POOLS',
      //   }),
      // )
    }
  }
  const setDelete = async (values) => {
    const {
      createdAt,
      updatedAt,
      student_profile_url,
      profile_image_url,
      ...rest
    } = {
      id,
      ...state,
      ...values,
      deleted: true,
    }
    // const { createdAt, profile_image_url, ...rest } = {
    //   ...state,
    //   ...remaining,
    // }
    try {
      await API.graphql({
        query: updateMentorRegister,
        variables: {
          input: { ...rest, access: mentor.access },
          // condition: { username: { contains: state.username } },
        },
      })
      setMentors(dispatch)
      toast.success('Profile set to delete')
    } catch (error) {
      debugger
      toast.error(`Save Error:${error.errors[0].message}`)
      console.log(error)
    }
  }
  const setPassword = async () => {
    const {
      createdAt,
      updatedAt,
      student_profile_url,
      profile_image_url,
      ...rest
    } = {
      id,
      ...state,
      password: passwordRef.current.value,
    }
    // const { createdAt, profile_image_url, ...rest } = {
    //   ...state,
    //   ...remaining,
    // }
    try {
      await API.graphql({
        query: updateMentorRegister,
        variables: {
          input: { ...rest },
          // condition: { username: { contains: state.username } },
        },
      })
      // toast.success('Password reset successfully')
    } catch (error) {
      debugger
      // toast.error(`Save Error:${error.errors[0].message}`)
      console.log(error)
    }
  }
  const setDeactivate = async (values) => {
    debugger
    const {
      createdAt,
      updatedAt,
      student_profile_url,
      profile_image_url,
      ...rest
    } = {
      id,
      ...state,
      ...values,
      access: mentor.access,
      active: !state.active,
    }
    // const { createdAt, profile_image_url, ...rest } = {
    //   ...state,
    //   ...remaining,
    // }
    try {
      await API.graphql({
        query: updateMentorRegister,
        variables: {
          input: { ...rest },
          // condition: { username: { contains: state.username } },
        },
      })
      setMentors(dispatch)
      toast.success(
        `Profile ${state.active ? 'Deactivated' : 'activated'} successfully`,
      )
    } catch (error) {
      debugger
      toast.error(`Save Error:${error.errors[0].message}`)
      console.log(error)
    }
  }
  const [years, setYears] = useState([])
  useEffect(() => {
    const d = new Date()
    const tmpYears = []
    let year = d.getFullYear()
    for (let i = year; i >= year - 50; i--) {
      tmpYears.push(i)
    }
    setYears(tmpYears)
  }, [])
  const [state, setState] = useState(initialState)
  const { mentors } = useSelector((state) => state.MentorHeaderReducer)
  const mentor = mentors.find((i) => i.id === id)
  useEffect(() => {
    let newState = { state }
    newState.access = state.access

    if (mentor) {
      debugger
      newState = {
        about_yourself: {
          //   grow_junction_url,
          first_name: mentor.about_yourself?.first_name,
          last_name: mentor.about_yourself?.last_name,
          short_description: mentor.about_yourself?.short_description,
          about_yourself: mentor.about_yourself?.about_yourself,
        },
        // current_employee,
        linkedIn_url: mentor.linkedIn_url,
        degree: mentor.degree,
        experience: mentor.experience,
        // recent_college,
        // your_role,
        username: mentor.username,
        social: {
          linkedin_url: mentor.social?.linkedIn_url,
          facebook_url: mentor.social?.facebook_url,
          instagram_url: mentor.social?.instagram_url,
          personal_web_url: mentor.social?.personal_web_url,
          other_url: mentor.social?.other_url,
        },
        contact_info: {
          email: mentor.contact_info?.email || mentor.username,
          mobile: mentor.contact_info?.mobile,
          whatsapp: mentor.contact_info?.whatsapp,
        },
        education: {
          degree: mentor.education?.degree,
          college_university: mentor.education?.college_university,
          course: mentor.education?.course,
          graduation_year: mentor.education?.graduation_year,
        },
        professional_info: {
          occupation: mentor.professional_info?.occupation,
          organization: mentor.professional_info?.organization,
          location: mentor.professional_info?.location,
          position: mentor.professional_info?.position,
          experience: {
            years: mentor.professional_info?.experience?.years,
            months: mentor.professional_info?.experience?.months,
          },
        },
        profile_image: mentor.profile_image,
        active: !!mentor.active,
        time_zone: mentor.time_zone,
        bankDetails: {
          accountName: mentor.bankDetails?.accountName || '',
          bankName: mentor.bankDetails?.bankName || '',
          accountNumber: mentor.bankDetails?.accountNumber || '',
          IFSCCode: mentor.bankDetails?.IFSCCode || '',
          UPIId: mentor.bankDetails?.UPIId || '',
        },
        growJunctionSelected: mentor.growJunctionSelected || false,
        time_zone: mentor.time_zone,
        // access: mentor?.access || state.access,
        // student_profile,
      }
      if (mentor.time_zone) setTimeZone(mentor.time_zone.value)
      if (mentor.access && newState?.access) {
        Object.keys(newState?.access).forEach((item) => {
          newState.access[item] = false
        })
        mentor.access.forEach((item) => {
          newState.access[item.toUpperCase()] = true
        })
      } else {
        newState.access = state.access
      }
      if (mentor.revenueShare) {
        newState.revenueShare = mentor.revenueShaare
      } else {
        newState.revenueShare = state.revenueShare
      }
      setState(newState)
      if (newState.time_zone) setTimeZone(newState.time_zone)
    }
  }, [mentor])
  console.log('state', state)
  // console.log('agreeDeleteRef.current', agreeDeleteRef.current?.checked)
  return (
    <main className="flex flex-col">
      <section className="flex justify-end px-[20px] py-5">
        <button
          className={`${classes.btn} flex justify-center items-center bg-white border-2 border-gray-900 hover:border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 w-1/2 rounded-md mr-5`}
          type="button"
          onClick={setDeactivate.bind(null, state)}
        >
          <span className="text-lg font-semibold py-2">
            {state.active ? 'Deactivate' : 'Activate'}
          </span>
        </button>
      </section>
      <section className="flex flex-col flex-grow flex-shrink-0">
        <Formik
          initialValues={{ ...state }}
          enableReinitialize={true}
          validationSchema={mentorRegisterSchema}
          onSubmit={async (values, e) => {
            values.linkedIn_url = values.social?.linkedin_url
            // values.degree = values.education?.degree

            // values.experience =
            //   values.professional_info.experience.years +
            //   ' years ' +
            //   values.professional_info.experience.months +
            //   ' months'
            const obj = []
            Object.keys(values?.access).forEach((item) => {
              // debugger
              if (values.access[item]) obj.push(item)
            })
            // values.access = obj
            saveMentor({ ...values, access: obj })

            // try {
            //   await API.graphql({
            //     query: createStudentRegister,
            //     variables: { input: { ...data } },
            //   })
            //   setStudents(dispatch)
            //   toast.success('Learner added successfully')
            //   setTimeout(() => {
            //     setShow(false)
            //   }, 1000)
            //   // window.location.href = window.location.href
            // } catch (error) {
            //   console.log('create error', error)
            //   toast.error(`Save Error:${error.errors[0].message}`)
            // }
          }}
          // validateOnMount={true}
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
            console.log('errors', errors)
            return (
              <form>
                <div className="text-2xl text-gray-900 bold px-[40px]">
                  Profile details
                </div>
                <main className="flex flex-wrap">
                  <section className="w-1/2">
                    <header className="text-2xl px-[50px] mt-[30px]">
                      About yourself
                    </header>
                    <div className="flex flex-col justify-start items-start px-[50px] py-4">
                      <section className="flex w-full gap-3">
                        <section className="w-1/2">
                          <div className="text-lg font-normal mb-2 mt-5">
                            First Name
                          </div>
                          <div className="flex flex-wrap items-stretch w-full border-2 ">
                            <TextField
                              onChangeValue={handleChange}
                              value={values.about_yourself.first_name}
                              type="text"
                              name="about_yourself.first_name"
                              placeholder="First Name"
                              errMsg={
                                touched.about_yourself?.first_name &&
                                errors.about_yourself?.first_name
                              }
                            />
                          </div>
                        </section>
                        <section className="w-1/2">
                          <div className="text-lg font-normal mb-2 mt-5">
                            Last Name
                          </div>
                          <div className="flex flex-wrap items-stretch w-full border-2 ">
                            <TextField
                              name="about_yourself.last_name"
                              onChangeValue={handleChange}
                              value={values.about_yourself.last_name}
                              type="text"
                              id="lastName"
                              placeholder="Last Name"
                              errMsg={
                                touched.about_yourself?.last_name &&
                                errors.about_yourself?.last_name
                              }
                            />
                          </div>
                        </section>
                      </section>
                      <div className="text-lg font-normal mb-2 mt-5">
                        Write a short Description
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="about_yourself.short_description"
                          onChangeValue={handleChange}
                          value={values.about_yourself.short_description}
                          placeholder="Short description"
                        />
                      </div>
                      <span className="flex justify-start text-xs -mt-4">
                        Short description in 20 characters or less
                      </span>
                      <div className="text-lg font-normal mb-2 mt-5">
                        Tell us about yourself
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <textarea
                          name="about_yourself.about_yourself"
                          value={values.about_yourself.about_yourself}
                          onChange={handleChange}
                          placeholder="About yourself"
                          className={`text-lg w-full bg-gray-50 h-[90px] ${classes['text-area']}`}
                        />
                      </div>
                      <span className="flex justify-start text-xs mt-0">
                        Describe yourself in 500 characters or less
                      </span>
                      <header className="text-2xl  my-[30px]">
                        Grow Junction Selected
                      </header>
                      <div className="flex justify-start w-full">
                        <input
                          type="checkbox"
                          name="growJunctionSelected"
                          value={values.growJunctionSelected}
                          checked={values.growJunctionSelected}
                          onChange={handleChange}
                        ></input>

                        <span className="pl-5 text-xl">
                          Grow Juction Selected
                        </span>
                      </div>
                    </div>
                  </section>
                  <section className="w-1/2">
                    <header className="text-2xl px-[50px] mt-[30px]">
                      Social Links
                    </header>
                    <div className="flex flex-col justify-start items-start px-[50px] py-4">
                      <div className="text-lg font-normal mb-2 mt-5">
                        LinkedIn URL
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="social.linkedin_url"
                          onChangeValue={handleChange}
                          value={values.social.linkedin_url}
                          type="text"
                          placeholder="Linkedin Url"
                        />
                      </div>

                      <div className="text-lg font-normal mb-2 mt-5">
                        Facebook URL
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="social.facebook_url"
                          onChangeValue={handleChange}
                          value={values.social.facebook_url}
                          type="text"
                          placeholder="Facebook Url"
                        />
                      </div>
                      <div className="text-lg font-normal mb-2 mt-5">
                        Instagram URL (optional)
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="social.instagram_url"
                          onChangeValue={handleChange}
                          value={values.social.instagram_url}
                          placeholder="Instagram Url"
                        />
                      </div>

                      <div className="text-lg font-normal mb-2 mt-5">
                        Personal Website URL (optional)
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="social.personal_web_url"
                          onChangeValue={handleChange}
                          value={values.social.personal_web_url}
                          type="mobile"
                          placeholder="Personal Web Url"
                          errMsg={touched.mobile && errors.mobile}
                        />
                      </div>
                      <div className="text-lg font-normal mb-2 mt-5">
                        Other URL (optional)
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="social.other_url"
                          onChangeValue={handleChange}
                          value={values.social.other_url}
                          placeholder="Other Url"
                          errMsg={touched.mobile && errors.mobile}
                        />
                      </div>
                    </div>
                  </section>
                  <section className="w-1/2">
                    <header className="text-2xl px-[50px] mt-[30px]">
                      Education Info
                    </header>
                    <div className="flex flex-col justify-start items-start px-[50px] py-4">
                      <div className="text-lg font-normal mb-2 mt-5">
                        Degree ( Optional )
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="education.degree"
                          onChangeValue={handleChange}
                          value={values.education.degree}
                          type="text"
                          placeholder="Degree"
                        />
                      </div>

                      <div className="text-lg font-normal mb-2 mt-5">
                        College / University (Optional)
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="education.college_university"
                          onChangeValue={handleChange}
                          value={values.education.college_university}
                          type="text"
                          placeholder="College University"
                        />
                      </div>
                      <div className="text-lg font-normal mb-2 mt-5">
                        Cohort
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="education.course"
                          onChangeValue={handleChange}
                          value={values.education.course}
                          placeholder="Cohort"
                        />
                      </div>

                      <div className="text-lg font-normal mb-2 mt-5">
                        Graduation year
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <select
                          onChange={handleChange}
                          value={values.education.graduation_year}
                          name="education.graduation_year"
                          className="h-16 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        >
                          <option value="" selected>
                            Select
                          </option>
                          {years.map((year, index) => (
                            <option key={index} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </section>
                  <section className="w-1/2">
                    <header className="text-2xl px-[50px] mt-[30px]">
                      Contact Info
                    </header>
                    <div className="flex flex-col justify-start items-start px-[50px] py-4">
                      <div className="text-lg font-normal mb-2 mt-5">
                        E Mail
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="contact_info.email"
                          onChangeValue={handleChange}
                          value={values.contact_info.email}
                          type="email"
                          placeholder="Email"
                          errMsg={
                            touched.contact_info?.email &&
                            errors.contact_info?.email
                          }
                        />
                      </div>

                      <div className="text-lg font-normal mb-2 mt-5">
                        Mobile Number
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          placeholder="0000 000 000"
                          onChangeValue={handleChange}
                          name="contact_info.contact_info.mobile"
                          value={values.contact_info.mobile}
                          phoneNumber={true}
                        />
                        //
                      </div>
                      <div className="text-lg font-normal mb-2 mt-5">
                        Whatsapp Number
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          id="number"
                          placeholder="0000 000 000"
                          onChangeValue={handleChange}
                          name="contact_info.whatsapp"
                          value={values.contact_info.whatsapp}
                          phoneNumber={true}
                        />
                      </div>
                    </div>
                  </section>
                  <section className="w-1/2">
                    <header className="text-2xl px-[50px] mt-[30px]">
                      Professional Info (Optional)
                    </header>
                    <div className="flex flex-col justify-start items-start px-[50px] py-4">
                      <div className="text-lg font-normal mb-2 mt-5">
                        Occupation
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="professional_info.occupation"
                          onChangeValue={handleChange}
                          value={values.professional_info.occupation}
                          type="text"
                          placeholder="Occupation"
                        />
                      </div>

                      <div className="text-lg font-normal mb-2 mt-5">
                        Organization
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="professional_info.organization"
                          onChangeValue={handleChange}
                          value={values.professional_info.organization}
                          type="text"
                          placeholder="Organization"
                        />
                      </div>
                      <div className="text-lg font-normal mb-2 mt-5">
                        Location
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="professional_info.location"
                          onChangeValue={handleChange}
                          value={values.professional_info.location}
                          type="text"
                          placeholder="Location"
                        />
                      </div>
                      <div className="text-lg font-normal mb-2 mt-5">
                        Position
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="professional_info.position"
                          onChangeValue={handleChange}
                          value={values.professional_info.position}
                          placeholder="Position"
                        />
                      </div>

                      <div className="text-lg font-normal mb-2 mt-5">
                        Experience
                      </div>
                      <div className="flex w-full">
                        <div className=" text-lg w-1/2">
                          <label className="leading-8 text-lg font-normal mt-5">
                            Years
                          </label>
                          <select
                            onChange={handleChange}
                            value={values.professional_info.experience.years}
                            name="professional_info.experience.years"
                            className="h-16 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                          >
                            {Array.from({ length: 51 }, (x, i) => i).map(
                              (i) => (
                                <option
                                  key={`${i}`}
                                  value={String(i).padStart(2, '0')}
                                >
                                  {String(i).padStart(2, '0')}
                                </option>
                              ),
                            )}
                          </select>
                        </div>
                        <div className="ml-2 text-lg w-1/2">
                          <label className="leading-8 text-lg font-normal mt-5">
                            Months
                          </label>
                          <select
                            id="expmonths"
                            onChange={handleChange}
                            value={values.professional_info.experience.months}
                            name="professional_info.experience.months"
                            className="h-16 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                          >
                            {Array.from({ length: 12 }, (x, i) => i).map(
                              (i) => (
                                <option
                                  key={`${i}`}
                                  value={String(i).padStart(2, '0')}
                                >
                                  {String(i).padStart(2, '0')}
                                </option>
                              ),
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="w-1/2">
                    <header className="text-2xl px-[50px] mt-[30px]">
                      Other details
                    </header>
                    <div className="flex flex-col justify-start items-start px-[50px] py-4">
                      <div className="text-lg font-normal mb-2 mt-5">
                        Select Currency
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <select
                          id="currency"
                          name="currency"
                          value={values.currency}
                          onChange={handleChange}
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="₹">₹</option>
                          <option value="$">$</option>
                        </select>
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                      <div className="text-lg font-normal mb-2 mt-5">
                        TimeZone
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TimezoneSelect
                          value={timeZone}
                          className="w-full"
                          // value={values.time_zone}

                          // onChange={(val)=>handleChange(val)}
                          onChange={setTimeZone}
                          // labelStyle="altName"
                          timezones={{
                            ...allTimezones,
                            'America/Lima': 'Pittsburgh',
                            'Europe/Berlin': 'Frankfurt',
                          }}
                        />
                      </div>
                    </div>
                    <header className="text-2xl px-[50px] mt-[30px] mb-5">
                      Access
                    </header>
                    <div className="flex flex-col gap-4 flex-wrap items-stretch w-full">
                      {Object.keys(values?.access).map((item, index) => (
                        <div key={item} className="my-2">
                          <input
                            type="checkbox"
                            id={`access${item}`}
                            name={`access[${item}]`}
                            checked={values.access[item]}
                            onChange={handleChange}
                            style={{ marginLeft: 50, marginRight: 10 }}
                            value={values.access[item]}
                          />
                          <label
                            // style={{ textTransform: 'lowercase', marginRight: 10 }}
                            className="text-lg capitalize mr-5"
                            htmlFor={`access${item}`}
                          >
                            {item.toLowerCase()}
                          </label>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section className="w-1/2">
                    <header className="text-2xl px-[50px] mt-[30px]">
                      Bank Information
                    </header>
                    <div className="flex flex-col justify-start items-start px-[50px] py-4">
                      <div className="text-lg font-normal mb-2 mt-5">
                        Account Name
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="bankDetails.accountName"
                          value={values.bankDetails?.accountName}
                          onChangeValue={handleChange}
                          placeholder="Account Name"
                        />
                      </div>
                      <div className="text-lg font-normal mb-2 mt-5">
                        Bank Name
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="bankDetails.bankName"
                          value={values.bankDetails?.bankName}
                          onChangeValue={handleChange}
                          placeholder="Bank Name"
                        />
                      </div>
                      <div className="text-lg font-normal mb-2 mt-5">
                        Account Number
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="bankDetails.accountNumber"
                          value={values.bankDetails?.accountNumber}
                          onChangeValue={handleChange}
                          placeholder="Account Number"
                        />
                      </div>
                      <div className="text-lg font-normal mb-2 mt-5">
                        IFSC Code
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="bankDetails.IFSCCode"
                          value={values.bankDetails?.IFSCCode}
                          onChangeValue={handleChange}
                          placeholder="IFSC Code"
                        />
                      </div>
                      <div className="text-lg font-normal mb-2 mt-5">
                        UPI ID
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          name="bankDetails.UPIId"
                          value={values.bankDetails?.UPIId}
                          onChangeValue={handleChange}
                          placeholder="UPI ID"
                        />
                      </div>
                      <div className="text-lg font-normal mb-[30px] mt-5">
                        Account Type
                      </div>
                      <div className="flex flex-wrap items-stretch w-full">
                        <label
                          className="mr-3 text-lg leading-8 "
                          htmlFor="savings"
                        >
                          Savings
                        </label>
                        <input
                          type="radio"
                          name="bankDetails.accountType"
                          value="Savings"
                          id="savings"
                          onChange={handleChange}
                          className="mr-5"
                          checked={
                            values.bankDetails?.accountType === 'Savings'
                          }
                        />
                        <label
                          className="mr-3 text-lg leading-8 "
                          htmlFor="current"
                        >
                          Current
                        </label>
                        <input
                          type="radio"
                          id="current"
                          value="Current"
                          name="bankDetails.accountType"
                          onChange={handleChange}
                          className="mr-5"
                          checked={
                            values.bankDetails?.accountType === 'Current'
                          }
                        />
                      </div>
                    </div>

                    <header className="text-2xl  mt-[30px]">
                      Delete Mentor
                    </header>
                    <div className="flex justify-start w-full py-5">
                      <input
                        type="checkbox"
                        id="agree"
                        checked={agreeDelete}
                        onChange={() => setAgreeDelete(!agreeDelete)}
                      ></input>

                      <label className="pl-5 text-xl" htmlFor="agree">
                        I agree to delete the mentor profile
                      </label>
                    </div>
                    <div className="flex justify-end w-full">
                      <Button
                        label="Delete"
                        classOverride="bg-[#ffbf00]"
                        disable={!agreeDelete}
                        styleOverride={{
                          height: 38,
                          // backgroundColor: '#ffbf00',
                          color: 'black',
                          border: '1px solid black',
                          fontSize: 12,
                        }}
                        containerOverride={{
                          // marginLeft: 10,
                          maxWidth: '150px',
                          marginBottom: 20,
                          marginTop: 20,
                        }}
                        // loader={loader}
                        onClick={setDelete.bind(null, values)}
                      />
                    </div>

                    <div className="px-[50px]">
                      <Button
                        label="Save"
                        styleOverride={{
                          height: 38,
                          backgroundColor: '#ffbf00',
                          color: 'black',
                          border: '1px solid black',
                          fontSize: 12,
                        }}
                        onClick={handleSubmit}
                        containerOverride={{
                          // marginLeft: 10,
                          maxWidth: '150px',
                          marginBottom: 20,
                          // marginTop: 20,
                        }}
                        // loader={loader}
                      />
                    </div>
                  </section>

                  <section className="w-1/2">
                    <header className="text-2xl px-[50px] mt-[30px]">
                      Revenue Share
                    </header>
                    <div className="flex flex-col justify-start items-start px-[50px] py-4">
                      <div className="text-lg font-normal my-5">
                        Revenue share in %
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        {values.revenueShare &&
                          values.revenueShare.map((item, index) => (
                            <div
                              key={item}
                              className="my-2 ml-3 w-full flex justify-between"
                            >
                              <label
                                // style={{ textTransform: 'lowercase', marginRight: 10 }}
                                className="text-lg w-2/5 capitalize mr-5"
                                htmlFor={`revenueShare${item.serviceType}`}
                              >
                                {item.serviceType.toLowerCase()}
                              </label>
                              <TextField
                                id={`revenueShare[${index}].revenueShare`}
                                name={`revenueShare[${index}].revenueShare`}
                                onChangeValue={handleChange}
                                type="number"
                                className="w-3/5"
                                value={values.revenueShare[index]?.revenueShare}
                                errMsg={
                                  touched.revenueShare?.[index]?.revenueShare &&
                                  errors.revenueShare?.[index]?.revenueShare
                                }
                              />
                            </div>
                          ))}
                      </div>
                    </div>

                    <header className="text-2xl px-[50px] mt-[30px]">
                      Change Password
                    </header>
                    <div className="flex flex-col justify-start items-start px-[50px] py-4">
                      <div className="text-lg font-normal mb-2 mt-5">
                        New password
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          ref={passwordRef}
                          onChangeValue={() => {}}
                          type="password"
                          placeholder="New Password"
                        />
                      </div>

                      <div className="text-lg font-normal mb-2 mt-5">
                        Retype new password
                      </div>
                      <div className="flex flex-wrap items-stretch w-full border-2 ">
                        <TextField
                          type="password"
                          onChangeValue={() => {}}
                          ref={confirmPasswordRef}
                          placeholder="Retype new Password"
                        />
                      </div>
                      <div className="flex justify-end w-full">
                        <Button
                          label="Change Password"
                          classOverride="bg-[#ffbf00]"
                          styleOverride={{
                            height: 38,
                            // backgroundColor: '#ffbf00',
                            color: 'black',
                            border: '1px solid black',
                            fontSize: 12,
                          }}
                          containerOverride={{
                            // marginLeft: 10,
                            maxWidth: '200px',
                            marginBottom: 20,
                            marginTop: 20,
                          }}
                          // loader={loader}
                          onClick={setNewPassword}
                        />
                      </div>
                    </div>
                  </section>
                </main>
              </form>
            )
          }}
        </Formik>
      </section>
    </main>
  )
}

export default MentorEdit
