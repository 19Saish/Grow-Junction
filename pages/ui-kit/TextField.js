import Image from 'next/image'
import React from 'react'
import { color } from '../../public/theme/Color'

const TextField = React.forwardRef((props, ref) => {
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
    classOverride,
    classOverrideContainer,
    value,
    errMsg,
    min,
    phoneNumber = false,
    textStyleOverride,
    infoMsg,
    imageType,
    required,
    widthPartial,
    style,
    handleIncrement = () => {},
    handleDecrement = () => {},
    link,
    ...rest
  } = props
  // debugger
  return (
    <div
      className={`mb-5 flex-1 ${classOverrideContainer}`}
      style={style ? { ...style } : {}}
    >
      <label
        htmlFor="email-address"
        style={{
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
        style={{
          padding: 4,
          height: 40,

          ...styleOverride,
        }}
      >
        {phoneNumber ? (
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                color: color.lightGrey,
                marginLeft: 10,
                marginRight: 10,
                fontSize: 14,
              }}
            >
              +91
            </div>
            <div
              style={{
                color: color.lightGrey,
                marginLeft: 10,
                marginRight: 20,
                fontSize: 12,
              }}
            >
              |
            </div>
          </div>
        ) : null}
        {/* <input type="hidden" value="prayer" /> */}
        <input
          id={id}
          name={name}
          type={type}
          ref={ref}
          required={required}
          autoComplete="new-password"
          disabled={disabled}
          min={min}
          style={{
            // backgroundColor: color.headerColor,
            fontSize: 14,
            ...textStyleOverride,
          }}
          // onFocus={(event) => {
          //   event.target.setAttribute('autocomplete', 'new-password')
          //   console.log(event.target.autocomplete)
          // }}
          value={value}
          onChange={(text) => {
            onChangeValue(text)
          }}
          className={`${
            !widthPartial ? 'w-full' : ''
          } bg-gray-50 text-lg rounded-md  text-black border-none focus:outline-none ${
            classOverride ? classOverride : ''
          }`}
          placeholder={placeholder}
          {...rest}
        />
        {icon && (
          <Image src={icon} alt="" className="h-5 max-w-full self-center" />
        )}
        {imageType ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Image
              src={require('../../public/assets/icon/darkDrop.png')}
              alt=""
              style={{
                transform: 'rotate(180deg)',
                width: 9,
                height: 5,
                marginBottom: 5,
                cursor: 'pointer',
              }}
              onClick={() => {
                handleIncrement()
              }}
            />
            <Image
              src={require('../../public/assets/icon/darkDrop.png')}
              alt=""
              style={{
                width: 9,
                height: 5,
                fill: color.black,
                marginRight: 1,
                cursor: 'pointer',
              }}
              onClick={() => {
                handleDecrement()
              }}
            />
          </div>
        ) : null}
      </div>

      {errMsg ? (
        <div
          style={{
            //   position: 'absolute',
            //paddingTop: 35,
            fontSize: 12,
            color: 'red',
          }}
        >
          {errMsg}
        </div>
      ) : (
        <div
          style={{
            //   position: 'absolute',
            //paddingTop: 35,
            fontSize: 12,
            color: color.blue,
          }}
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            {infoMsg}
          </a>
        </div>
      )}
    </div>
  )
})
export default TextField
