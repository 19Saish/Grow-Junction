import React from 'react'
import classes from './Mentor.module.css'
import { createMentorSetting } from '../../../src/graphql/mutations'
import { API } from 'aws-amplify'
import toast from 'react-toastify'

const MentorSetting = () => {
  // const [revenue, setRevenue] = React.useState('');
  // const [allowMentorBtnText, setAllowMentorBtnText] = React.useState('');
  // const [studentIsMentor, setStudentIsMentor] = React.useState('');

  const initialState = {
    revenue: '',
    mentorBtnText: '',
    becameMentor: '',
  }

  const [state, setState] = React.useState(initialState)

  const mentorSetting = async () => {
    try {
      await API.graphql({
        query: createMentorSetting,
        variables: { input: { ...state } },
      })
      toast.success('Saved Successfully!!')
    } catch (err) {
      toast.error('Save Error')
    }
  }

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    mentorSetting()
    console.log('submitted', state)
  }

  return (
    <div className="overflow-auto">
      <h2 className="font-semibold mb-6">Mentor Settings</h2>
      <hr />
      <div className="sm:grid sm:grid-cols-3">
        <div>
          <p className="text-xl font-semibold sm:mt-16 sm:ml-6">Security</p>
        </div>
        <div className="mt-16 col-span-2">
          <div className="w-5/6">
            <label className="text-xl">Default Revenue Sharing(in %)</label>
            <input
              type="text"
              name="revenue"
              id="revenue"
              className="w-full h-11 border-solid border-2 border-gray-300 rounded-md text-xl"
              onChange={handleChange}
            />
            <label className="text-xl mt-2">
              Allow Students to become Mentor
            </label>
            <div className="flex items-center mt-4">
              <input
                type="radio"
                id="Yes"
                name="becameMentor"
                value="Yes"
                className="mr-4"
                onChange={handleChange}
              />
              <label htmlForfor="Yes" className="text-lg">
                Yes
              </label>
              <input
                type="radio"
                id="No"
                name="becameMentor"
                value="No"
                className="sm:ml-60 ml-8 mr-4"
                onChange={handleChange}
              />
              <label htmlForfor="No" className="text-lg">
                No
              </label>
            </div>
            <p className="text-xl mt-6">
              Allow Students to become Mentor button text
            </p>
            <input
              type="text"
              name="mentorBtnText"
              className="w-full h-11 border-solid border-2 border-gray-300 rounded-md text-xl"
              onChange={handleChange}
            />
            <div className="flex justify-end mt-8">
              <button
                className={`${classes['btn']} font-bold px-6 py-3 text-2xl`}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        {/* 2nd block */}
        <div>
          <p className="text-xl font-semibold sm:mt-16 sm:ml-6">
            Terms & Conditions
          </p>
        </div>
        <div className="mt-14 w-5/6 col-span-2">
          <textarea
            className="border-solid border-2 border-gray-300 rounded-md h-4/5 w-full text-xl"
            name="terms"
            id="terms"
            cols="45"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <p className="text-xl font-semibold mt-16 ml-6">
            Apply to Existing Mentors
          </p>
        </div>
        <div className="w-5/6">
          <button
            className={`${classes['btn']} w-full py-4 mt-10 font-bold sm:text-xl text-base`}
          >
            Apply to Existing Mentors
          </button>
          <button
            className={`bg-gray-400 w-full py-4 mt-16 font-bold sm:text-xl text-base`}
          >
            History of Terms & Conditions
          </button>
        </div>
      </div>
    </div>
  )
}

export default MentorSetting
