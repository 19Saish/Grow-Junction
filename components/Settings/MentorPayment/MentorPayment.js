import React, { useState } from 'react'
import classes from './MentorPayment.module.css'
import { BsFillArrowDownCircleFill } from 'react-icons/bs'
import DataTable from 'react-data-table-component'

const columns = [
  {
    name: 'Date',
  },

  {
    name: 'Mentor Name',
  },
  {
    name: 'Service Name',
  },
  {
    name: 'Service Type',
  },
  {
    name: 'Service Status',
  },
  {
    name: 'Total Counts',
  },
  {
    name: 'Mentor %',
  },
  {
    name: 'Payment Amount',
  },
  {
    name: 'Payment Stats',
  },
  {
    name: '',
  },
  {
    name: '',
  },
]


const MentorPayment = () => {
  const [dateSelected, setDateSelected] = useState('')

  const handleDateSelected = (e) => {
    setDateSelected(e.target.value)
  }
  return (
    <div className="overflow-auto">
      <h1 className="mb-10 font-semibold text-3xl">Mentor Payment</h1>
      <hr />
      <div className="m-10 flex flex-col md:items-start items-center w-4/6">
        <select
          className="text-xl border border-gray-300 w-64 md:mb-36 mb-12"
          name="date"
          id="date"
          value={dateSelected}
          onChange={handleDateSelected}
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="dateRange">Date Range</option>
        </select>
        <div
          className={
            dateSelected === 'dateRange'
              ? `${classes['show-content']} w-full`
              : `${classes['no-content']} w-full`
          }
        >
          <div className="flex md:flex-row md:items-start flex-col items-center mr-0 mb-10">
            <span className="text-xl border border-gray-300 w-64 md:mr-16 mr-0 mt-2 h-12 flex items-center pl-4">
              Date Range
            </span>
            <input
              type="date"
              className="text-xl border border-gray-300 w-64 md:mr-16 mr-0 mt-2 h-12"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="text-xl border border-gray-300 w-64 md:mr-16 mr-0 mt-2 h-12"
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button className="text-xl border border-gray-300 w-64 md:mr-16 mr-0 mt-2 h-12">
              OK
            </button>
          </div>
        </div>
        <div className="flex md:flex-row md:items-start flex-col items-center mr-0 mt-16 w-11/12 mb-16">
          <div className="flex flex-col items-center px-4 md:w-5/6 w-72 md:py-8 py-4 md:m-0 mt-6 border border-gray-300 md:mr-6">
            <p className="text-lg">Total Transaction</p>
            <p className="text-lg">37</p>
          </div>
          <div className="flex flex-col items-center px-4 md:w-5/6 w-72 md:py-8 py-4 md:m-0 mt-6 border border-gray-300 md:mr-6">
            <p className="text-lg">Successfull Transaction</p>
            <p className="text-lg">25</p>
          </div>
          <div className="flex flex-col items-center px-4 md:w-5/6 w-72 md:py-8 py-4 md:m-0 mt-6 border border-gray-300 md:mr-6">
            <p className="text-lg">Total Payment Amount</p>
            <p className="text-lg">Rs. 100000</p>
          </div>
          <div className="flex flex-col items-center px-4 md:w-5/6 w-72 md:py-8 py-4 md:m-0 mt-6 border border-gray-300 md:mr-6">
            <p className="text-lg">Total Pending Amount</p>
            <p className="text-lg">Rs. 100000</p>
          </div>
        </div>
        <div className="mt-10 mb-10 w-full">
          <div className="flex md:flex-row flex-col items-center md:justify-end">
            <div>
              <button className="text-lg px-6 py-2 border border-gray-300 w-52 md:ml-8 ml-0 md:mt-0 mt-4">
                Export as CSV
              </button>
            </div>
            <div>
              <button className="text-lg px-6 py-2 border border-gray-300 w-52 md:ml-8 ml-0 md:mt-0 mt-4">
                Clear
              </button>
            </div>
            <div>
              <button
                className={`${classes['btn']} text-lg px-6 py-2 w-52 md:ml-8 ml-0 md:mt-0 mt-4`}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <DataTable
            columns={columns}
            noDataComponent="No records found !"
            persistTableHead
            pagination
          />

          {/* <div
            className={`grid grid-cols-11 text-base pb-8 text-center justify-center`}
          >
            <p className="md:text-base text-xs break-normal mr-2">Date</p>
            <p className="md:text-base text-xs break-normal mr-2">
              Mentor Name
            </p>
            <p className="md:text-base text-xs break-normal mr-2">
              Service Name
            </p>
            <p className="md:text-base text-xs break-normal mr-2">
              Service Type
            </p>
            <p className="md:text-base text-xs break-normal mr-2">
              Service Status
            </p>
            <p className="md:text-base text-xs break-normal mr-2">
              Total Counts
            </p>
            <p className="md:text-base text-xs break-normal mr-2">Mentor %</p>
            <p className="md:text-base text-xs break-normal mr-2">
              Payment Amount
            </p>
            <p className="md:text-base text-xs break-normal mr-2">
              Payment Status{' '}
            </p>
          </div>
          <div className={`${classes['bottom']} mb-8`}></div>
          <div
            className={`grid grid-cols-11 text-base pb-8 text-center items-center`}
          >
            <p className="md:text-base text-xs break-normal mr-2">10/01/2023</p>
            <p className="md:text-base text-xs break-normal mr-2">
              Sunil Kumar
            </p>
            <p className="md:text-base text-xs break-normal mr-2">
              Mock Interview
            </p>
            <p className="md:text-base text-xs break-normal mr-2">
              1 on 1 Session
            </p>
            <p className="md:text-base text-xs break-normal mr-2">Completed</p>
            <p className="md:text-base text-xs break-normal mr-2">2</p>
            <p className="md:text-base text-xs break-normal mr-2">90 %</p>
            <p className="md:text-base text-xs break-normal mr-2">Rs. 1800</p>
            <p className="md:text-base text-xs break-normal mr-2">Success</p>
            <div className="">
              <button className={`${classes['btn']} h-14 w-full`}>
                Pay Now
              </button>
            </div>
            <div className="flex justify-center">
              <BsFillArrowDownCircleFill
                size={'20'}
                color="#ffbf00"
                cursor={'pointer'}
                onClick={() => {}}
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default MentorPayment
