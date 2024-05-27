import React, { useEffect, useState } from 'react'
import classes from './ServiceOrder.module.css'
import { API, graphqlOperation } from 'aws-amplify'
import {
  createMentorOrderType,
  createServiceType,
  updateMentorOrderType,
  updateServiceType,
} from '../../../src/graphql/mutations'
import { toast } from 'react-toastify'
import SaveButton from '../../Utilities/SaveBtn/SaveButton'
import { v4 as uuid } from 'uuid'
import { getLoggedinUserEmail } from '../../../utilities/user'
import { listServiceTypes } from '../../../src/graphql/queries'

const ServiceOrder = () => {
  const [serviceState, setServiceState] = useState({
    oneOnOne: false,
    workshop: false,
    cohorts: false,
    package: false,
  })

  const [mentorOrderState, setMentorOrderState] = useState({
    recentJoinee: false,
    mostActive: false,
    mostPopular: false,
    highlyRated: false,
    trending: false,
    growJunction: false,
  })

  const [firstSelect, setFirstSelect] = useState(true)
  const [firstSelectMentor, setFirstSelectMentor] = useState(true)
  const [serviceId, setServiceId] = useState('')
  const [mentorId, setMentorId] = useState('')

  const handleServiceChange = async (e) => {
    setServiceState({ ...serviceState, [e.target.name]: e.target.checked })
  }

  const handleMentorOrderChange = (e) => {
    setMentorOrderState({
      ...mentorOrderState,
      [e.target.name]: e.target.checked,
    })
  }

  const handleServiceSave = async () => {
    if (serviceState && firstSelect) {
      try {
        const result = await API.graphql({
          query: createServiceType,
          variables: { input: { ...serviceState } },
        })
        setFirstSelect(!firstSelect)
        setServiceId(result.data.createServiceType.id)
        toast.success('Saved Successfully !!')
      } catch (error) {
        toast.error('Save Error!!!')
        console.log(error)
      }
    } else {
      try {
        await API.graphql({
          query: updateServiceType,
          variables: { input: { ...serviceState, id: serviceId } },
        })
        toast.success('Saved Successfully !!')
      } catch (error) {
        toast.error('Save Error!!!')
        console.log(error)
      }
    }
  }

  const handleMentorOrderSave = async () => {
    if (mentorOrderState && firstSelectMentor) {
      try {
        const resultMentor = await API.graphql({
          query: createMentorOrderType,
          variables: { input: { ...mentorOrderState } },
        })
        setFirstSelectMentor(!firstSelectMentor)
        setMentorId(resultMentor.data.createMentorOrderType.id)
        toast.success('Saved Successfully !!')
      } catch (error) {
        toast.error('Save Error!!!')
        console.log(error)
      }
    } else {
      try {
        await API.graphql({
          query: updateMentorOrderType,
          variables: { input: { ...mentorOrderState, id: mentorId } },
        })
        toast.success('Saved Successfully !!')
      } catch (error) {
        toast.error('Save Error!!!')
        console.log(error)
      }
    }
  }

  return (
    <div>
      <h1 className="mb-10 text-3xl font-semibold">Website</h1>
      <hr />
      <div className="m-10">
        <h1
          className={`${classes['yellowBar']} text-3xl font-semibold w-full px-6 py-8`}
        >
          Service Type
        </h1>
        <div className="flex flex-col m-10 mt-16">
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="oneOnOne"
              id="oneOnOne"
              className="mr-4"
              onChange={handleServiceChange}
            />
            <label htmlFor="oneOnOne" className="text-lg">
              1 on 1 Sessions
            </label>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="workshop"
              id="workshop"
              onChange={handleServiceChange}
              className="mr-4"
            />
            <label htmlFor="workshop" className="text-lg">
              Workshop
            </label>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="cohorts"
              id="cohorts"
              className="mr-4"
              onChange={handleServiceChange}
            />
            <label htmlFor="cohorts" className="text-lg">
              Cohorts
            </label>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="package"
              id="package"
              className="mr-4"
              onChange={handleServiceChange}
            />
            <label htmlFor="package" className="text-lg">
              Package
            </label>
          </div>
        </div>
        <div>
          <SaveButton handleSave={handleServiceSave} />
        </div>
      </div>
      <div className="m-10">
        <h1
          className={`${classes['yellowBar']} text-3xl font-semibold w-full px-6 py-8`}
        >
          Mentor's Order
        </h1>
        <div className="flex flex-col m-10 mt-16">
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="recentJoinee"
              id="recentJoinee"
              className="mr-4"
              onChange={handleMentorOrderChange}
            />
            <label htmlFor="recentJoinee" className="text-lg">
              Recent Joinee
            </label>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="mostActive"
              id="mostActive"
              className="mr-4"
              onChange={handleMentorOrderChange}
            />
            <label htmlFor="mostActive" className="text-lg">
              Most Active
            </label>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="mostPopular"
              id="mostPopular"
              className="mr-4"
              onChange={handleMentorOrderChange}
            />
            <label htmlFor="mostPopular" className="text-lg">
              Most Popular
            </label>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="highlyRated"
              id="highlyRated"
              className="mr-4"
              onChange={handleMentorOrderChange}
            />
            <label htmlFor="highlyRated" className="text-lg">
              Highly Rated
            </label>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="trending"
              id="trending"
              className="mr-4"
              onChange={handleMentorOrderChange}
            />
            <label htmlFor="trending" className="text-lg">
              Trending
            </label>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="growJunction"
              id="growJunction"
              className="mr-4"
              onChange={handleMentorOrderChange}
            />
            <label htmlFor="growJunction" className="text-lg">
              Grow Junction Selected
            </label>
          </div>
        </div>
        <div>
          <SaveButton handleSave={handleMentorOrderSave} />
        </div>
      </div>
    </div>
  )
}

export default ServiceOrder
