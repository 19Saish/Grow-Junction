import React, { useState } from 'react'
import classes from './Rejected.module.css'
import { FcDocument } from 'react-icons/fc'
import { ToggleSwitch } from 'flowbite-react'
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

const RejectedPage = () => {
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

export default RejectedPage