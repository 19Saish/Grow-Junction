import React, {useState} from 'react'
import { Formik } from 'formik'
import Image from 'next/image'
import { color } from '../../../public/theme/Color'
import Button from '../../ui-kit/Button'
import DropDown from '../../ui-kit/DropDown'
import TextField from '../../ui-kit/TextField'
import useWindowDimensions from '../../../public/utils/useWindowDimensions'
import TimezoneSelect, { allTimezones } from 'react-timezone-select'


const Profile = () => {
  const initialState = {}
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)

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
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-50">
            <div className="flex flex-col tracking-wide text-black ml-4 bg-gray-50 w-4/5 md:w-auto lg:w-auto">
              <div className="m-10 flex flex-row">
                <div className="flex flex-row w-2/3 md:w-1/6 lg:w-1/6">
                  <div className="w-36 h-36 bg-gray-300 rounded-full">
                    <img
                      src="../../../images/student.png"
                      alt=""
                      className="w-36 h-36"
                    />
                  </div>
                </div>
                <div className=" mt-16 px-8 py-2">
                  <button className="flex justify-center items-center bg-black hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full w-40">
                    <img
                      src="../../../assets/icon/plus.png"
                      alt=""
                      className="w-7 h-7"
                    />
                    <span className="ml-3 text-sm">Add image</span>
                  </button>
                  <p className="w-auto ml-3 mt-3 tex-xs tracking-wide">
                    Recommended 256x256 px image
                  </p>
                </div>
              </div>
              <div className="flex flex-col ml-4 p-6 border-2 rounded-md bg-white">
                <div className="text-sm">40% of profile completed</div>
                <div className="flex w-1/2">
                  <div className="w-2/5 bg-gray-600 h-2 rounded-l-lg"></div>
                  <div className="w-3/5 bg-gray-300 h-2 rounded-r-lg"></div>
                </div>
                <p className="text-sm">
                  Complete 100% of the profile to get a better reach
                </p>
              </div>
              <div className="p-4 leading-8 text-2xl font-semibold">
                About Yourself
              </div>

              <div className="flex flex-row font-normal">
                <div className="px-4 text-sm w-1/2">
                  <label className="leading-8 text-sm font-normal mt-5">
                    First Name
                  </label>
                  <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                    <TextField type="text" id="fname" placeholder="Michel" />
                  </div>
                </div>
                <div className="px-4 text-sm w-1/2">
                  <label className="leading-8 text-sm font-normal mt-5">
                    Last Name
                  </label>
                  <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                    <TextField type="text" id="lname" placeholder="Scott" />
                  </div>
                </div>
              </div>
              <div className="px-4">
                <label className="leading-8 text-sm font-normal mt-5">
                  Write a short description
                </label>
                <div className="flex flex-wrap items-stretch w-full relative">
                  <TextField
                    type="text"
                    id="description"
                    placeholder="Founder and CEO at Twitter | Business owner | Entrepneur"
                  />
                </div>
                <span className="flex justify-start text-xs -mt-4">
                  Short description in 20 characters or less
                </span>
              </div>

              <div className="px-4 mt-10">
                <label className="leading-8 text-sm font-normal mt-5">
                  Tell us about yourself
                </label>
                <div className="flex flex-wrap items-stretch w-full relative">
                  <TextField
                    type="text"
                    id="about"
                    placeholder=" Hey this is michael, co-founder and executive officer at twitter. I’m here to offer my services , mentor young entrepreneurs out there.  40 out of 500 Characters"
                  />
                </div>
                <span className="flex justify-start text-xs -mt-4">
                  Describe yourself in 500 characters or less
                </span>
              </div>

              <div className="px-4 mt-8">
                <label className="leading-8 text-sm font-normal mt-5">
                  Upload Resume / CV (optional)
                </label>
                <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                  <TextField
                    id="file_input"
                    type="file"
                  />
                </div>
              </div>

              <div className="p-4 leading-8 text-2xl font-semibold mt-5 mb-5">
                Social Links
              </div>
              <div className="px-4">
                <label className="leading-8 text-sm font-normal mt-5">
                  LinkedIn URL
                </label>
                <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                  <TextField
                    type="url"
                    id="linkedurl"
                    placeholder="Enter URL here"
                  />
                </div>
              </div>

              <div className="px-4">
                <label className="leading-8 text-sm font-normal mt-5">
                  Personal Website URL (optional)
                </label>
                <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                  <TextField
                    type="url"
                    id="personalurl"
                    placeholder="Enter URL here"
                  />
                </div>
              </div>

              <div className="px-4">
                <label className="leading-8 text-sm font-normal mt-5">
                  Instagram URL (optional)
                </label>
                <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                  <TextField
                    type="url"
                    id="instagram"
                    placeholder="Enter URL here"
                  />
                </div>
              </div>

              <div className="px-4">
                <label className="leading-8 text-sm font-normal mt-5">
                  Other URL (optional)
                </label>
                <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                  <TextField
                    type="url"
                    id="other"
                    placeholder="Enter URL here"
                  />
                </div>
              </div>
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
  );
};

export default Profile;
