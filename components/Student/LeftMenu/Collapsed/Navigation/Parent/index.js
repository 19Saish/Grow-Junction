import React, { useState } from 'react'
import classes from './Parent.module.css'
import Child from '../Child'
import NavLink from '../../../../../Utilities/NavLink'
import { v4 as uuid } from 'uuid'
import Collapsed from '../../../Collapsed/index'
import { Tooltip as ReactTooltip } from 'react-tooltip'
const Parent = ({ title, image, url, hasItems, items, partial }) => {
  // const [collapsed, setCollapsed] = useState(true)
  // const [headerActive, setHeaderActive] = useState(true)
  // const setActiveHandler = (value) => {
  //   setHeaderActive(value)
  // }
  const id = uuid()
  return hasItems ? (
    <>
      {/* <div
        className={`${classes.container} ${
          headerActive ? 'active-header' : ''
        } my-2 text-2xl flex items-center cursor-pointer`}
        onClick={() => {
          setCollapsed(!collapsed)
        }}
      >
        <img className="pr-6" src={`/assets/icon/mentor-dashboard/${image}`} />
        <span>{title}</span>

        <img
          src={`/assets/icon/mentor-dashboard/${collapsed ? 'down' : 'up'}.png`}
          className="ml-auto mr-8"
        />
      </div> */}

      <ul>
        {items.map((child, index) => {
          return <Child key={index} {...child} />
        })}
      </ul>
    </>
  ) : (
    <NavLink href={url} exact={!partial} className="cursor-pointer">
      <div
        className={`${classes.container} w-full my-2 text-2xl flex justify-center items-center cursor-pointer`}
        id={id}
        data-tooltip-content={title}
      >
        <img src={`/assets/icon/mentor-dashboard/${image}`} />
        {/* <span>{title}</span> */}
      </div>
      <ReactTooltip anchorId={id} />
    </NavLink>
  )
}

export default Parent
