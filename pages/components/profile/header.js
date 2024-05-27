import Image from 'next/image'
import React from 'react'
import { color } from '../../../public/theme/Color'
import useWindowDimensions from '../../../public/utils/useWindowDimensions'

const Header = () => {
  const { width, height } = useWindowDimensions()

  return (
    <div className="flex flex-row">
      <div className="flex justify-start items-center border-gray-300 border-b text-4xl font-bold text-black px-4 py-3 w-1/2 md:w-full lg:w-full">
        Profile
      </div>
      <div className="flex justify-end border-gray-300 border-b p-4">
        <img src="../../../assets/icon/darkPlus.png" alt="" className="p-5" />
        <img src="../../../assets/icon/darkPlus.png" alt="" className="p-5" />
        <img src="../../../assets/icon/darkPlus.png" alt="" className="p-5" />
        <img src="../../../images/persona.png" alt="" className='w-12 h-12 mt-3'/>
        {/* <div className="w-8 h-8 bg-gray-200 rounded-full p-5 m-3">
        <img src="../../../assets/icon/darkPlus.png" alt="" className='p-5'/>
        </div> */}
      </div>
    </div>
  )
}
export default Header
