import React, { useEffect, useState } from 'react'
import classes from './CohortsPage.module.css'
import UpcomingCohort from './UpcomingCohort/UpcomingCohort'
import CompletedCohort from './CompletedCohort/CompletedCohort'

const CohortsPage = () => {
  const [active, setActive] = useState(1)
  const [tab, setTab] = useState(1)

  const handleTab = (id) => {
    setActive(id)
    setTab(id)
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-10">Cohorts</h1>
      <hr />
      <div className="m-10 mt-20">
        <button
          className={
            active === 1
              ? `${classes[('btn', 'active')]} text-lg px-8 py-2 ml-20 rounded-md`
              : `${classes['btn']} text-lg px-8 py-2 ml-20 rounded-md`
          }
          onClick={() => handleTab(1)}
        >
          Upcoming
          <span
            className={`${classes['upcoming']} text-lg ml-4 bg-red-600 px-2`}
          >
            1
          </span>
        </button>
        <button
          className={
            active === 2
              ? `${classes[('btn', 'active')]} text-lg px-8 py-2 ml-20 rounded-md`
              : `${classes['btn']} text-lg px-8 py-2 ml-20 rounded-md`
          }
          onClick={() => handleTab(2)}
        >
          Completed
        </button>
      </div>
      <div
        className={
          tab === 1
            ? `${classes['show-content']} w-full`
            : `${classes['content']} w-full`
        }
      >
        <UpcomingCohort />
      </div>
      <div
        className={
          tab === 2
            ? `${classes['show-content']} w-full`
            : `${classes['content']} w-full`
        }
      >
        <CompletedCohort />
      </div>
    </div>
  )
}

export default CohortsPage
