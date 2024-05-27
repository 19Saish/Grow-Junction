import React from 'react'
import classes from './PageBuilding.module.css'

const PageBuilding = () => {
  return (
    <div>
      <div >
        <h1 className="mb-10 font-semibold text-3xl">Page Building</h1>
        <hr />
        <div className="m-10 w-5/6">
          <h1 className="text-3xl font-semibold">Mentor Registration Form</h1>
          <p className="text-2xl font-semibold mt-14">
            Domain you want to provide mentorship
          </p>
          <div>
            <ol className="grid grid-cols-1 md:grid-cols-2 text-lg mt-12 ml-8 list-decimal md:justify-start justify-center">
              <div className="col-span-1">
                <li className="mb-8">IT</li>
                <li className="mb-8">Product Management</li>
                <li className="mb-8">Consulting</li>
                <li className="mb-8">Marketing</li>
              </div>
              <div className="col-span-1">
                <li className="mb-8">IT</li>
                <li className="mb-8">Product Management</li>
                <li className="mb-8">Consulting</li>
                <li className="mb-8">Marketing</li>
              </div>
            </ol>
          </div>
          <div className="flex md:justify-end justify-center md:w-4/6 w-full">
            <button
              className={`${classes['btn']} text-xl font-semibold px-6 py-2 w-56 h-14 md:ml-8 ml-0 md:mt-6 mt-6 mr-4`}
            >
              Add More
            </button>
          </div>
        </div>
        <div className="m-10 mt-20 w-5/6">
          <h1 className="text-3xl font-semibold">Suggested Services</h1>
          <div>
            <ol className="text-lg mt-12 ml-8 list-decimal">
              <li className="mb-8">Mock Interview</li>
              <li className="mb-8">Workshop</li>
              <li className="mb-8">Webinar</li>
              <li className="mb-8">Cohort</li>
              <li className="mb-8">Resume review</li>
            </ol>
          </div>
          <div className="flex md:justify-end justify-center md:w-4/6 w-full">
            <button
              className={`${classes['btn']} text-xl font-semibold px-6 py-2 w-56 h-14 md:ml-8 ml-0 md:mt-6 mt-6 mr-4`}
            >
              Add More
            </button>
          </div>
        </div>
        <div className="ml-10 mt-20 w-5/6">
          <h1 className="text-3xl font-semibold">Student Registration Form</h1>
          <p className="text-2xl font-semibold mt-14">
            Domain you want to provide mentorship
          </p>
          <div>
            <ol className="grid grid-cols-1 md:grid-cols-2 text-lg mt-12 ml-8 list-decimal">
              <div className="col-span-1">
                <li className="mb-8">IT</li>
                <li className="mb-8">Product Management</li>
                <li className="mb-8">Consulting</li>
                <li className="mb-8">Marketing</li>
              </div>
              <div className="col-span-1">
                <li className="mb-8">IT</li>
                <li className="mb-8">Product Management</li>
                <li className="mb-8">Consulting</li>
                <li className="mb-8">Marketing</li>
              </div>
            </ol>
          </div>
          <div className="flex md:justify-end justify-center md:w-4/6 w-full">
            <button
              className={`${classes['btn']} text-xl font-semibold px-6 py-2 w-56 h-14 md:ml-8 ml-0 md:mt-6 mt-6 mr-4`}
            >
              Add More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageBuilding
