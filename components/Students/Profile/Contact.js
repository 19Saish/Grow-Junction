import React, { useState } from 'react'
import { Formik } from 'formik'
import Image from 'next/image'
import { color } from '../../../public/theme/Color'
import Button from '../../ui-kit/Button'
import DropDown from '../../ui-kit/DropDown'
import TextField from '../../ui-kit/TextField'
import useWindowDimensions from '../../../public/utils/useWindowDimensions'

const Contact = () => {
  const [phoneNumber, setPhoneNumber] = useState()
  const initialState = {}
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialState}
        //onSubmit={}
        validateOnChange={true}
        validateOnBlur={true}
        validateOnMount={true}
      >
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
                    type="email"
                    placeholder="Michaelscott@gmail.com"
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
                <div className="w-full">
                  <div className="flex flex-wrap items-stretch w-full relative">
                    <TextField
                      id="number"
                      placeholder="000 000 000"
                      value={phoneNumber}
                      phoneNumber={true}
                      onChangeValue={(text) => {
                        if (numberValidation.test(text.target.value)) {
                          setPhoneNumber(text.target.value)
                        }
                      }}
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
                <div className="w-full">
                  <div className="flex flex-wrap items-stretch w-full relative">
                    <TextField
                      id="number"
                      placeholder="000 000 000"
                      value={phoneNumber}
                      phoneNumber={true}
                      onChangeValue={(text) => {
                        if (numberValidation.test(text.target.value)) {
                          setPhoneNumber(text.target.value)
                        }
                      }}
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
          <div className="bg-gray-50">
            <div className="flex justify-start mt-10 px-8 md:justify-end lg:justify-end">
              <button className="text-base bg-black hover:bg-blue-700 text-white font-bold py-4 px-6 border border-blue rounded">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Formik>
    </>
  )
}

export default Contact
