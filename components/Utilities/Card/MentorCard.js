import React, { useState } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
import classes from './MentorCard.module.css'

const MentorCard = ({ name, location, role, img, company, index }) => {
  const [clicked, setClicked] = useState(false)

  const handleBookmark = () => {
    setClicked(!clicked)
  }

  console.log('image', img)

  return (
    <div key={index}>
      <div style={{ width: '300px' }} className="mt-10 grow">
        <div className={img ? `h-full` : `${classes['imgHeight']}`}>
          <img src={img} alt="My Mentor" className="object-cover" />
        </div>
        <div className={`${classes['card']} bg-gray-800 p-2 text-white`}>
          <div className="flex text-base">
            <p className="mr-2">{name} </p>
            <p>{location}</p>
          </div>
          <p className="text-sm">{company}</p>
          <div className="flex items-center text-sm">
            <BsFillBookmarkFill
              color={clicked ? 'yellow' : 'white'}
              key={name}
              onClick={handleBookmark}
              cursor={'pointer'}
              size={12}
            />{' '}
            <p className="ml-2">{role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentorCard
