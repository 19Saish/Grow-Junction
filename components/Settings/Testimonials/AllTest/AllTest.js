import React, { useState } from 'react'
import classes from './AllTest.module.css'
import { ToggleSwitch } from 'flowbite-react'
import { FcDocument } from 'react-icons/fc'
import { LiaShareSquare } from 'react-icons/lia'
import DataTable from 'react-data-table-component'

const AllTest = ({ data }) => {
  const columns = [
    {
      name: 'Created On',
      selector: (row) => row.createdAt.slice(0, 10),
    },
    {
      name: 'Serivce Type',
      selector: (row) => row.serviceType,
    },
    {
      name: 'Serivce Title',
      selector: (row) => row.serviceTitle,
    },
    {
      name: 'Mentor',
      selector: (row) => row.mentorName,
    },
    {
      name: 'Student',
      selector: (row) => row.studentName,
    },
    {
      name: 'Auto Approve',
      cell: (row) => (
        <ToggleSwitch
          onChange={handleAutoApprove}
          checked={autoApprove}
          color="green"
        />
      ),
    },
    {
      name: 'Testimony',
      cell: (row) => (
        <FcDocument size={24}/>
      )
    },
    {
      name: 'Status',
    },
    {
      name: 'Rating',
      selector: (row) => row.rating
    },
    {
      name: 'Actions',
      cell: (row) => (
        <select value={action} onChange={(e) => setAction(e.target.value)} className='border-0'>
          <option value="approve">Approve</option>
          <option value="disabled">Disabled</option>
          <option value="hold">Hold</option>
          <option value="reject">Reject</option>
        </select>
      )
    },
    {
      name: 'Priority',
    },
  ]


  const [action, setAction] = useState('')
  const [autoApprove, setAutoApprove] = useState(false)

  const handleAutoApprove = () => {
    setAutoApprove(!autoApprove)
  }
  return (
    <div className=' w-8/12 overflow-x-auto'>
      <DataTable
        columns={columns}
        pagination
        persistTableHead
        noDataComponent={'No data found!!'}
        data={data}
      />
    </div>
  )
}

export default AllTest
