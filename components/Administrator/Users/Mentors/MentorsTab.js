import React from 'react'
import Tab from '../../../Utilities/Tab'
import MentorEdit from './MentorEdit'
import ServicesCreated from './ServicesCreated'
import RevenueHistory from './RevenueHistory'

const MentorsTab = ({ id }) => {
  const components = [
    { title: 'Mentor Info', component: <MentorEdit id={id} /> },
    { title: 'Revenue History', component: <RevenueHistory id={id} /> },
    { title: 'Services Created', component: <ServicesCreated id={id} /> },
  ]
  return <Tab components={components} />
}

export default MentorsTab
