import React, { useState } from 'react'
import classes from './StudentCarryout.module.css'
import Upcoming from './Upcoming/Upcoming'

const StudentCarryout = () => {
  const [active, setActive] = useState(1)
  const [tab, setTab] = useState(1)

  const handleTab = (id) => {
    setActive(id)
    setTab(id)
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold mb-10">Workshop</h1>
        <hr />
        <div className="m-10 mt-20">
          <button
            className={
              active === 1
                ? `${classes[('btn', 'active')]} text-xl px-10 py-3 ml-10 font-semibold rounded-md`
                : `${classes['btn']} text-xl px-10 py-3 ml-10 font-semibold rounded-md`
            }
            onClick={() => handleTab(1)}
          >
            Upcoming
          </button>
          <button
            className={
              active === 2
                ? `${classes[('btn', 'active')]} text-xl px-10 py-3 ml-10 font-semibold rounded-md`
                : `${classes['btn']} text-xl px-10 py-3 ml-10 font-semibold rounded-md`
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
          <Upcoming/>
        </div>
        <div
          className={
            tab === 2
              ? `${classes['show-content']} w-full`
              : `${classes['content']} w-full`
          }
        >
          {/* <Completed /> */}
        </div>
      </div>
    </div>
  )
}

export default StudentCarryout
