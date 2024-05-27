import React, { useState } from 'react'
import classes from './LiveSessions.module.css'
import { BiSearch } from 'react-icons/bi'
import { HiOutlineRefresh } from 'react-icons/hi'
import All from './All/All'
import Upcoming from './Upcoming/Upcoming'
import InProgress from './InProgress/InProgress'
import Completed from './Completed/Completed'

const LiveSessions = () => {
  const [active, setActive] = useState(1)
  const [clicked, setClicked] = useState(1)

  const handleClick = (id) => {
    setActive(id)
    setClicked(id)
  }

  const handleReset = () => {}
  const handleSearch = () => {}

  return (
    <div>
      <h1 className="text-3xl my-10 font-semibold">Live Sessions</h1>
      <hr />
      <div className="m-10">
        <div className="border border-gray-300">
          <select
            name="filters"
            id="filters"
            className="text-lg font-semibold border-0 ml-4"
          >
            <option value="Add Filters" disabled selected>
              Add Filters
            </option>
            <option value="1on1">1 on 1 Sessions</option>
            <option value="cohorts">Cohorts</option>
            <option value="workshop">Workshops</option>
          </select>
          <input
            type="text"
            className="text-lg ml-10 border-0 w-3/5 font-semibold"
            placeholder="Search with Title"
          />
        </div>
        <div className="mt-16 flex items-center">
          <p className="text-lg ml-4">Status</p>
          <button
            className={
              active === 1
                ? `${
                    classes[('btn', 'active')]
                  } text-lg border border-black w-40 px-4 py-2 ml-20`
                : `${classes['btn']} text-lg border border-black w-40 px-4 py-2 ml-20`
            }
            onClick={() => handleClick(1)}
          >
            All
          </button>
          <button
            className={
              active === 2
                ? `${
                    classes[('btn', 'active')]
                  } text-lg border border-black w-40 px-4 py-2 ml-4`
                : `${classes['btn']} text-lg border border-black w-40 px-4 py-2 ml-4`
            }
            onClick={() => handleClick(2)}
          >
            Upcoming
          </button>
          <button
            className={
              active === 3
                ? `${
                    classes[('btn', 'active')]
                  } text-lg border border-black w-40 px-4 py-2 ml-4`
                : `${classes['btn']} text-lg border border-black w-40 px-4 py-2 ml-4`
            }
            onClick={() => handleClick(3)}
          >
            InProgress
          </button>
          <button
            className={
              active === 4
                ? `${
                    classes[('btn', 'active')]
                  } text-lg border border-black w-40 px-4 py-2 ml-4`
                : `${classes['btn']} text-lg border border-black w-40 px-4 py-2 ml-4`
            }
            onClick={() => handleClick(4)}
          >
            Completed
          </button>
        </div>
        <div className="w-full mt-16 flex justify-end">
          <div className="flex">
            <button
              className={` text-lg border border-black w-32 py-2 px-2 flex items-center justify-around`}
              onClick={handleReset}
            >
              <HiOutlineRefresh size={18} color="red" />
              Reset
            </button>
            <button
              className={`${classes['search']} text-lg border border-black w-32 py-2 px-2 ml-6 flex items-center justify-around`}
              onClick={handleSearch}
            >
              <BiSearch size={18} />
              Search
            </button>
          </div>
        </div>
        <div
          className={
            clicked === 1
              ? `${classes['show-content']} w-full mt-20`
              : `${classes['content']} w-full`
          }
        >
          <All />
        </div>
        <div
          className={
            clicked === 2
              ? `${classes['show-content']} w-full mt-20`
              : `${classes['content']} w-full`
          }
        >
          <Upcoming />
        </div>
        <div
          className={
            clicked === 3
              ? `${classes['show-content']} w-full mt-20`
              : `${classes['content']} w-full`
          }
        >
          <InProgress />
        </div>
        <div
          className={
            clicked === 4
              ? `${classes['show-content']} w-full mt-20`
              : `${classes['content']} w-full`
          }
        >
          <Completed />
        </div>
      </div>
    </div>
  )
}

export default LiveSessions
