import Image from 'next/image'
import React from 'react'
import { color } from '../../../public/theme/Color'
import Button from '../../ui-kit/Button'

const Header = (props) => {
  const { btnName, onClickBtn, style } = props
  return (
    <div
      className="flex flex-row justify-between w-full p-6"
      // style={{
      //   // justifyContent: 'space-between',
      //   backgroundColor: color.headerColor,
      //   // maxWidth: 300,
      //   alignItems: 'center',
      //   paddingLeft: 48,
      //   paddingRight: 48,
      // }}
    >
      <Image
        className=""
        src={require('../../../public/assets/icon/logo.svg')}
        alt={''}
        // style={{
        //   height: 89,
        //   // , width: 224
        // }}
      />
      <button
        className="px-8 mt-10 text-base font-bold bg-gray-900 text-white hover:bg-white hover:text-black h-16 rounded-md"
        onClick={() => {
          onClickBtn()
        }}
      >
        Sign up
      </button>
      {/* <Button
        label={btnName}
         containerOverride={{ minWidth: 200 }}
        onClick={() => {
          onClickBtn()
        }}
        styleOverride={style}
      /> */}
    </div>
  )
}

export default Header
