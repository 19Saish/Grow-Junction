import React, { useState, useEffect, useRef } from 'react'
import { Formik, useFormikContext } from 'formik'
import TextField from '../../../pages/ui-kit/TextField'
import classes from './ProfileInfo.module.css'
import ProgressBar from '../../Utilities/ProgressBar'

const AutoSubmitToken = () => {
  // Grab values and submitForm from context
  const { values, submitForm } = useFormikContext()

  React.useEffect(() => {
    console.log('context_values', values)
    // setProfile(values)
    // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
    // if (values.token.length === 6) {
    //   submitForm();
    // }
  }, [values, submitForm])
  return null
}
const ProfileInfo = ({
  about_yourself,
  social,
  // currency,
  // time_zone,
  // profile_image,
  profile_image_url,
  setProfileState,
  percentage,
  student_profile_url,
  student_profile,
}) => {
  const imageInputref = useRef()
  const profileInputref = useRef()
  const [image, setImage] = useState()
  const [profile, setProfile] = useState()

  const [convertedImage, setConvertedImage] = useState()
  const [state, setState] = useState({
    about_yourself,
    social,
    // currency,
    // time_zone,

    profile_image_url,
    percentage,
    student_profile_url,
    setProfileState,
    student_profile,
  })
  debugger
  // const [timeZone, setTimeZone] = useState(
  //   time_zone || {},
  //   // Intl.DateTimeFormat().resolvedOptions().timeZone,
  // )
  useEffect(() => {
    // setTimeZone(time_zone)
    setState({
      about_yourself,
      social,
      // currency,
      // time_zone,
      profile_image_url,
      student_profile_url,
      student_profile,
      // setProfileState,
    })
  }, [
    about_yourself,
    social,
    profile_image_url,
    student_profile_url,
    student_profile,
  ])
  // useEffect(()=>{
  //   console.log("ProfileValues",values)
  // },[values])
  const getImage = async () => {
    // const image_key = await Storage.get(profile_image)
    setConvertedImage(profile_image_url)
  }
  debugger
  console.log('app', {
    about_yourself,
    social,
    profile_image_url,
    student_profile_url,
    // profile_image_url,
    setProfileState,
  })
  useEffect(() => {
    if (profile_image_url) {
      getImage()
    }
  }, [profile_image_url])
  const handleFileInput = (e) => {
    // handle validations
    if (e.target.files?.[0]) {
      setImage(e.target.files[0])
    } else {
      setImage(null)
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

  return (
    <>
      <Formik
        initialValues={{ ...state }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false)
          }, 400)
          // values.time_zone = timeZone?.value || ''
          values.profile_image_file = image
          values.student_profile_file = profile
          setProfileState({ ...values })
        }}
        enableReinitialize={true}
        // validateOnChange={true}
        // validateOnBlur={true}
        // validateOnMount={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => {
          debugger
          console.log('values', values)
          return (
            <form>
              <div className="flex flex-col md:flex-row">
                <div className="bg-gray-50 basis-3/5">
                  <div className="flex flex-col tracking-wide text-black ml-4 bg-gray-50 w-full md:w-auto lg:w-auto">
                    <div className="m-10 flex flex-col md:flex-row lg:flex-row">
                      <div className="flex flex-row">
                        <div
                          className={`${classes['img-profile']} bg-gray-300 rounded-full`}
                        >
                          {image ? (
                            <img
                              src={URL.createObjectURL(image)}
                              alt=""
                              className={`${classes['img-profile']} rounded-full`}
                            />
                          ) : convertedImage ? (
                            <img
                              src={convertedImage}
                              alt=""
                              className={`${classes['img-profile']} rounded-full`}
                            />
                          ) : null}
                        </div>
                      </div>
                      <div className=" mt-16 px-8 py-2">
                        <button className="flex justify-center items-center bg-black hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full min-w-40">
                          <img
                            src="../../../assets/icon/plus.png"
                            alt=""
                            className="w-7 h-7"
                          />
                          <button
                            className="ml-3 text-lg"
                            onClick={(e) => {
                              e.preventDefault()
                              imageInputref.current.click()
                            }}
                          >
                            Add image
                          </button>
                          <input
                            type="file"
                            ref={imageInputref}
                            accept="image/*"
                            className="absolute w-0 h-0 left-0 top-0"
                            onChange={handleFileInput}
                          />
                        </button>
                        <p className="w-auto ml-3 mt-3 text-xs tracking-wide">
                          Recommended 256x256 px image
                        </p>
                      </div>
                    </div>
                    <div className="mb-16 ">
                      <ProgressBar progressPercentage={percentage} />
                    </div>
                    {/* <div className="flex flex-col ml-4 p-6 border-2 rounded-md bg-white">
                <div className="text-lg">40% of profile completed</div>
                <div className="flex w-1/2">
                  <div className="w-2/5 bg-gray-600 h-2 rounded-l-lg"></div>
                  <div className="w-3/5 bg-gray-300 h-2 rounded-r-lg"></div>
                </div>
                <p className="text-lg">
                  Complete 100% of the profile to get a better reach
                </p>
              </div> */}
                    <h2 className="p-2 leading-8 text-2xl font-semibold">
                      About Yourself
                    </h2>

                    <div className="flex flex-col font-normal mt-5 md:flex-row lg:flex-row">
                      <div className="px-2 text-sm w-full md:w-1/2 lg:w-1/2">
                        <label className="leading-8 text-lg font-normal mt-5">
                          First Name
                        </label>
                        <div className="flex flex-wrap items-stretch w-full relative">
                          <TextField
                            onChangeValue={handleChange}
                            value={values.about_yourself.first_name}
                            placeholder="First Name"
                            name="about_yourself.first_name"
                            type="text"
                            id="fname"
                          />
                        </div>
                      </div>
                      <div className="px-2 text-sm w-full md:w-1/2 lg:w-1/2">
                        <label className="leading-8 text-lg font-normal mt-5">
                          Last Name
                        </label>
                        <div className="flex flex-wrap items-stretch w-full relative">
                          <TextField
                            type="text"
                            placeholder="Last Name"
                            value={values.about_yourself.last_name}
                            onChangeValue={handleChange}
                            name="about_yourself.last_name"
                            id="lname"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-2">
                      <label className="leading-8 text-sm font-normal">
                        Write a short description
                      </label>
                      <div className="flex flex-wrap items-stretch w-full relative">
                        <TextField
                          type="text"
                          id="description"
                          placeholder="Short description"
                          onChangeValue={handleChange}
                          value={values.about_yourself.short_description}
                          name="about_yourself.short_description"
                        />
                      </div>
                      <span className="flex justify-start text-xs -mt-4">
                        Short description in 20 characters or less
                      </span>
                    </div>

                    <div className="px-2 mt-10">
                      <label className="leading-8 text-sm font-normal mt-5">
                        Tell us about yourself
                      </label>
                      <div className="flex flex-wrap items-stretch w-full relative">
                        <textarea
                          onChange={handleChange}
                          placeholder="About yourself"
                          value={values.about_yourself.about_yourself}
                          name="about_yourself.about_yourself"
                          className="w-full p-3"
                        ></textarea>
                      </div>
                      <span className="flex justify-start text-xs -mt-4">
                        Describe yourself in 500 characters or less
                      </span>
                    </div>
                    <div className="px-2 mt-10 flex flex-col">
                      <label className="leading-8 cursor-pointer text-sm font-normal mt-5">
                        Upload Resume / CV (optional)
                      </label>

                      <input
                        type="file"
                        ref={profileInputref}
                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,application/pdf"
                        className="absolute w-0 h-0 left-0 top-0"
                        onChange={handleProfileInput}
                      />

                      <div
                        className="flex cursor-pointer justify-between text-gray-400 bg-gray-50 border-2 p-3 flex-wrap items-stretch w-full mb-5 relative"
                        onClick={(e) => {
                          e.preventDefault()
                          profileInputref.current.click()
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
                    <h2 className="p-2 leading-8 text-2xl font-semibold mt-10 mb-5">
                      Social Links
                    </h2>
                    <div className="px-2">
                      <label className="leading-8 text-sm font-normal mt-5">
                        LinkedIn URL
                      </label>
                      <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                        <TextField
                          name="social.linkedin_url"
                          onChangeValue={handleChange}
                          value={values.social.linkedin_url}
                          type="url"
                          id="linkedurl"
                          placeholder="Enter URL here"
                        />
                      </div>
                    </div>
                    <div className="px-2">
                      <label className="leading-8 text-sm font-normal mt-5">
                        Facebook URL
                      </label>
                      <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                        <TextField
                          name="social.facebook_url"
                          onChangeValue={handleChange}
                          value={values.social.facebook_url}
                          type="url"
                          id="linkedurl"
                          placeholder="Enter URL here"
                        />
                      </div>
                    </div>
                    <div className="px-2">
                      <label className="leading-8 text-sm font-normal mt-5">
                        Instagram URL (optional)
                      </label>
                      <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                        <TextField
                          name="social.instagram_url"
                          onChangeValue={handleChange}
                          value={values.social.instagram_url}
                          type="url"
                          id="instagram"
                          placeholder="Enter URL here"
                        />
                      </div>
                    </div>
                    <div className="px-2">
                      <label className="leading-8 text-sm font-normal mt-5">
                        Personal Website URL (optional)
                      </label>
                      <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                        <TextField
                          name="social.personal_web_url"
                          onChangeValue={handleChange}
                          value={values.social.personal_web_url}
                          type="url"
                          id="personalurl"
                          placeholder="Enter URL here"
                        />
                      </div>
                    </div>

                    <div className="px-2">
                      <label className="leading-8 text-sm font-normal mt-5">
                        Other URL (optional)
                      </label>
                      <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                        <TextField
                          name="social.other_url"
                          onChangeValue={handleChange}
                          value={values.social.other_url}
                          type="url"
                          id="other"
                          placeholder="Enter URL here"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 02 */}
                <div className="bg-gray-50 basis-2/5 ">
                  <div className="flex justify-start mt-10 px-8 md:justify-end lg:justify-end mb-32">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        handleSubmit(e)
                      }}
                      className="text-base bg-black hover:bg-blue-700 text-white font-bold py-4 px-6 border border-blue rounded"
                    >
                      Save Changes
                    </button>
                  </div>

                  <div className="flex justify-center md:justify-end lg:justify-end">
                    <div className="flex justify-center items-center text-lg border-2 rounded-md bg-gray-100 h-auto w-auto">
                      {/* <Preview /> */}
                    </div>
                  </div>
                </div>
              </div>
              <AutoSubmitToken />
            </form>
          )
        }}
      </Formik>
    </>
  )
}

export default ProfileInfo
