import React, { useEffect, useState } from 'react'
import OneOnOnePage from '../OneOnOne/OneOnOnePage'
import WorkshopPage from '../WorkshopPage/WorkshopPage'
import CohortPage from '../CohortPage/CohortPage'
import Tab from '../../../Utilities/Tab'
import { API, graphqlOperation } from 'aws-amplify'
import { listMentorRegisters } from '../../../../src/graphql/queries'

const Upcoming = () => {

  const [mentors, setMentors] = useState([]);

  const components = [
    { title: '1 on 1 Sessions', component: <OneOnOnePage title="1 on 1 Session"/> },
    { title: 'Workshops', component: <WorkshopPage title="Workshop" /> },
    { title: 'Cohorts', component: <CohortPage title="Cohort" /> },
  ]

  useEffect(() => {
    const getMentors = async () => {
      const result = await API.graphql(graphqlOperation(listMentorRegisters))
      setMentors(result?.data?.listMentorRegisters?.items)
    }
    getMentors()
  },[])

  return (
    <div className="ml-20">
      <h4 className="font-semibold text-gray-400">
        Book Upcoming Mentors
      </h4>
      <div className='mt-16'>
        <Tab components={components} />
      </div>
    </div>
  )
}

export default Upcoming
