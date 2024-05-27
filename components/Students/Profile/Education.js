import React, {useState} from 'react'
import { Formik } from 'formik'
import Image from 'next/image'
import { color } from '../../../public/theme/Color'
import Button from '../../ui-kit/Button'
import DropDown from '../../ui-kit/DropDown'
import TextField from '../../ui-kit/TextField'
import useWindowDimensions from '../../../public/utils/useWindowDimensions'

const Education = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-50">
            <div className="flex flex-col tracking-wide text-black ml-4 bg-gray-50 w-3/4 md:w-auto lg:w-auto">
              {/* Eductional info */}
              <div className="mt-10 p-4 leading-8 text-2xl font-semibold mb-3">
                Educational Info
              </div>

              <div className="px-4 ">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Degree (optional)
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

              <div className="px-4 mt-5">
                <label className="leading-8 text-sm font-normal mt-5">
                  College / University (optional)
                </label>
                <TextField
                    type="text"
                    id="college"
                    placeholder="Gandhi University of applied sciences"
                  />
              </div>

              <div className="px-4 mt-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Course
                </label>
                <select
                  id="course"
                  className="h-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                >
                  <option value="course1" selected>
                    Advanced Computers and integrations
                  </option>
                  <option value="course2">Course2</option>
                  <option value="course3">Course3</option>
                  <option value="course4">Course4</option>
                </select>
              </div>

              <div className="px-4 mt-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Graduation year
                </label>
                <select
                  id="graduationyear"
                  className="h-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                >
                  <option value="2015" selected>
                    2015
                  </option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                </select>
              </div>

              <div className="px-5   mt-2">
                <div className="flex items-center">
                  <input
                    id="stillStudent"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="stillStudent"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    I’m still a student
                  </label>
                </div>
              </div>
              
              {/* Professional info */}

              <div className="mt-10 p-4 leading-8 text-2xl font-semibold">
                Professional Info
              </div>

              <div className="px-4 ">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Occupation (optional)
                </label>
                <select
                  id="occupation"
                  className="h-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                >
                  <option value="owner1" selected>
                    Startup owner
                  </option>
                  <option value="owner2">Startup owner2</option>
                  <option value="owner3">Startup owner3</option>
                  <option value="owner4">Startup owner4</option>
                </select>
              </div>

              <div className="px-4 mt-5">
                <label className="leading-8 text-sm font-normal mt-5">
                  Organisation (optional)
                </label>
                <TextField
                    type="text"
                    id="organisation"
                    placeholder="Grow"
                  />
              </div>

              <div className="px-4 mt-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Location (optional)
                </label>
                <select
                  id="location"
                  className="h-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                >
                  <option value="location1" selected>
                    Bangalore
                  </option>
                  <option value="location2">Mumbai</option>
                  <option value="location3">Chennai</option>
                  <option value="location4">Pune</option>
                </select>
              </div>

              <div className="px-4 mt-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Position (optional)
                </label>
                <select
                  id="position"
                  className="h-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                >
                  <option value="position1" selected>
                    Chief design officer
                  </option>
                  <option value="position2">design officer</option>
                  <option value="position3">officer</option>
                  <option value="position4">executive officer</option>
                </select>
              </div>

              <div className="px-4 mt-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Experience (optional)
                </label>
                <div className="flex flex-row font-normal">
                  <div className=" text-sm w-1/2">
                    <label className="leading-8 text-sm font-normal mt-5">
                      Years
                    </label>
                    <select
                      id="expyears"
                      className="h-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    >
                      <option value="11" selected>
                        01
                      </option>
                      <option value="2">02</option>
                      <option value="3">03</option>
                      <option value="4">04</option>
                      <option value="5">05</option>
                    </select>
                  </div>
                  <div className="ml-2 text-sm w-1/2">
                    <label className="leading-8 text-sm font-normal mt-5">
                      Months
                    </label>
                    <select
                      id="expmonths"
                      className="h-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    >
                      <option value="11" selected>
                        01
                      </option>
                      <option value="2">02</option>
                      <option value="3">03</option>
                      <option value="4">04</option>
                      <option value="5">05</option>
                    </select>
                  </div>
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
export default Education;
