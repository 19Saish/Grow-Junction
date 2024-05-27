import React from 'react'
import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import moment from 'moment'
const columns = [
  {
    name: 'Booking Date',
    cell: (row) => (
      <span className="text-capital">
        {row.bookingDate ? moment(row.bookingDate).format('DD/MM/YYYY') : ''}
      </span>
    ),
    sortable: true,
    selector: (row) => row.bookingDate,
  },
  {
    name: 'Name',
    cell: (row) => <span className="text-capital">{row.name}</span>,
    sortable: true,
    selector: (row) => row.name,
  },
  {
    name: 'Service Type',
    sortable: true,
    selector: (row) => row.serviceType,
    cell: (row) => <span className="text-capital">{row.serviceType}</span>,
  },
  {
    name: 'Email',
    sortable: true,
    selector: (row) => (row?.emailId === 'null' ? '' : row?.emailId || ''),
  },
  {
    name: 'Phone',
    sortable: true,
    selector: (row) => row.mobileNumber,
  },
  ,
  {
    name: 'Status',
    sortable: true,
    selector: (row) => (row?.isSuccess ? 'Success' : 'Failure'),
  },
]
const PurchaseHistory = ({ id }) => {
  const { currentStudent, currentStudentPurchases: bookings } = useSelector(
    (state) => state.StudentHeaderReducer,
  )
  debugger
  return (
    <DataTable
      columns={columns}
      data={bookings}
      pagination
      noDataComponent="No Records Found !"
      persistTableHead
    />
  )
}

export default PurchaseHistory
