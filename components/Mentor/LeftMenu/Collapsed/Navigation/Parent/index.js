import React, { useState } from 'react'
import classes from './Parent.module.css'
import Child from '../Child'
import { v4 as uuid } from 'uuid'
import NavLink from '../../../../../Utilities/NavLink'

import Collapsed from '../../../Collapsed/index'
import { Tooltip as ReactTooltip } from 'react-tooltip'
const Parent = ({ title, image, url, hasItems, js, items, partial }) => {
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
        id={id}
        className={`${classes.container} w-full my-2 text-2xl flex justify-center items-center cursor-pointer`}
        data-tooltip-content={title}
      >
        <img
          //style={{ width: '75px' }}
          src={`/assets/icon/mentor-dashboard/${image}`}
          //className="w-50 h-50"
        />
        {/* <span>{title}</span> */}
      </div>
      <ReactTooltip anchorId={id} />
    </NavLink>
  )
}

export default Parent
