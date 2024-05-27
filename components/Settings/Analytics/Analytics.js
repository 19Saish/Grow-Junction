import React, { useState } from 'react'
import classes from './Analytics.module.css'
import Rating from '../../Utilities/Rating/Rating'
import VerticalBarChart from '../../Utilities/VerticalBarChart/VerticalBarChart'
import PieChart from '../../Utilities/PieChart/PieChart'
import MentorAnalytics from './MentorAnalytics/MentorAnalytics'
import StudentAnalytics from './StudentAnalytics/StudentAnalytics'
import PlatformAnalytics from './PlatformAnalytics/PlatformAnalytics'

const AnalyticsPage = () => {
  const [active, setActive] = useState(1)
  const [clicked, setClicked] = useState(1)

  const handleClick = (id) => {
    setClicked(id)
    setActive(id)
  }
  return (
    <div>
      <h1 className="mb-10 text-3xl font-semibold">Analytics</h1>
      <hr />
      <div className="m-10">
        <div class="text-lg m-10 font-medium text-center border-b border-gray-200 ">
          <ul class="grid md:grid-cols-8 grid-cols-4">
            <li
              class={
                active === 1
                  ? `${classes['active']} font-semibold p-2 cursor-pointer`
                  : `p-2 w-full font-semibold cursor-pointer`
              }
              onClick={() => handleClick(1)}
            >
              Mentors
            </li>
            <li
              class={
                active === 2
                  ? `${classes['active']} font-semibold p-2 cursor-pointer`
                  : ` p-2 w-full font-semibold cursor-pointer`
              }
              onClick={() => handleClick(2)}
            >
              Students
            </li>
            <li
              class={
                active === 3
                  ? `${classes['active']} font-semibold p-2 cursor-pointer`
                  : `p-2 w-full font-semibold cursor-pointer`
              }
              onClick={() => handleClick(3)}
            >
              Platform
            </li>
          </ul>
        </div>

        {/* mentor block */}

        <div
          className={
            clicked === 1
              ? `${classes['show-content']} w-full`
              : `${classes['content']} w-full`
          }
        >
          <MentorAnalytics />
        </div>
        <div
          className={
            clicked === 2
              ? `${classes['show-content']} w-full`
              : `${classes['content']} w-full`
          }
        >
          <StudentAnalytics />
        </div>
        <div
          className={
            clicked === 3
              ? `${classes['show-content']} w-full`
              : `${classes['content']} w-full`
          }
        >
          <PlatformAnalytics />
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
