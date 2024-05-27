import React from 'react'
import classes from './Card.module.css'

const Card = () => {
  return (
    <div>
      <div className={`${classes['card']} mt-10`}>
        <img src="../../../../images/mentor.png" alt="" />
        <div className="m-4">
          <p className="text-base">March 08 10:30 PM - GMT +5.30</p>
          <p className="text-lg font-semibold">Research 101 - Talk to your first customer</p>
          <div className="flex mt-4">
            <img
              src="../../../../images/mentor.png"
              alt=""
              className={`${classes['circle']}`}
            />

            <div className="ml-6">
              <p className="text-lg font-semibold">Adam Thomas US</p>
              <p className="text-base font-semibold">Lead Product Manager, SmartRecuirters</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
