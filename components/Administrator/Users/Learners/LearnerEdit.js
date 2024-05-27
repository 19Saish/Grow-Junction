import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Formik } from 'formik'
import classes from './LearnerEdit.module.css'
import Button from '../../../../pages/ui-kit/Button'
import TextField from '../../../../pages/ui-kit/TextField'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { API } from 'aws-amplify'
import { setStudents } from '../../../../redux/actions/StudentTitleAction'
import { studentRegisterSchema } from '../../../../public/utils/schema'
import {
  changePassword,
  setS3FileUrl,
  sendEmail,
} from '../../../../utilities/others'
import {
  createStudentRegister,
  updateStudentRegister,
} from '../../../../src/graphql/mutations'
const reminderTemplate = `
<h1>Sign Up</h1>
<p>Please signup to the system by visiting the Grow junction Portal</p>
`
const LearnerEdit = ({ id }) => {
  const dispatch = useDispatch()
  const [profile, setProfile] = useState()
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
    degree: '',
    experience: '',
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
    active: false,
    student_profile: '',
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
  const handleProfileInput = (e) => {
    // handle validations
    if (e.target.files?.[0]) {
      setProfile(e.target.files[0])
    } else {
      setProfile(null)
    }
  }
  const saveStudent = async (profileState) => {
    const { profile, ...remaining } = profileState
    if (profile) {
      const name = profile.name.substr(0, profile.name.lastIndexOf('.'))
      const ext = profile.name.substr(profile.name.lastIndexOf('.') + 1)
      const filename = `${name}_${uuid()}.${ext}`
      await setS3FileUrl(filename, profile, remaining.student_profile)
      // await Storage.put(filename, profile_image_file, {
      //   contentType: `image/${ext}`, // contentType is optional
      // })
      remaining.student_profile = filename
    }
    if (id == 'undefined') {
      try {
        await API.graphql({
          query: createStudentRegister,
          variables: { input: { ...state, ...remaining } },
        })
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
        ...remaining,
      }
      rest.id = id
      // const { createdAt, profile_image_url, ...rest } = {
      //   ...state,
      //   ...remaining,
      // }
      try {
        await API.graphql({
          query: updateStudentRegister,
          variables: {
            input: { ...rest },
            // condition: { username: { contains: state.username } },
          },
        })
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
        query: updateStudentRegister,
        variables: {
          input: { ...rest },
          // condition: { username: { contains: state.username } },
        },
      })
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
        query: updateStudentRegister,
        variables: {
          input: { ...rest },
          // condition: { username: { contains: state.username } },
        },
      })
      toast.success('Profile set to delete')
    } catch (error) {
      debugger
      toast.error(`Save Error:${error.errors[0].message}`)
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
      active: !state.active,
    }
    // const { createdAt, profile_image_url, ...rest } = {
    //   ...state,
    //   ...remaining,
    // }
    try {
      await API.graphql({
        query: updateStudentRegister,
        variables: {
          input: { ...rest },
          // condition: { username: { contains: state.username } },
        },
      })
      setStudents(dispatch)
      toast.success('Profile Deactivated')
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
  const { students } = useSelector((state) => state.StudentHeaderReducer)
  const student = students.find((i) => i.id === id)
  useEffect(() => {
    let newState = { state }
    if (student) {
      newState = {
        about_yourself: {
          //   grow_junction_url,
          first_name: student.about_yourself?.first_name,
          last_name: student.about_yourself?.last_name,
          short_description: student.about_yourself?.short_description,
          about_yourself: student.about_yourself?.about_yourself,
        },
        // current_employee,
        linkedIn_url: student.linkedIn_url,
        degree: student.degree,
        experience: student.experience,
        // recent_college,
        // your_role,
        username: student.username,
        social: {
          linkedin_url: student.social?.linkedIn_url,
          facebook_url: student.social?.facebook_url,
          instagram_url: student.social?.instagram_url,
          personal_web_url: student.social?.personal_web_url,
          other_url: student.social?.other_url,
        },
        contact_info: {
          email: student.contact_info?.email,
          mobile: student.contact_info?.mobile,
          whatsapp: student.contact_info?.whatsapp,
        },
        education: {
          degree: student.education?.degree,
          college_university: student.education?.college_university,
          course: student.education?.course,
          graduation_year: student.education?.graduation_year,
        },
        professional_info: {
          occupation: student.professional_info?.occupation,
          organization: student.professional_info?.organization,
          location: student.professional_info?.location,
          position: student.professional_info?.position,
          experience: {
            years: student.professional_info?.experience?.years,
            months: student.professional_info?.experience?.months,
          },
        },
        profile_image: student.profile_image,
        active:student.active
        // student_profile,
      }
      setState(newState)
    }
  }, [student])
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
          validationSchema={studentRegisterSchema}
          onSubmit={async (values, e) => {
            values.linkedIn_url = values.social?.linkedin_url
            values.degree = values.education?.degree

            values.experience =
              values.professional_info.experience.years +
              ' years ' +
              values.professional_info.experience.months +
              ' months'
            saveStudent(values)

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
                          className={`w-full bg-gray-50 h-[100px] ${classes['text-area']}`}
                        />
                      </div>
                      <span className="flex justify-start text-xs -mt-4">
                        Describe yourself in 500 characters or less
                      </span>
                      <label className="leading-8 cursor-pointer text-sm font-normal mt-5">
                        Upload Resume / CV (optional)
                      </label>

                      <input
                        type="file"
                        ref={profileInputRef}
                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,application/pdf"
                        className="absolute w-0 h-0 left-0 top-0"
                        onChange={handleProfileInput}
                      />

                      <div
                        className="flex cursor-pointer justify-between text-gray-400 bg-gray-50 border-2 p-3 flex-wrap items-stretch w-full mb-5 relative"
                        onClick={(e) => {
                          e.preventDefault()
                          profileInputRef.current.click()
                        }}
                      >
                        <span>Upload file (Max Size 5 MB)</span>
                        <img src="/assets/icon/mentor-dashboard/upload.svg" />
                      </div>
                      {profile ? (
                        <div className="flex mt-5 justify-start text-sm">
                          {`Your Resume: ${profile?.name}`}
                        </div>
                      ) : (
                        values.student_profile_url && (
                          <div className="flex justify-start text-sm -mt-4">
                            <a href={values.student_profile_url}>
                              {`Your Resume: ${values.student_profile}`}
                            </a>
                          </div>
                        )
                      )}
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
                                <option value={String(i).padStart(2, '0')}>
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
                                <option value={String(i).padStart(2, '0')}>
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
                    <header className="text-2xl px-[50px] mt-[30px]">
                      Delete Learner
                    </header>
                    <div className="flex flex-col justify-start items-start px-[50px] py-4">
                      <div className="flex justify-start w-full py-5">
                        <input
                          type="checkbox"
                          checked={agreeDelete}
                          onChange={() => setAgreeDelete(!agreeDelete)}
                        ></input>

                        <span className="pl-5 text-xl">
                          I agree to delete the learner profile
                        </span>
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
                    </div>
                  </section>
                  <section className="w-1/2">
                    <header className="text-2xl px-[50px] mt-[30px]">
                      User Type
                    </header>
                    <div className="flex flex-col justify-start items-start px-[50px] py-4">
                      <div className="flex justify-start w-full py-5">
                        <input
                          disabled
                          type="checkbox"
                          checked={id !== 'undefined'}
                        ></input>

                        <span className="pl-5 text-xl">Authenticated</span>
                      </div>
                      <div className="flex justify-start w-full py-5">
                        <input
                          disabled
                          type="checkbox"
                          checked={id == 'undefined'}
                        ></input>

                        <span className="pl-5 text-xl">Unauthenticated</span>
                      </div>
                      <Button
                        label="Send Reminder"
                        disable={id !== 'undefined'}
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
                        onClick={async () => {
                          if (values.contact_info?.email) {
                            try {
                              await sendEmail(
                                values.contact_info.email,
                                'ramkrishnaindalkar@gmail.com',
                                reminderTemplate,
                                'Please signup',
                              )
                              toast.success('Success')
                            } catch (error) {
                              toast.error(JSON.stringify(error))
                            }
                          }
                        }}
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
                </main>
              </form>
            )
          }}
        </Formik>
      </section>
    </main>
  )
}

export default LearnerEdit
