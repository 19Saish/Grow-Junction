import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setStudentTitle } from '../../../../redux/actions/StudentTitleAction'

import Mentors from '../../../../components/Administrator/Users/Mentors/Mentors'
const learners = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setStudentTitle(dispatch, 'Users / Mentors')
  }, [])
  return <Mentors />
}

export default learners
