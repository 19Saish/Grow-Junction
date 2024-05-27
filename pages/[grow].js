import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { setMentors } from '../redux/actions/MentorTitleAction'
import Preview from '../components/Mentor/Profile/Preview'
const MentorProfile = (props) => {
  // debugger
  const [mentor, setMentor] = useState()
  const router = useRouter()
  const dispatch = useDispatch()
  const mentorObj = useSelector((state) => state.MentorHeaderReducer)
  useEffect(() => {
    if (mentorObj.mentors.length === 0) {
      setMentors(dispatch)
    }
  }, [])
  const { grow } = props
  // debugger
  useEffect(() => {
    const found = mentorObj.mentors.find(
      (item) =>
        item.about_yourself?.grow_junction_url.trim().toLowerCase() ===
        grow.trim().toLowerCase(),
    )
    setMentor(found ? { ...found } : null)
  }, [mentorObj.mentors])

  return mentor ? (
    <Preview mentor={mentor} showServices={true} />
  ) : (
    // <div>MentorProfile</div>
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-50 h-50 p-20 bg-slate-100 rounded-3xl border-2">
        Mentor not found.
      </div>
    </div>
  )
}
export const getServerSideProps = async ({ params }) => {
  // const post = await getSinglePost(params.grow)
  debugger
  return {
    props: { grow: params.grow },
  }
}

export default MentorProfile
