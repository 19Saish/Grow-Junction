import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setMentorTitle } from '../../redux/actions/MentorTitleAction'
const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setMentorTitle(dispatch, 'Home!!!')
  }, [])
  return <div>home</div>
}

export default Home
