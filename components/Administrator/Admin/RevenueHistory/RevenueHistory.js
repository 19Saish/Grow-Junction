import React from 'react'
import DataTable from 'react-data-table-component'

const columns = [
  {
    name: 'Date',
  },
  {
    name: 'Students',
  },
  {
    name: 'Transaction ID',
  },
  {
    name: 'Service Title',
  },
  {
    name: 'Service Type',
  },
  {
    name: 'Status',
  },
  {
    name: 'Price',
  },
  {
    name: 'Mentor Share',
  },
  {
    name: 'GJ Amount',
  },
  {
    name: 'Control',
  },
]

const RevenueHistory = () => {
  return (
    <div>
      <h1 className="text-4xl font-semibold mb-10">Revenue History</h1>
      <hr />
      <div>
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

export default RevenueHistory
