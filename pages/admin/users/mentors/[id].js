import React from 'react'
import { useRouter } from 'next/router'
import MentorsTab from '../../../../components/Administrator/Users/Mentors/MentorsTab'
const Mentor = () => {
  const router = useRouter()
  return <MentorsTab id={router.query.id} />
}

export default Mentor
