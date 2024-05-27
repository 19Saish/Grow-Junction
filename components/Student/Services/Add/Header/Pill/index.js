import React from 'react'

const Pill = ({ title, selected, className, onSelected }) => {
  return (
    <div
      className={`${className} ${
        selected
          ? 'border-orange-400 text-orange-400 '
          : 'border-gray-900 text-black'
      } border-black align-middle flex flex-row items-center rounded-full text-sm font-semibold py-2 px-6 border-2 cursor-pointer`}
      onClick={() => onSelected(title)}
    >
      {title}{' '}
    </div>
  )
}

export default Pill
