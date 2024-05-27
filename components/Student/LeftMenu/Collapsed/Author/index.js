import React from 'react'
import classes from './Author.module.css'
const Author = () => {
  return (
    <section
      className={`${classes.container} h-60 bg-yellow-100 flex flex-col mb-15 border-r-4`}
    >
      <section className="flex flex-col justify-between flex-1 py-5 px-3 items-center">
        <img
          className={classes.persona}
          src="/assets/icon/mentor-dashboard/persona2.png"
          alt=""
        />
        <img
          className={classes.other}
          src="/assets/icon/mentor-dashboard/link.png"
          alt=""
        />
        <img
          className={classes.other}
          src="/assets/icon/mentor-dashboard/post.png"
          alt=""
        />
      </section>
    </section>
  )
}

export default Author
