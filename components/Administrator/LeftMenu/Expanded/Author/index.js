import React, { useState, useEffect } from 'react'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import classes from './Author.module.css'
import { listMentorRegisters } from '../../../../../src/graphql/queries'
import { listUserInfos } from '../../../../../src/graphql/queries'
import { getLoggedinUserEmail } from '../../../../../utilities/user'
import { getS3FileUrl } from '../../../../../utilities/others'
const Author = () => {
  const [image, setImage] = useState('')
  const [name, setName] = useState()
  const [url, setUrl] = useState()

  const getUrl = async () => {
    // debugger
    const usrName = getLoggedinUserEmail()
    console.log('username - ', usrName)
    const results = await API.graphql(
      graphqlOperation(listMentorRegisters, {
        filter: { username: { contains: usrName } },
      }),
    )
    if (results.data.listMentorRegisters.items.length > 0) {
      const data = { ...results.data.listMentorRegisters.items[0] }
      // debugger
      if (data.profile_image) {
        // const img = await Storage.get(data.profile_image)
        const img = await getS3FileUrl(data.profile_image)
        console.log('image - ', img)
        setImage(img)
      }
      // debugger
      setName(
        data.about_yourself?.first_name + ' ' + data.about_yourself?.last_name,
      )
      setUrl(data.about_yourself?.grow_junction_url || '')
    } else {
      const results = await API.graphql(
        graphqlOperation(listUserInfos, {
          filter: { username: { contains: usrName } },
        }),
      )
      if (results.data.listUserInfos.items.length > 0) {
        // debugger
        const data = { ...results.data.listUserInfos.items[0] }
        if (data.profile_image) {
          // const img = await Storage.get(data.profile_image)
          setImage(data.profile_image)
        }
        if (!name) {
          const name = data?.name
          //const url = data.grow_junction_url
          setName(name)
        }
      }
    }
  }

  useEffect(() => {
    getUrl()
  }, [])

  return (
    <section
      className={`${classes.container} h-80 bg-yellow-100 p-4 flex flex-col min-h-[22rem] mb-15`}
    >
      <section className={`flex flex-col items-center justify-center`}>
        <div
          className={`${classes['persona']} bg-gray-300 rounded-full flex justify-center`}
        >
          {
            image ? (
              <img
                src={image}
                alt=""
                className={`${classes['persona']} rounded-full`}
              />
            ) : null
            // <img
            //   src=""
            //   alt=""
            //   className={`${classes['persona']} rounded-full`}
            // />
          }
        </div>
        <article className="flex flex-col mt-3">
          <p className="text-base font-semibold">{name}</p>
          {url && (
            <p className="text-sm mb-5 font-normal text-gray-600">{`Growjunction.io/${url}`}</p>
          )}
        </article>
      </section>
      <section>
        <button className={`${classes.btn} w-full bg-white border-2 text-2xl`}>
          Publish a post
        </button>
      </section>
    </section>
  )
}

export default Author
