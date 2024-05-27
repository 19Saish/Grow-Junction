import React, { useState } from 'react'
import classes from './Tab.module.css'
const Tab = ({ components }) => {
  const [indexSelected, setIndexSelected] = useState(0)
  let val
  const renderItem = () => (
    <div className="flex p-[100px] text-xl justify-center items-center">
      {val}
    </div>
  )
  if (!Array.isArray(components)) {
    val = 'Invalid Components passed'
    return renderItem()
  }

  components.forEach((item) => {
    if (!item?.title) {
      val = 'Invalid Components passed'
      return
    }
    if (!item?.component) {
      val = 'Invalid Components passed'
      return
    }
  })
  if (val) {
    return renderItem()
  }

  return (
    <div className="flex justify-between flex-col min-h-[90vh]">
      <div className="flex px-[20px] pb-[5px] pl-2 flex-wrap text-xl justify-start items-center gap-5">
        {components.map((comp, index) => (
          <div
            className={`${classes.title} text-2xl ${
              index == indexSelected ? classes.active : ''
            }`}
            key={comp.title}
            onClick={() => setIndexSelected(index)}
          >
            {comp.title}
          </div>
        ))}
      </div>
      <div
        className={`${classes.content} flex-1 p-5 flex-wrap justify-start items-start text-2xl`}
      >
        {components[indexSelected]?.component}
      </div>
    </div>
  )
}

export default Tab
