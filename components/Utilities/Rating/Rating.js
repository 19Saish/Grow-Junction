import React, { useEffect, useState, useRef } from 'react'
import { Rating } from 'flowbite-react'
import classes from './Rating.module.css'

const RatingPage = () => {
  const myRef = useRef()
  const [barper, setBarper] = useState('')
  const [divwidth, setDivWidth] = useState('')

  useEffect(() => {
    if(myRef.current){
      const divWidth = myRef.current.offsetWidth
      setDivWidth(divWidth)
    }
    console.log('div Width',divwidth);

    const PercentageFinder = () => {
      const onePart = divwidth / 5
      console.log(onePart);
      setBarper(onePart)
    }

    PercentageFinder()
  }, [myRef])



  return (
    <div className="grid md:grid-cols-10 sm:grid-cols-5 col-span-4">
      <div>
        <h1 className="text-8xl">4.5</h1>
        <Rating className="mb-2 mt-2" size="md">
          <Rating.Star color="#01875f" />
          <Rating.Star color="#01875f" />
          <Rating.Star color="#01875f" />
          <Rating.Star color="#01875f" />
          <Rating.Star color="#01875f" />
        </Rating>
        <p className="mt-4 text-base font-medium text-gray-500">554 reviews</p>
      </div>
      <div className="md:col-span-9 sm:col-span-4 col-span-3">
        <div className="flex items-center w-full">
          <p className="text-lg mr-4">5</p>
          <div className="h-4 w-full bg-gray-300 rounded-lg">
            <div
              ref={myRef}
              className={`${classes['bar']} h-4 rounded-lg z-10`}
              style={{ width: `100%` }}
            ></div>
          </div>
        </div>
        {/* 4th line */}
        <div className="flex items-center w-full mt-2">
          <p className="text-lg mr-4">4</p>
          <div className="h-4 w-full bg-gray-300 rounded-lg">
            <div
              className={`${classes['bar']} h-4 rounded-lg z-10`}
              style={{ width: `80%` }}
            ></div>
          </div>
        </div>
        {/* 3rd line */}
        <div className="flex items-center w-full mt-2">
          <p className="text-lg mr-4">3</p>
          <div className="h-4 w-full bg-gray-300 rounded-lg">
            <div
              className={`${classes['bar']} h-4 rounded-lg z-10`}
              style={{ width: `55%` }}
            ></div>
          </div>
        </div>
        {/* 2nd line */}
        <div className="flex items-center w-full mt-2">
          <p className="text-lg mr-4">2</p>
          <div className="h-4 w-full bg-gray-300 rounded-lg">
            <div
              className={`${classes['bar']} h-4 rounded-lg z-10`}
              style={{ width: `30%` }}
            ></div>
          </div>
        </div>
        {/* 1st line */}
        <div className="flex items-center w-full mt-2">
          <p className="text-lg mr-4">1</p>
          <div className="h-4 w-full bg-gray-300 rounded-lg">
            <div
              className={`${classes['bar']} h-4 rounded-lg z-10`}
              style={{ width: `5%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingPage
