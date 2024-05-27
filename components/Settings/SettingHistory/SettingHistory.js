import React, { useState } from 'react'
import classes from './SettingHistory.module.css'
import DataTable from 'react-data-table-component'

const columns = [
  {
    name: 'Date Applied',
  },
  {
    name: 'Date Cancelled',
  },
  {
    name: 'No of Mentor Agreed ',
  },
  {
    name: 'Mentor Revenue Sharing %',
  },
  {
    name: ' ',
  },
]

const SettingHistory = () => {
  const [dateSelected, setDateSelected] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleDateSelected = (e) => {
    setDateSelected(e.target.value)
  }

  return (
    <div className="h-screen overflow-auto">
      <h1 className="mb-10 font-semibold text-3xl">Setting History</h1>
      <hr />
      <div className="m-10 flex flex-col md:items-start items-center">
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
        <div className="w-full md:mt-0 mt-12 mb-12">
          <DataTable
            className=""
            columns={columns}
            noDataComponent="No records found !"
            persistTableHead
            pagination
          />
        </div>
      </div>
    </div>
  )
}

export default SettingHistory
