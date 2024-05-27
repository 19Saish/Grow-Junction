import React from 'react'

import { NavigationLinks } from '../../../data'

import Parent from './Parent'

const Navigation = () => {
  return (
    <nav className="w-full">
      <ul className="max-h-[85vh] overflow-y-auto ">
        {NavigationLinks.map((navLink, index) => {
          const { title, url, image, items, js, partial } = navLink
          if (items) {
            return (
              <>
                <Parent
                  key={index}
                  {...navLink}
                  hasItems={true}
                  partial={partial}
                />
                {/* <ul>
                  {items.map((child) => {
                    return <Child {...child} />
                  })}
                </ul> */}
              </>
            )
          } else {
            return (
              <Parent
                title={title}
                key={index}
                {...navLink}
                hasItems={false}
                partial={partial}
              />
            )
          }
        })}
      </ul>
    </nav>
  )
}

export default Navigation
