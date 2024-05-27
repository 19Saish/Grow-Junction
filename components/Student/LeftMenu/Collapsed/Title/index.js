import React from 'react'

const Title = ({ onExpanded }) => {
  return (
    <section className="h-20 flex items-center px-2 mb-10">
      <img
        className="w-16 mt-2 h-10 cursor-pointer"
        onClick={onExpanded}
        src="/assets/icon/mentor-dashboard/hamburger.svg"
      />
    </section>
  )
}

export default Title
