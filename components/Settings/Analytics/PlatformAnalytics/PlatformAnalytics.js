import React from 'react'
import VerticalBarChart from '../../../Utilities/VerticalBarChart/VerticalBarChart'
import PieChart from '../../../Utilities/PieChart/PieChart'
import classes from './PlatformAnalytics.module.css'

const PlatformAnalytics = () => {
  return (
    <div>
      <div className="w-full">
        <h1
          className={`${classes['bg']} text-3xl font-semibold w-full px-4 py-4`}
        >
          Revenue
        </h1>
      </div>
      <div className="w-full grid md:grid-cols-2 mt-32">
        <div className="md:m-10">
          <p className="text-xl font-semibold">Sales by Service Types </p>
        </div>
        <div className="md:mt-10 mt-20 border-8 border-gray-300 md:h-96">
          <VerticalBarChart />
        </div>
        <div className="md:m-10 md:mt-32 mt-40">
          <p className="text-xl font-semibold">Sales by Mentors </p>
        </div>
        <div className="mt-32 border-8 border-gray-300 md:h-96">
          <VerticalBarChart />
        </div>
        <div className="md:m-10 md:mt-32 mt-40">
          <p className="text-xl font-semibold">Sales by Domain </p>
        </div>
        <div className="mt-32 border-8 border-gray-300 md:h-96">
          <VerticalBarChart />
        </div>
      </div>

      <div className="w-full md:mt-40 mt-20">
        <h1
          className={`${classes['bg']} text-3xl font-semibold w-full px-4 py-4`}
        >
          Platform Performance
        </h1>
      </div>
      <div className="flex justify-between items-center md:mt-40 mt-40 md:m-10">
        <p className="text-xl font-semibold ">Page Load Time</p>
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
        <p className="text-xl font-semibold ">Down Time </p>
      </div>
      <div className="w-full grid sm:grid-cols-2">
        <div className="sm:m-10 mt-10 grid grid-cols-3">
          <p className="text-lg font-semibold">Daily</p>
          <p className="text-lg font-semibold">Weekly</p>
          <p className="text-lg font-semibold">Monthly</p>
        </div>
        <div className="mt-10 border-8 border-gray-300 md:h-96">
          <VerticalBarChart />
        </div>
      </div>
      <div className="w-full md:mt-40 mt-40">
        <h1
          className={`${classes['bg']} text-3xl font-semibold w-full px-4 py-4`}
        >
          Platform Utilization
        </h1>
      </div>
      <div className="grid grid-cols-3 justify-between items-center md:mt-40 mt-40 md:m-10">
        <div className="md:col-span-2">
          <p className="text-xl font-semibold ">Total Live Sessions </p>
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
        <p className="text-xl font-semibold ">Time Spent in Live Sessions </p>
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
      <div className="flex justify-between items-center mt-40 m-10">
        <p className="text-xl font-semibold ">
          Number of Various Service Types
        </p>
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

export default PlatformAnalytics
