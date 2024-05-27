import React, { useState } from 'react'
import Pill from './Pill'
const Header = ({ currentService, setCurrentService, items, saveClick }) => {
  return (
    <>
      <section className="flex md:flex-row flex-col min-h-[10vh] justify-between">
        <div className="h-50 mb-10 md:mb-0">
          <span className="text-2xl font-bold ">Launch New Service</span>
        </div>
        <div className="flex justify-center items-center">
          <span
            onClick={() => setCurrentService('')}
            className="mr-10 text-base font-bold hover:bg-gray-200 px-10 py-5 cursor-pointer rounded-full"
          >
            Reset all
          </span>
          <span
            className="text-base font-bold rounded-md py-6 px-16 bg-gray-900 text-white cursor-pointer"
            onClick={saveClick}
          >
            Add Service
          </span>
        </div>
      </section>
      <section className=" rounded-xl bg-white px-7 py-10 flex flex-col mt-5">
        <span className=" text-base font-bold mb-5">Choose your service</span>
        <section className="flex">
          {items.map((item, index) => {
            return (
              <Pill
                selected={item === currentService}
                title={item}
                key={index}
                onSelected={setCurrentService}
                className="mr-3"
              />
            )
          })}
        </section>
      </section>
      <div className='w-full h-px bg-gray-300 border-0'></div>
    </>
  )
}

export default Header