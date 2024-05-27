import React from 'react'
import DataTable from 'react-data-table-component'

const columns = [
  {
    name: '',
    cell: (row) => <div>{row.name}</div>,
    sortable: true,
  },
  {
    name: 'COHORT TITLE',
    cell: (row) => <span className="uppercase text-gray-400">{row.name}</span>,
    sortable: true,
  },
  {
    name: 'ASSIGNED THROUGH ',
    cell: (row) => <span>{row.name}</span>,
    sortable: true,
  },
  {
    name: 'STATUS ',
    cell: (row) => <span>{row.name}</span>,
    sortable: true,
  },
  {
    name: 'EXPIRY',
    cell: (row) => <span>{row.name}</span>,
    sortable: true,
  },
  {
    name: 'ACTIONS',
    cell: (row) => <span>{row.name}</span>,
    sortable: true,
  },
]

const EnrolledCourses = () => {
  return (
    <div>
      <DataTable
        columns={columns}
        pagination
        noDataComponent="No Records Found !"
        persistTableHead
      />
    </div>
  )
}

export default EnrolledCourses
