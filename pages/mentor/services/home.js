import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setServicesTitle } from '../../../redux/actions/ServicesTitleAction'
const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setServicesTitle(dispatch, 'Home!!!')
  }, [])
  return <div>home</div>
}

export default Home
