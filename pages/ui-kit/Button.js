import React from 'react'
import Loader from './Loader'
const Button = (props) => {
  const {
    label,
    handleSubmit = () => {},
    styleOverride,
    disable,
    image,
    type,
    classOverride,
    containerOverride,
    href,
    loader = false,
    link = false,
    ...rest
  } = props

  return (
    <div
      className={`flex w-full justify-center cursor-pointer`}
      style={containerOverride ? containerOverride : {}}
    >
      <button
        // type="submit"
        disabled={disable}
        className={`group disabled:text-gray-500 relative flex w-full justify-center  items-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${classOverride} disabled:bg-gray-100`}
        style={styleOverride}
        type={type || 'button'}
        {...rest}
      >
        {link ? (
          <>
            {image && (
              <img
                src={image}
                alt={label}
                className="w-10 h-10 object-cover mr-2"
              />
            )}
            <a
              href={href || 'https://gmail.com'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          </>
        ) : (
          <>
            {loader ? (
              <Loader />
            ) : (
              <div className="flex w-full justify-center items-center p-[15px]">
                {image && (
                  <img
                    src={image}
                    alt={label}
                    className="w-10 h-10 object-cover mr-2"
                  />
                )}
                <span
                  disabled={disable}
                  style={{ lineHeight: '15px', padding: '10px' }}
                >
                  {label}
                </span>{' '}
              </div>
            )}
          </>
        )}
      </button>
    </div>
  )
}
export default Button
