import React from 'react'
import UsersTab from '../../../components/Administrator/Admin/UsersTab/UsersTab'
import { useRouter } from 'next/router'

const Users = () => {
    const router = useRouter()
  return (
    <div>
        <UsersTab id={router.query.userId} />
    </div>
  )
}

export default Users