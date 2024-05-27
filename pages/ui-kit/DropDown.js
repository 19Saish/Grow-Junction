import Image from 'next/image'
import React from 'react'
import { color } from '../../public/theme/Color'

const DropDown = (props) => {
  const {
    label,
    placeholder,
    type,
    id,
    name,
    onChangeValue,
    disabled = false,
    icon,
    styleOverride,
    containerStyle,
    value,
    errMsg,
    infoMsg = '',
    dropDownBool = false,
    openDropDown = () => {},
    mulitline,
    iconOverride,
    ...rest
  } = props

  return (
    <div
      className="mb-5 flex-1"
      //   style={containerStyle}
      onClick={() => {
        openDropDown(value)
      }}
    >
      <label
        // dir="rtl"
        style={{
          //   color: Color.textColor,
          color: color.blackVariant,
          fontSize: 14,
          fontWeight: 400,
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      <div
        className="focus-outline mr-5  w-full flex flex-row rounded-md border border-gray-300 px-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        style={{ padding: 4, height: 56, ...containerStyle }}
      >
        {value || value !== '' ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              color: color.black,
              fontSize: 14,
              alignSelf: 'center',
            }}
          >
            {value}
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              display: 'flex',
              color: color.textGrey,
              fontSize: 14,
              alignSelf: 'center',
            }}
          >
            {placeholder}
          </div>
        )}

        <Image
          src={require('../../public/assets/icon/darkDrop.png')}
          alt=""
          style={
            dropDownBool
              ? {
                  height: 5,
                  width: 10,
                  transform: 'rotate(180deg)',
                  alignSelf: 'center',
                  cursor: 'pointer',
                  ...iconOverride,
                }
              : {
                  height: 5,
                  width: 10,
                  alignSelf: 'center',
                  cursor: 'pointer',
                  ...iconOverride,
                }
          }
        />
        {/* {mulitline && value?.length ? (
          <>
            {value?.map((item, index) => {
              return (
                <div
                  key={index.toString()}
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    // flexDirection: "row",
                    // marginRight: 1,
                  }}
                >
                  {item?.value}
                </div>
              )
            })}
          </>
        ) : ( */}

        {/* )} */}
      </div>
      {errMsg ? (
        <div
          style={{
            fontSize: 12,
            color: 'red',
          }}
        >
          {errMsg}
        </div>
      ) : (
        <div
          style={{
            fontSize: 12,
            marginTop: 3,
            // color: color.lightGrey1,
          }}
        >
          {infoMsg}
        </div>
      )}
    </div>
  )
}

export default DropDown
