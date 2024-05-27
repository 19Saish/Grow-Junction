import React from 'react'
import DataTable from 'react-data-table-component'
import {RiShareBoxLine} from 'react-icons/ri'

const columns = [
  {
    name: 'Date',
    selector: (row) => <p className="text-lg">{row.date}</p>,
  },
  {
    name: 'OrderID/TransactionID',
    selector: (row) => <p className="text-lg">{row.OrderId}</p>,
    sortable: true,
  },
  {
    name: 'Items',
    selector: (row) => <p className="text-lg">{row.items}</p>,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: (row) => <p className="text-lg">₹ {row.amount}</p>,
  },
  {
    name: 'Status',
    sortable: true,
    selector: (row) => (row?.status ? <span className='text-green-500'>Success</span> : <span className='text-red-600'>Failure</span>),
  },
  {
    name: 'Actions',
    sortable: true,
    selector: row => (
        <div>
            <RiShareBoxLine size={18} color='orange' cursor={'pointer'}/>
        </div>
    )
  },
]

const data = [
  {
    date: '2002/09/12',
    OrderId: '234frgt567ujgfd',
    items: 'Members Club',
    amount: '8.00 Rs',
    status: 'Success',
    actions: 'View',
  },
]
const PurchaseHistory = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-10">Purchase History</h1>
      <hr />
      <div>
        <div>
          <DataTable
            columns={columns}
            data={data}
            pagination
            noDataComponent="No Records Found !"
            persistTableHead
          />
        </div>
      </div>
    </div>
  )
}

export default PurchaseHistory
