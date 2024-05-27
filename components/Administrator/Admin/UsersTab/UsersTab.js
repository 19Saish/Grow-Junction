import React from 'react'
import Tab from '../../../Utilities/Tab'
import Information from '../AdminInfo/Information'
import AdminService from '../AdminService/AdminService'
import RevenueHistory from '../RevenueHistory/RevenueHistory'

const UsersTab = ({ id }) => {
  const components = [
    { title: 'Information', component: <Information id={id} /> },
    { title: 'Revenue History', component: <RevenueHistory id={id} /> },
    { title: 'Services Created', component: <AdminService id={id} /> },
  ]

  console.log(id);
  return <Tab components={components} />
}

export default UsersTab
