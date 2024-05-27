import React from 'react'
import classes from './Home.module.css'
import { getLoggedinUserEmail } from '../../../utilities/user'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { API, graphqlOperation } from 'aws-amplify'
import { listMentorRegisters } from '../../../src/graphql/queries'
const Home = () => {
  const router = useRouter()
  const [growJunctionUrl, setGrowJunctionUrl] = useState('')
  useEffect(() => {
    const fetchMentorData = async () => {
      const usrName = getLoggedinUserEmail()
      const results = await API.graphql(
        graphqlOperation(listMentorRegisters, {
          filter: { username: { contains: usrName } },
        }),
      )
      if (results.data.listMentorRegisters.items.length > 0) {
        setGrowJunctionUrl(
          results.data.listMentorRegisters.items[0].about_yourself
            ?.grow_junction_url,
        )
      }
    }
    fetchMentorData()
  }, [])

  // return <div>Hi</div>
  return (
    <>
      <section className={`flex flex-col min-h-screen`}>
        <article className="flex mb-24 md:text-6xl text-2xl leading-normal ">
          <div>
            <div>
              Hello <span className=" text-orange-300">Michel</span>
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
              <article className="leading-loose  order-2 md:order-1 mx-auto md:mx-0 mb-32 md:mb-0">
                <h2 className="text-6xl mb-6">Start spreading your</h2>
                <h2 className="text-6xl mb-6">Knowledge</h2>
                <p className="text-xl">
                  Get started with grow junction, fill out your profile <br />{' '}
                  and visit your page for more insights
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
                {growJunctionUrl && (
                  <button
                    className={`${classes['left-button']} text-lg mr-6`}
                    onClick={() => router.push(`/${growJunctionUrl}`)}
                  >
                    Visit your page
                  </button>
                )}

                <button
                  className={`${classes['right-button-full']} text-lg mr-6`}
                  onClick={() => router.push(`/mentor/profile`)}
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
                <h2 className="text-2xl md:text-6xl ">Start spreading your</h2>
                <h2 className="text-2xl md:text-6xl mb-5">Knowledge</h2>
                <p className="text-xl">
                  Get started with grow junction, fill out your profile <br />{' '}
                  and visit your page for more insights
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
                {growJunctionUrl && (
                  <button
                    className={`${classes['left-button']} mb-5 text-lg`}
                    onClick={() => router.push(`/${growJunctionUrl}`)}
                  >
                    Visit your page
                  </button>
                )}
                <button
                  className={`${classes['right-button']} py-5 px-16 text-lg `}
                  onClick={() => router.push(`/mentor/profile`)}
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
