import React, { memo } from 'react'
import classes from './ToggleButton.module.css'


const ToggleButton = ({ changeHandler, value, special }) => {

  return (
    <label htmlFor={special} className={`${classes['switch']} cursor-pointer`}>
      <input
        type="checkbox"
        id={special}
        key={special}
        name={special}
        checked={value}
        onChange={changeHandler}
      />
      <span className={`${classes['slider']} cursor-pointer`}/>
    </label>
  )
}

export default memo(ToggleButton)
