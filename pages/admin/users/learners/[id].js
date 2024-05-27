import React from 'react'
import { useRouter } from 'next/router'
import LearnersTab from '../../../../components/Administrator/Users/Learners/learnersTab'
const Learner = () => {
  const router = useRouter()
  return <LearnersTab id={router.query.id} />
}

export default Learner
