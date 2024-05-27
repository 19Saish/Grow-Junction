import React, { useState } from 'react'
import classes from './JoinBtn.module.css'

const JoinBtn = ({ handleJoin }) => {
  const [clickedJoin, setClicked] = useState(false)

  const JoinHandler = () => {
    const ClickHandler = () => {
        setClicked(!clickedJoin);
    }
    ClickHandler();

    handleJoin();
  }
  return (
    <div>
      <button
        className={
          clickedJoin
            ? `${classes[('join', 'completed')]} text-lg px-8 py-2 mr-4 w-64`
            : `${classes['join']} text-lg px-8 py-2 mr-4 w-64`
        }
        onClick={JoinHandler}
      >
        {clickedJoin ? 'Completed' : 'Join Now'}
      </button>
    </div>
  )
}

export default JoinBtn
