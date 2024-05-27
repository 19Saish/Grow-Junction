import React from 'react'

const ProgressBar = ({ progressPercentage, headerText, footerText }) => {
  return (
    <div>
      {typeof headerText !== 'undefined' ? (
        headerText
      ) : (
        <div className="px-2 text-sm">
          <span className="text-sm font-bold">{progressPercentage}</span>% of profile
          completed.
        </div>
      )}
      <div className="h-10 rounded-lg w-auto bg-gray-300 py-3 mr-5 ml-2">
        <div
          style={{ width: `${progressPercentage}%` }}
          className={`h-3 rounded-lg bg-gray-800`}
        ></div>
      </div>
      {typeof footerText !== 'undefined' ? (
        footerText
      ) : (
        <div className="px-2 text-sm">
          Complete 100% of the profile to get a better reach
        </div>
      )}
    </div>
  )
}
export default ProgressBar
