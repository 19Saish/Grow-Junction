import React, { useEffect, useState } from 'react'
import classes from './CreateTestimonials.module.css'
import { GrFormClose } from 'react-icons/gr'
import { BiSearch } from 'react-icons/bi'
import Modal from '../../Utilities/Modal'
import { API } from 'aws-amplify'
import { createTestimonials } from '../../../src/graphql/mutations'
import { toast } from 'react-toastify'

const CreateTestimonials = ({ showModal, setShowModal }) => {
  const [state, setState] = useState({
    serviceType: '',
    serviceTitle: '',
    mentorName: '',
    studentName: '',
    testimonials: '',
    rating: '',
  })

  useEffect(() => {
    setShowModal(showModal)
  }, [showModal])

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (state) {
      try {
        await API.graphql({
          query: createTestimonials,
          variables:{input: {...state}}
        })
        toast.success("Testimonial Created Successfully!!")
        setShowModal.bind(null, false)
      } catch (error) {
        toast.error("Failed to create testimony!!!")
      }
    }
  }

  return (
    <Modal
      title="Create Testimonials"
      containerWidth="1/2"
      firstButtonTitle="Close"
      firstButtonHandler={setShowModal.bind(null, false)}
      secondButtonTitle="Save"
      secondButtonHandler={handleSubmit}
      closeButtonHandler={setShowModal.bind(null, false)}
    >
      <div className="w-3/5">
        <div className="m-10">
          <div>
            <label htmlFor="servicetype" className="text-lg">
              Service Type
            </label>
            <select
              name="serviceType"
              id="serviceType"
              className="w-full text-lg border border-gray-300 mt-4"
              onChange={handleChange}
              value={state.serviceType}
            >
              <option value="oneOnone">1 on 1</option>
              <option value="workshop">Workshop</option>
              <option value="package">Package</option>
              <option value="cohort">Cohort</option>
            </select>
          </div>
          <div className="mt-6">
            <label htmlFor="servicetitle" className="text-lg">
              Service Title
            </label>
            <div className="flex border border-gray-300 items-center mt-4">
              <input
                type="text"
                className="border-0 w-full"
                id="servicetitle"
                name="serviceTitle"
                value={state.serviceTitle}
                onChange={handleChange}
              />
              <label htmlFor="servicetitle" className="cursor-pointer mx-2">
                <BiSearch size={20} />
              </label>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="mentorname" className="text-lg">
              Mentor Name
            </label>
            <div className="flex border border-gray-300 items-center mt-4">
              <input
                type="text"
                className="border-0 w-full"
                id="mentorname"
                name="mentorName"
                value={state.mentorName}
                onChange={handleChange}
              />
              <label htmlFor="mentorname" className="cursor-pointer mx-2">
                <BiSearch size={20} />
              </label>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="studentname" className="text-lg">
              Student Name
            </label>
            <div className="flex border border-gray-300 items-center mt-4">
              <input
                type="text"
                className="border-0 w-full"
                id="studentname"
                name="studentName"
                value={state.studentName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="testimonials" className="text-lg">
              Testimonials
            </label>
            <div className="flex border border-gray-300 items-center mt-4">
              <textarea
                name="testimonials"
                id="testimonials"
                cols="30"
                rows="10"
                className="w-full border-0"
                value={state.testimonials}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="servicetype" className="text-lg">
              Rating
            </label>
            <select
              name="rating"
              id="rating"
              className="w-full text-lg border border-gray-300 mt-4"
              value={state.rating}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CreateTestimonials
