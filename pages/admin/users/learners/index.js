import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import Learners from '../../../../components/Administrator/Users/Learners/learners'
import { setStudentTitle } from '../../../../redux/actions/StudentTitleAction'
const learners = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setStudentTitle(dispatch, 'Users / Learners')
  }, [])

  return <Learners />
}

export default learners
