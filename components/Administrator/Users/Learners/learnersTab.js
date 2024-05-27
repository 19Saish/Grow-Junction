import React from 'react'
import Tab from '../../../Utilities/Tab'
import LearnerEdit from './LearnerEdit'
import PurchaseHistory from './PurchaseHistory'
import EnrolledCourses from './enrolledCourses'

const LearnersTab = ({ id }) => {
  const components = [
    { title: 'Student Info', component: <LearnerEdit id={id} /> },
    { title: 'Purchase History', component: <PurchaseHistory id={id} /> },
    { title: 'Enrolled Courses ', component: <EnrolledCourses id={id} /> },
  ]
  return <Tab components={components} />
}

export default LearnersTab
