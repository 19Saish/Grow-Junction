import React from 'react'
import classes from './All.module.css'
import DataTable from 'react-data-table-component'

const columns = [
  {
    name: 'Create On',
  },
  {
    name: 'Serivce Type',
  },
  {
    name: 'Service Title',
  },
  {
    name: 'Mentor',
  },
  {
    name: 'Start Time',
  },
  {
    name: 'Student Enrolled',
  },
  {
    name: 'Student Watching',
  },
  {
    name: 'Status',
  },
  {
    name: 'Session Link',
  },
  {
    name: 'Actions',
  },
]

const All = () => {
  return (
    <div>
      <DataTable
        columns={columns}
        persistTableHead
        pagination
        noDataComponent={'No data found!!'}
      />
    </div>
  )
}

export default All
