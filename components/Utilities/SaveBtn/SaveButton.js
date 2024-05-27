import React from 'react'
import classes from './SaveButton.module.css'

const SaveButton = ({handleSave}) => {
  return (
    <div className="flex justify-end mt-8 mb-10">
            <button
              className={`${classes['btn']} font-bold px-6 py-3 text-2xl flex justify-end`}
              onClick={handleSave}
            >
              Save
            </button>
    </div>
  )
}

export default SaveButton