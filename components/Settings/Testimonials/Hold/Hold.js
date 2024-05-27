import React, { useState } from 'react'
import classes from './Hold.module.css'
import { ToggleSwitch } from 'flowbite-react'
import { FcDocument } from 'react-icons/fc'
import { LiaShareSquare } from 'react-icons/lia'
import DataTable from 'react-data-table-component'

const columns = [
  {
    name: 'Created On',
  },
  {
    name: 'Serivce Type',
  },
  {
    name: 'Serivce Title',
  },
  {
    name: 'Mentor',
  },
  {
    name: 'Student',
  },
  {
    name: 'Auto Approve',
  },
  {
    name: 'Testimony',
  },
  {
    name: 'Status',
  },
  {
    name: 'Rating',
  },
  {
    name: 'Actions',
  },
  {
    name: 'Priority',
  },
]

const Hold = () => {
  const [autoApprove, setAutoApprove] = useState(false)

  const handleAutoApprove = () => {
    setAutoApprove(!autoApprove)
  }
  return (
    <div>
      <DataTable
        columns={columns}
        pagination
        persistTableHead
        noDataComponent={'No data found!!'}
      />
    </div>
  )
}

export default Hold
