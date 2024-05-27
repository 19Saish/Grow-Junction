import React, { useEffect, useState } from 'react'
import { BiExport } from 'react-icons/bi'
import { BsPersonPlusFill } from 'react-icons/bs'
import classes from './AdminPage.module.css'
import DataTable from 'react-data-table-component'
import CreateUser from './CreateUser/CreateUser'
import { API, graphqlOperation } from 'aws-amplify'
import { listUsers } from '../../../src/graphql/queries'
import { GoShare } from 'react-icons/go'
import { useRouter } from 'next/router'

const AdminPage = () => {
  const router = useRouter()

  const columns = [
    {
      name: 'Created Date',
      selector: (row) => row.createdAt.slice(0, 10),
    },
    {
      name: 'Name',
      selector: (row) => row.userName,
    },
    {
      name: 'Email',
      width: '200px',
      cell: (row) => <p className="w-full">{row.email}</p>,
    },
    {
      name: 'Role',
      selector: (row) => row.role,
    },
    {
      name: 'Signup By',
    },
    {
      name: 'Last Login',
    },
    {
      name: 'Actions',
      cell: (row) => (
        <GoShare
          size={20}
          color="red"
          cursor={'pointer'}
          onClick={() => editUser(row.userName)}
        />
      ),
    },
  ]

  const [showModal, setShowModal] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await API.graphql(graphqlOperation(listUsers))
        setUsers(result?.data?.listUsers?.items)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [])

  const editUser = (userName) => {
    const result = users.find((i) => i.userName === userName)
    router.push(`admin/${result.id}`)
  }

  
  return (
    <div>
      <div className="flex w-4/5 md:w-full items-center justify-between">
        <div>
          <h2 className="font-semibold text-3xl">Admin </h2>
        </div>
        <div className="text-2xl border border-black bg-gray-300 py-4 px-2">
          Admin Account Limits(8)
        </div>
      </div>
      <hr className="mt-6" />
      <div>
        <div className="mt-20 flex w-full justify-between">
          <div className="border border-gray-300 w-3/5 md:w-full flex mr-32">
            <select
              name="filters"
              id="filters"
              className="text-lg font-semibold border-0 ml-4"
            >
              <option value="Add Filters" disabled selected>
                Add Filters
              </option>
              <option value="1on1">1 on 1 Sessions</option>
              <option value="cohorts">Cohorts</option>
              <option value="workshop">Workshops</option>
              <option value="package">Package</option>
            </select>
            <input
              type="text"
              className="text-lg ml-10 border-0 w-full font-semibold"
              placeholder="Search by Name, Email or Mobile"
            />
          </div>
          <div className="flex">
            <button className="flex items-center text-xl border border-black py-2 px-4 mr-10" >
              <BiExport size={20} className="mr-4" />
              Export
            </button>
            <button
              className={`flex items-center text-xl py-2 px-4 ${classes['new']}`}
              onClick={() => {
                setShowModal(true)
              }}
            >
              <BsPersonPlusFill size={20} className="mr-4 cursor-pointer" />
              New
            </button>
          </div>
        </div>
        <div className="mt-20">
          <DataTable
            columns={columns}
            data={users}
            pagination
            persistTableHead
            noDataComponent={'No data found !!'}
          />
          {showModal && (
            <CreateUser showModal={showModal} setShowModal={setShowModal} />
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPage
