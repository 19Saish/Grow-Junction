import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import TextField from '../../../pages/ui-kit/TextField'
import Preview from './Preview'
const ContactInfo = ({ contact_info, setContactState }) => {
  const [state, setState] = useState({
    contact_info,
  })

  useEffect(() => {
    setState({ contact_info })
  }, [contact_info])
  console.log('state', state)
  return (
    <>
      <Formik
        initialValues={state}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
          // console.log('values', values)
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false)
          }, 400)

          setContactState(values)
        }}
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
          // console.log('values', values)
          return (
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 ">
                <div className="bg-gray-50 mt-10">
                  <div className="flex flex-col tracking-wide text-black ml-4 bg-gray-50 w-4/5 md:w-auto lg:w-auto">
                    <div className="p-4 leading-8 text-2xl font-semibold mb-3">
                      Contact Info
                    </div>

                    <div className="px-4">
                      <label className="leading-8 text-lg font-normal mt-5">
                        Email ID
                      </label>
                      <div className="flex flex-wrap items-stretch w-full relative">
                        <TextField
                          id="email"
                          name="contact_info.email"
                          value={values.contact_info.email}
                          onChangeValue={handleChange}
                          type="email"
                          placeholder="email"
                        />
                      </div>
                    </div>
                    <p className="flex mr-5 text-xs justify-end -mt-4">
                      <img
                        src="../../../assets/icon/approve.png"
                        alt=""
                        className="w-4 h-4 mr-2"
                      />
                      Email ID Verified
                    </p>

                    <label className="px-4 leading-8 text-lg font-normal mt-5">
                      Mobile Number
                    </label>
                    <div className="px-4 flex flex-row ">
                      {/* <div className="w-1/4 md:w-1/6 lg:w-1/6">
                  <select
                    id="mobile"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded rounded-r-none focus:ring-black-500 focus:border-black-500 block w-full p-3"
                  >
                    <option value="91" selected>
                      +91
                    </option>
                    <option value="92">+92</option>
                    <option value="93">+93</option>
                    <option value="94">+94</option>
                  </select>
                </div> */}
                      <div className="w-full">
                        <div className="flex flex-wrap items-stretch w-full relative">
                          <TextField
                            id="number"
                            placeholder="0000 000 000"
                            onChangeValue={handleChange}
                            name="contact_info.mobile"
                            value={values.contact_info.mobile}
                            phoneNumber={true}
                            // onChangeValue={(text) => {
                            //   if (numberValidation.test(text.target.value)) {
                            //     setPhoneNumber(text.target.value)
                            //   }
                            // }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="flex mr-5 text-xs justify-end -mt-4">
                      <img
                        src="../../../assets/icon/approve.png"
                        alt=""
                        className="w-4 h-4 mr-2"
                      />
                      Number Verified
                    </p>

                    <label className="px-4 leading-8 text-lg font-normal mt-5">
                      Whatsapp Number
                    </label>

                    <div className="px-4 flex flex-row ">
                      {/* <div className="w-1/4 md:w-1/6 lg:w-1/6">
                  <select
                    id="whatsapp"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded rounded-r-none focus:ring-black-500 focus:border-black-500 block w-full p-3"
                  >
                    <option value="91" selected>
                      +91
                    </option>
                    <option value="92">+92</option>
                    <option value="93">+93</option>
                    <option value="94">+94</option>
                  </select>
                </div> */}
                      <div className="w-full">
                        <div className="flex flex-wrap items-stretch w-full relative">
                          <TextField
                            id="number"
                            placeholder="0000 000 000"
                            value={values.contact_info.whatsapp}
                            name="contact_info.whatsapp"
                            phoneNumber={true}
                            onChangeValue={handleChange}
                            // onChangeValue={(text) => {
                            //   if (numberValidation.test(text.target.value)) {
                            //     setPhoneNumber(text.target.value)
                            //   }
                            // }}
                          />
                        </div>
                      </div>
                    </div>

                    <p className="flex mr-5 text-xs justify-end -mt-4">
                      <img
                        src="../../../assets/icon/exclamationmark.png"
                        alt=""
                        className="w-4 h-4 mr-2"
                      />
                      Verification pending
                      <a
                        href="#"
                        className="text-blue-600 ml-2 no-underline hover:underline"
                      >
                        {' '}
                        Click to verify
                      </a>
                    </p>
                  </div>
                </div>

                {/* 02 */}
                <div className="bg-gray-50 basis-2/5 ">
                  <div className="flex justify-start mt-10 px-8 md:justify-end lg:justify-end mb-32">
                    <button
                      className="text-base bg-black hover:bg-blue-700 text-white font-bold py-4 px-6 border border-blue rounded"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        handleSubmit(e)
                      }}
                    >
                      Save Changes
                    </button>
                  </div>

                  <div className="flex justify-center md:justify-end lg:justify-end">
                    <div className="flex justify-center items-center text-lg border-2 rounded-md  border-white h-auto w-auto">
                      <Preview />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )
        }}
      </Formik>
    </>
  )
}

export default ContactInfo
