import Image from 'next/image'
import React from 'react'
import { color } from '../../public/theme/Color'

const CheckBox = (props) => {
  const {
    styleOverride,
    direction,
    title,
    onSubmit = () => {},
    value = false,
    checkBool = false,
  } = props
  return (
    <div
      className="flex items-center"
      dir={direction}
      style={styleOverride}
      onClick={() => {
        console.log('check bool', checkBool)

        onSubmit(checkBool)
      }}
    >
      {!checkBool ? (
        <div
          style={{
            height: 14,
            width: 14,
            borderWidth: 1,
            borderColor: color.blackVariant,
            borderRadius: 1,
          }}
        />
      ) : (
        <div
          style={{
            height: 14,
            width: 14,
            backgroundColor: color.blackVariant,
            // borderWidth: 2,
            // borderColor: color.textColor1,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            // flex: 1,
            borderRadius: 1,
          }}
        >
          <Image
            src={require('../../public/assets/icon/tick.png')}
            alt=""
            style={{ width: 9.9, height: 7 }}
          />
        </div>
      )}
      <div
        style={{
          //   marginRight: 20,
          color: color.black,
          fontSize: 16,
          marginLeft: 15,
        }}
      >
        {title}
      </div>
    </div>
  )
}
export default CheckBox
