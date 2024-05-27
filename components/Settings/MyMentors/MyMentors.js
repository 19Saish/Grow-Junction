import React, { useEffect, useState } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
import classes from './MyMentors.module.css'
import MentorCard from '../../Utilities/Card/MentorCard'
import { API, graphqlOperation } from 'aws-amplify'
import { listMentorRegisters } from '../../../src/graphql/queries'
import { getS3FileUrl } from '../../../utilities/others'

const MyMentors = () => {
  const [mentors, setMentors] = useState([])
  // const [convertedImage, setConvertedImage] = useState([])

  useEffect(() => {
    const getMentorsList = async () => {
      try {
        const result = await API.graphql(graphqlOperation(listMentorRegisters))
        const items = result.data.listMentorRegisters.items
        const modifiedItems = [...items]
        modifiedItems.forEach((item, index) => {
          const convertImg = async () => {
            if (item.profile_image) {
              const result = await getS3FileUrl(item.profile_image)
              item.img_result = result
              debugger
            } else {
              item.img_result = ''
            }
            if (index === modifiedItems.length - 1) {
              debugger
              setMentors(modifiedItems)
            }
            // mentorimage.push(result)
            // setConvertedImage(mentorimage)
          }
          convertImg()
        })
        // setMentors(item)
      } catch (error) {
        console.log(error)
      }
    }
    getMentorsList()
  }, [])

  // const MentorImgArray = mentors.map((item) => item?.profile_image)

  // console.log('converted', convertedImage)
  debugger
  console.log('mentorrs'.mentors)
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-10">My Mentors</h1>
      <hr />
      <div className="m-10">
        <div className="flex flex-col md:flex-row justify-between">
          <input
            type="text"
            placeholder="Search by name, role, company, location, expertise"
            className="text-lg w-2/5 border border-gray-300"
          />
          <button className="text-lg border border-gray-300 w-52 md:mt-0 mt-4 px-12">
            Experince
          </button>
          <button className="text-lg border border-gray-300 w-52 md:mt-0 mt-4 px-12">
            Expertise
          </button>
          <button className="text-lg border border-gray-300 w-52 md:mt-0 mt-4 px-12">
            Location
          </button>
          <button className="text-lg border border-gray-300 w-52 md:mt-0 mt-4 px-12">
            Filters
          </button>
        </div>
        <div className="grid xl:grid-cols-3 gap-10 justify-center">
          {mentors.map((item, index) => (
            <MentorCard
              name={`${item?.about_yourself?.first_name} ${item?.about_yourself?.last_name}`}
              location={item?.professional_info?.location}
              company={item?.professional_info?.organization}
              role={item?.professional_info?.position}
              img={item?.img_result}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyMentors
