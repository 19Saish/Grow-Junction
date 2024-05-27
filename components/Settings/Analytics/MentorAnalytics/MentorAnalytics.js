import React from 'react'
import PieChart from '../../../Utilities/PieChart/PieChart'
import VerticalBarChart from '../../../Utilities/VerticalBarChart/VerticalBarChart'
import RatingPage from '../../../Utilities/Rating/Rating'
import classes from './MentorAnalytics.module.css'

const MentorAnalytics = () => {
  return (
    <div>
      <div className="w-full">
        <h1
          className={`${classes['bg']} text-3xl font-semibold w-full px-4 py-4`}
        >
          Mentor Performance
        </h1>
      </div>
      <div className="w-full grid md:grid-cols-2 mt-32">
        <div className="md:m-10">
          <p className="text-xl font-semibold">Service Conducted</p>
        </div>
        <div className="md:mt-10 mt-20 border-8 border-gray-300">
          <VerticalBarChart />
        </div>
        <div className="md:m-10 md:mt-32 mt-40">
          <p className="text-xl font-semibold">Service Added</p>
        </div>
        <div className="mt-32 border-8 border-gray-300">
          <VerticalBarChart />
        </div>
        <div className="md:m-10 md:mt-32 mt-40">
          <p className="text-xl font-semibold">Link Shared on LinkedIn</p>
        </div>
        <div className="mt-32 border-8 border-gray-300">
          <VerticalBarChart />
        </div>
        <div className="md:m-10 md:mt-32 mt-40">
          <p className="text-xl font-semibold">Missed Session</p>
        </div>
        <div className="mt-32 border-8 border-gray-300">
          <VerticalBarChart />
        </div>
      </div>
      <div className="flex justify-between items-center md:m-10 md:mt-40 mt-20">
        <p className="text-xl font-semibold ">Average Rating</p>
        <div className="text-xl mt-18 font-semibold">
          <select name="sortby" id="sortby">
            <option value="mentor">Mentor</option>
            <option value="domain">Domain</option>
            <option value="servicetype">Service Type</option>
          </select>
        </div>
      </div>
      <div className="mt-20">
        <RatingPage />
      </div>
      <div className="flex justify-between items-center md:mt-40 mt-20 md:m-10">
        <p className="text-xl font-semibold ">Top 10 Mentors </p>
        <div className="text-xl mt-18 font-semibold">
          <select name="sortby" id="sortby">
            <option value="mentor">No Session</option>
            <option value="domain">Earning</option>
            <option value="servicetype">No Student</option>
          </select>
        </div>
      </div>
      <div className="w-full grid sm:grid-cols-2">
        <div className="sm:m-10 mt-10 grid grid-cols-3">
          <p className="text-lg font-semibold">Daily</p>
          <p className="text-lg font-semibold">Weekly</p>
          <p className="text-lg font-semibold">Monthly</p>
        </div>
        <div className="mt-10 border-8 border-gray-300">
          <VerticalBarChart />
        </div>
      </div>
      <div className="w-full md:mt-40 mt-20">
        <h1
          className={`${classes['bg']} text-3xl font-semibold w-full px-4 py-4`}
        >
          Mentor Aquisition
        </h1>
      </div>
      <div className="flex justify-between items-center md:mt-40 mt-40 md:m-10">
        <p className="text-xl font-semibold ">Source</p>
      </div>
      <div className="w-full grid sm:grid-cols-2">
        <div className="sm:m-10 mt-10 grid grid-cols-3">
          <p className="text-lg font-semibold">Daily</p>
          <p className="text-lg font-semibold">Weekly</p>
          <p className="text-lg font-semibold">Monthly</p>
        </div>
        <div className={`${classes['pie']} mt-10 border-8 border-gray-300`}>
          <PieChart />
        </div>
      </div>
      <div className="flex justify-between items-center md:mt-40 mt-40 md:m-10">
        <p className="text-xl font-semibold ">Mentors Onboarded</p>
      </div>
      <div className="w-full grid sm:grid-cols-2">
        <div className="sm:m-10 mt-10 grid grid-cols-3">
          <p className="text-lg font-semibold">Daily</p>
          <p className="text-lg font-semibold">Weekly</p>
          <p className="text-lg font-semibold">Monthly</p>
        </div>
        <div className="mt-10 border-8 border-gray-300">
          <VerticalBarChart />
        </div>
      </div>
      <div className="w-full md:mt-40 mt-40">
        <h1
          className={`${classes['bg']} text-3xl font-semibold w-full px-4 py-4`}
        >
          Mentor Aquisition
        </h1>
      </div>
      <div className="grid grid-cols-3 justify-between items-center md:mt-40 mt-40 md:m-10">
        <div className="md:col-span-2">
          <p className="text-xl font-semibold ">Location </p>
        </div>
        <div className="m-10 grid grid-cols-3 md:col-span-1 col-span-2">
          <p className="text-lg font-semibold">Daily</p>
          <p className="text-lg font-semibold">Weekly</p>
          <p className="text-lg font-semibold">Monthly</p>
        </div>
      </div>
      <div className="m-10 grid md:grid-cols-3 gap-10">
        <div
          className={`${classes['pie1']} flex items-center mt-10 border-8 border-gray-300 w-full px-20`}
        >
          <PieChart />
        </div>
        <div
          className={`${classes['pie1']} flex items-center mt-10 border-8 border-gray-300 w-full px-20`}
        >
          <PieChart />
        </div>
        <div
          className={`${classes['pie1']} flex items-center mt-10 border-8 border-gray-300 w-full px-20`}
        >
          <PieChart />
        </div>
      </div>
      <div className="flex justify-between items-center mt-40 m-10">
        <p className="text-xl font-semibold ">Mentors Onboarded</p>
      </div>
      <div className="w-full mt-20 grid md:grid-cols-2">
        <div className="m-10 grid grid-cols-3">
          <p className="text-lg font-semibold">Daily</p>
          <p className="text-lg font-semibold">Weekly</p>
          <p className="text-lg font-semibold">Monthly</p>
        </div>
        <div className={`${classes['pie']} mt-10 border-8 border-gray-300 `}>
          <PieChart />
        </div>
      </div>
    </div>
  )
}

export default MentorAnalytics
