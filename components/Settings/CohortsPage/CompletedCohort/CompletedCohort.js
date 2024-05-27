import React from 'react'
import classes from './CompletedCohort.module.css'

const CompletedCohort = () => {
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
        <div className="flex justify-between">
          <button className={`text-lg w-64 px-8 py-2 ${classes['feedback']}`}>FeedBack</button>
          <button className={`text-lg w-64 px-8 py-2 ${classes['completed']}`}>Completed</button>
        </div>
      </div>
    </div>
  )
}

export default CompletedCohort
