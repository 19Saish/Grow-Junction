import React, { useState, useEffect, useRef } from 'react'
import { Formik, useFormikContext } from 'formik'
import TextField from '../../../pages/ui-kit/TextField'
import TimezoneSelect, { allTimezones } from 'react-timezone-select'
import classes from './ProfileInfo.module.css'
import ProgressBar from '../../Utilities/ProgressBar'
import Preview from './Preview'
import { Storage } from 'aws-amplify'
// const AutoSubmitToken = ({setProfile}) => {
//   // Grab values and submitForm from context
//   const { values, submitForm } = useFormikContext()

//   React.useEffect(() => {
//     console.log('context_values', values)
//     setProfile(values)
//     // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
//     // if (values.token.length === 6) {
//     //   submitForm();
//     // }
//   }, [values, submitForm])
//   return null
// }
const ProfileInfo = ({
  about_yourself,
  social,
  currency,
  time_zone,
  bankDetails,
  // profile_image,
  profile_image_url,
  setProfileState,
  percentage,
}) => {
  const initialState = {}
  const imageInputref = useRef()
  const [image, setImage] = useState()
  const [convertedImage, setConvertedImage] = useState(profile_image_url)
  const [state, setState] = useState({
    about_yourself,
    social,
    currency,
    bankDetails,
    time_zone,
    profile_image_url,
    setProfileState,
  })
  const [timeZone, setTimeZone] = useState(
    time_zone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    // Intl.DateTimeFormat().resolvedOptions().timeZone,
  )
  debugger
  useEffect(() => {
    setTimeZone(time_zone)
    setState({
      about_yourself,
      social,
      currency,
      time_zone,
      bankDetails,
      profile_image_url,
      // setProfileState,
    })
  }, [
    about_yourself,
    bankDetails,
    social,
    currency,
    time_zone,
    profile_image_url,
  ])
  // useEffect(()=>{
  //   console.log("ProfileValues",values)
  // },[values])
  const getImage = async () => {
    // const image_key = await Storage.get(profile_image)
    setConvertedImage(profile_image_url)
  }
  // debugger
  console.log('app', {
    about_yourself,
    social,
    currency,
    time_zone,
    bankDetails,
    profile_image_url,
    // profile_image_url,
    setProfileState,
  })
  useEffect(() => {
    // if (profile_image_url) {
    // debugger
    setConvertedImage(profile_image_url)
    // }
  }, [profile_image_url])
  const handleFileInput = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // handle validations
    if (e.target.files?.[0]) {
      setImage(e.target.files[0])
    }
  }

  return (
    <>
      <Formik
        initialValues={{ ...state }}
        onSubmit={(values, e) => {
          debugger
          const { setSubmitting } = e
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false)
          }, 400)
          values.time_zone = timeZone || ''
          delete values.profile_image_url
          values.profile_image_file = image
          setProfileState(values)
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
          console.log('values', values)
          return (
            <form>
              <div className="flex flex-col md:flex-row">
                <div className="bg-gray-50 basis-3/5">
                  <div className="flex flex-col tracking-wide text-black bg-gray-50 w-full md:w-auto lg:w-auto">
                    <div className="m-10 flex flex-col md:flex-row lg:flex-row">
                      <div className="flex flex-row">
                        <div
                          className={`${classes['img-profile']} bg-gray-300 rounded-full`}
                        >
                          {image ? (
                            <img
                              src={URL.createObjectURL(image)}
                              alt=""
                              className={`${classes['img-profile']} object-cover rounded-full`}
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
                            accept="image/*"
                            ref={imageInputref}
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

                    <div className="px-2">
                      <label className="leading-8 text-sm font-normal mt-5">
                        Growjunction URL
                      </label>

                      <div className="flex flex-wrap items-start w-full relative  flex-row ">
                        <div className="focus-outline flex flex-row rounded-md border border-gray-300 px-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 pr-1">
                          <label className="text-black py-2 flex-1 text-right pr-0  text-sm font-normal">
                            Growjunction.io/
                          </label>
                        </div>
                        <TextField
                          type="text"
                          name="about_yourself.grow_junction_url"
                          onChangeValue={handleChange}
                          value={values.about_yourself.grow_junction_url}
                          style={{
                            marginBottom: 0,
                            paddingLeft: 4,
                            paddingLeft: 0,
                          }}
                          id="url"
                          placeholder="Grow Junction url"
                          textStyleOverride={{
                            marginBottom: 0,
                            paddingLeft: 0,
                          }}
                        />
                      </div>
                    </div>

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

                    <h2 className="p-2 leading-8 text-2xl font-semibold mt-10 mb-5">
                      Bank Information
                    </h2>
                    <div className="px-2">
                      <label className="leading-8 text-sm font-normal">
                        Account Name
                      </label>
                      <div className="flex flex-wrap items-stretch w-full relative">
                        <TextField
                          type="text"
                          id="description"
                          placeholder="Account Name"
                          onChangeValue={handleChange}
                          value={values.bankDetails?.accountName}
                          name="bankDetails.accountName"
                        />
                      </div>
                    </div>
                    <div className="px-2">
                      <label className="leading-8 text-sm font-normal">
                        Bank Name
                      </label>
                      <div className="flex flex-wrap items-stretch w-full relative">
                        <TextField
                          type="text"
                          id="description"
                          placeholder="Bank Name"
                          onChangeValue={handleChange}
                          value={values.bankDetails?.bankName}
                          name="bankDetails.bankName"
                        />
                      </div>
                    </div>
                    <div className="px-2">
                      <label className="leading-8 text-sm font-normal">
                        Account Number
                      </label>
                      <div className="flex flex-wrap items-stretch w-full relative">
                        <TextField
                          type="text"
                          id="description"
                          placeholder="Account Number"
                          onChangeValue={handleChange}
                          value={values.bankDetails?.accountNumber}
                          name="bankDetails.accountNumber"
                        />
                      </div>
                    </div>
                    <div className="px-2">
                      <label className="leading-8 text-sm font-normal">
                        IFSC Code
                      </label>
                      <div className="flex flex-wrap items-stretch w-full relative">
                        <TextField
                          type="text"
                          id="description"
                          placeholder="IFSC Code"
                          onChangeValue={handleChange}
                          value={values.bankDetails?.IFSCCode}
                          name="bankDetails.IFSCCode"
                        />
                      </div>
                    </div>
                    <div className="px-2">
                      <label className="leading-8 text-sm font-normal">
                        UPI ID
                      </label>
                      <div className="flex flex-wrap items-stretch w-full relative">
                        <TextField
                          type="text"
                          id="description"
                          placeholder="UPI ID"
                          onChangeValue={handleChange}
                          value={values.bankDetails?.UPIId}
                          name="bankDetails.UPIId"
                        />
                      </div>
                    </div>
                    <div className="px-2">
                      <label className="leading-8 text-sm my-5 font-normal">
                        Account Type
                      </label>
                      <div className="flex flex-wrap items-stretch w-full relative">
                        <label className="mr-3 text-lg leading-8 " htmlFor="">
                          Savings
                        </label>
                        <input
                          type="radio"
                          name="bankDetails.accountType"
                          value="Savings"
                          onChange={handleChange}
                          className="mr-5"
                          checked={
                            values.bankDetails?.accountType === 'Savings'
                          }
                        />
                        <label className="mr-3 text-lg leading-8 " htmlFor="">
                          Current
                        </label>
                        <input
                          type="radio"
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

                    <h2 className="p-4 leading-8 text-2xl font-semibold mt-10 mb-5">
                      Other details
                    </h2>

                    <div className="px-2">
                      <div>
                        <label className="leading-8 text-sm font-normal mt-5">
                          Select Currency
                        </label>
                      </div>
                      {/* todo currency*/}
                      <div className="inline-block relative w-full">
                        <select
                          id="currency"
                          name="currency"
                          value={values.currency}
                          onChange={handleChange}
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value=""></option>
                          <option value="₹">₹</option>
                          <option value="$">$</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm">
                        Want to change currency? Contact us at
                        support@growjunction.io
                      </p>
                    </div>

                    {/* TimeZone */}

                    <div className="px-2 mt-5">
                      <div>
                        <label className="leading-8 text-sm font-normal mt-5">
                          TimeZone
                        </label>
                      </div>

                      <div className="inline-block relative w-full">
                        {/* <select 
                id="timezone"
                className="h-12 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option>GMT (+05:30) Mumbai, New Delhi</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div> */}
                        <div className="select-wrapper w-full">
                          <TimezoneSelect
                            value={timeZone}
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
                      <Preview />
                    </div>
                  </div>
                </div>
              </div>
              {/* <AutoSubmitToken /> */}
            </form>
          )
        }}
      </Formik>
    </>
  )
}

export default ProfileInfo
