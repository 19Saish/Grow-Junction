import React from 'react'

const Title = ({ onCollapse }) => {
  return (
    <section className="h-20 flex items-center px-2 mb-6">
      
        <img
          className="w-16 mt-2 h-10 cursor-pointer"
          onClick={onCollapse}
          src="/assets/icon/mentor-dashboard/hamburger.svg"
        />
        <a href="/" className="flex items-center">
        <img src="/assets/icon/mentor-dashboard/GJ App logo.svg" />
      </a>
    </section>
  )
}

export default Title
