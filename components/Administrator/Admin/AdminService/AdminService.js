import React from 'react'
import DataTable from 'react-data-table-component'
import { FaPencil } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const columns = [
  {
    name: 'Date',
    selector: (row) => row.date,
  },
  {
    name: 'Service Title',
    selector: (row) => row.title
  },
  {
    name: 'Service Type',
    selector: (row) => row.type
  },
  {
    name: 'Status',
    width: '90px',
    selector: (row) => row.status
  },
  {
    name: 'Price',
    selector: (row) => <p>Rs. {row.price}</p> 
  },
  {
    name: 'Mentor Share',
    selector: (row) => <p>{row.share}%</p>
  },
  {
    name: 'GJ Amount',
    selector: (row) => <p>Rs. {row.gj}</p>
  },
  {
    name: 'Control',
    selector: (row) => (
      <div>
        <div>
          <FaPencil size={24} />
        </div>
        <div>
          <MdDelete size={24} />
        </div>
      </div>
    ),
  },
]

const AdminService = () => {
  return (
    <div>
      <h1 className="text-4xl font-semibold mb-10">Service Created</h1>
      <hr />
      <div className="m-10">
        <DataTable
          columns={columns}
          pagination
          persistTableHead
          noDataComponent="No data found!!"
        />
      </div>
    </div>
  )
}

export default AdminService
