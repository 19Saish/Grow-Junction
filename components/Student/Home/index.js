import React from 'react'
import classes from './Home.module.css'
const Home = () => {
  // return <div>Hi</div>
  return (
    <>
      <section className={`flex flex-col min-h-screen`}>
        <article className="flex mb-24 md:text-6xl text-2xl leading-normal ">
          <div>
            <div>
              Hello <span className=" text-orange-300">Mickey</span>
            </div>
            <div>
              Welcome to <span className=" text-orange-300">Grow Junction</span>
            </div>
          </div>
        </article>
        <div className="hidden md:block">
          <section
            className={`${classes.container} p-6 flex flex-col justify-between`}
          >
            <section className="flex flex-col md:flex-row">
              <article className="leading-loose w-3/5  order-2 md:order-1 mx-auto md:mx-0 mb-32 md:mb-0">
                <h2 className="text-6xl mb-16">Start your learning journey</h2>

                <p className="text-xl">
                  Get started with grow junction, fill out your profile <br />{' '}
                  and explore mentors and services offered
                </p>
              </article>
              <div className="h-52  order-1 md:order-2 mb-32 mx-auto md:mx-0  md:mb-0">
                <img
                  className=" object-cover"
                  src="/assets/icon/mentor-dashboard/article-image.png"
                  alt=""
                />
              </div>
            </section>
            <section className="md:px-16 flex justify-center md:justify-start">
              <div>
                <button className={`${classes['left-button']} text-lg mr-6`}>
                  Explore Mentors
                </button>
                <button
                  className={`${classes['right-button-full']} text-lg mr-6`}
                >
                  Complete your profile
                </button>
              </div>
            </section>
          </section>
        </div>
        <div className="lock md:hidden">
          <section className={`p-6 flex flex-col justify-between`}>
            <section className="flex flex-col md:flex-row">
              <article className=" order-2 md:order-1 mx-auto md:mx-0 mb-16 md:mb-0">
                <h2 className="text-6xl mb-16">Start your learning journey</h2>

                <p className="text-xl">
                  Get started with grow junction, fill out your profile <br />{' '}
                  and explore mentors and services offered
                </p>
              </article>
              <div className="h-52  order-1 md:order-2 mb-32 mx-auto md:mx-0  md:mb-0">
                <img
                  className=" object-cover"
                  src="/assets/icon/mentor-dashboard/article-image.png"
                  alt=""
                />
              </div>
            </section>
            <section className="md:px-16 flex justify-center">
              <div className="flex flex-col items-center">
                <button
                  className={`${classes['left-button']} mb-5 text-lg mr-6`}
                >
                  Explore Mentors
                </button>
                <button
                  className={`${classes['right-button']} py-5 px-16 text-lg `}
                >
                  Complete your profile
                </button>
              </div>
            </section>
          </section>
        </div>
      </section>
    </>
  )
}

export default Home
