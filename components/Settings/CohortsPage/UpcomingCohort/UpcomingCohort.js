import React, { useState } from 'react'
import classes from './UpcomingCohort.module.css'
import JoinBtn from '../../../Utilities/JoinBtn/JoinBtn'

const UpcomingCohort = () => {
  const joinHandler = () => {
    console.log('joined the session')
  }
  return (
    <div>
      <table className="w-3/5">
        <tr>
          <th className="text-lg col-span-2">
            Product Management Cohort by Saish
          </th>
          <th className="text-lg">14th Jun Monday</th>
          <th className="text-lg">1-2 PM (60 mins)</th>
        </tr>
      </table>
      <div className="mt-64 w-3/5">
        <div className="flex">
          <div className="border border-gray-300 w-4/5 flex justify-between items-center">
            <span className="text-lg ml-4">Session 1</span>
            <span className="text-lg ">14th June</span>
            <span className="text-lg mr-4">15:30</span>
          </div>
          <div>
            <JoinBtn handleJoin={joinHandler} />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <div className="border border-gray-300 w-4/5 flex justify-between items-center">
            <span className="text-lg ml-4">Session 2</span>
            <span className="text-lg ">14th June</span>
            <span className="text-lg mr-4">17:30</span>
          </div>
          <div>
            <JoinBtn handleJoin={joinHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingCohort
