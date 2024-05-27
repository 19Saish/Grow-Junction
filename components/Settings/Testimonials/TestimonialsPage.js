import React, { useEffect, useState } from 'react'
import classes from './Testimonials.module.css'
import { ToggleSwitch } from 'flowbite-react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { HiOutlineRefresh } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import AllTest from './AllTest/AllTest'
import Hold from './Hold/Hold'
import Approved from './Approved/Approved'
import RejectedPage from './Rejected/RejectedPage'
import CreateTestimonials from '../CreateTestimonials/CreateTestimonials'
import { API, graphqlOperation } from 'aws-amplify'
import { getTestimonials, listTestimonials } from '../../../src/graphql/queries'

const TestimonialsPage = () => {
  const [active, setActive] = useState(1)
  const [clicked, setClicked] = useState(1)
  const [autoApprove, setAutoApprove] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [testimonyData, setTestimonyData] = useState([])

  const handleClick = (id) => {
    setActive(id)
    setClicked(id)
  }

  const handleAutoApprove = () => {
    setAutoApprove(!autoApprove)
  }

  const handleReset = () => {}
  const handleSearch = () => {}

  useEffect(() => {
    const getTestimonyData = async () => {
      const result = await API.graphql(graphqlOperation(listTestimonials))
      const item = result.data.listTestimonials.items
      setTestimonyData(item)
    }
    getTestimonyData();
  }, [])

  return (
    <div>
      <h1 className="text-3xl my-10 font-semibold">Live Sessions</h1>
      <hr />
      <div className="m-10">
        <div className="mt-6 flex mb-10 justify-end">
          <div className="flex items-center justify-center py-4 px-6 border-2 border-gray-300 w-72">
            <div className="flex items-center mr-4 border-0">
              <ToggleSwitch
                onChange={handleAutoApprove}
                checked={autoApprove}
                color="green"
              />
            </div>
            <p className="text-lg">Auto Approved</p>
          </div>
          <div
            className={`${classes['search']} py-4 px-6 flex items-center ml-4`}
            onClick={() => {
              setShowModal(true)
            }}
          >
            <AiOutlinePlusCircle cursor={'pointer'} />
            <button className="text-lg ml-4">Create</button>
          </div>
        </div>
        <div className="border border-gray-300 flex w-3/6">
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
            className="text-lg ml-10 border-0 w-full font-semibold"
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
            Approved
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
            Hold
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
            Rejected
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
          <AllTest data={testimonyData}/>
        </div>
        <div
          className={
            clicked === 2
              ? `${classes['show-content']} w-full mt-20`
              : `${classes['content']} w-full`
          }
        >
          <Approved />
        </div>
        <div
          className={
            clicked === 3
              ? `${classes['show-content']} w-full mt-20`
              : `${classes['content']} w-full`
          }
        >
          <Hold />
        </div>
        <div
          className={
            clicked === 4
              ? `${classes['show-content']} w-full mt-20`
              : `${classes['content']} w-full`
          }
        >
          <RejectedPage />
        </div>
      </div>
      <div>
        {showModal && (
          <CreateTestimonials
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </div>
  )
}

export default TestimonialsPage
