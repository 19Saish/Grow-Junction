import React from 'react'
import classes from './MainContent.module.css'
import Home from '../Home'
const MainContent = ({ content }) => {
  return (
    <section
      className={`${classes.body} flex-1 min-h-screen flex flex-col justify-start bg-white`}
    >
      {/* <Header /> */}
      <main className={`mt-5 px-3 ${classes['main-content']} md:px-10 `}>
        {!!content || <Home />}
        {!!content && content}
      </main>
    </section>
  )
}

export default MainContent
