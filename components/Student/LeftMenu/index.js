import React, { useState } from 'react'
import Collapsed from './Collapsed'
import Expanded from './Expanded'
import classes from './Layout.module.css'
import { useAutoAnimate } from '@formkit/auto-animate/react'
const Layout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [parent, enableAnimations] = useAutoAnimate({
    // Animation duration in milliseconds (default: 250)
    duration: 250,
    // Easing for motion (default: 'ease-in-out')
    easing: 'ease-in-out',
    // When true, this will enable animations even if the user has indicated
    // they don’t want them via prefers-reduced-motion.
    disrespectUserMotionPreference: false,
  })
  const onCollapseHandler = () => {
    setCollapsed(true)
  }
  const onExpandHandler = () => {
    setCollapsed(false)
  }
  return (
    <aside
      ref={parent}
      className={` ${classes.body} px-3 md:px-5 py-2 min-h-[100vh]`}
    >
      {collapsed ? (
        <section className={`min-h-[100vh] w-17`}>
          <Collapsed onExpanded={onExpandHandler} />
        </section>
      ) : (
        <>
          <section className={`md:hidden min-h-[100vh] w-17`}>
            <Collapsed />
          </section>
          <section className={`hidden md:block min-h-[100vh] md:w-96`}>
            <Expanded onCollapse={onCollapseHandler} />
          </section>
        </>
      )}
    </aside>
  )
}

export default Layout
