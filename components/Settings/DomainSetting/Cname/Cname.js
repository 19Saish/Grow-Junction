import React from 'react'
import classes from './Cname.module.css'
import SaveButton from '../../../Utilities/SaveBtn/SaveButton'

const Cname = () => {
  const domainHandler = () => {}

  const deleteHandler = () => {}
  return (
    <div>
      <p className="text-base text-gray-400 mt-6">
        To active your custom domain, you need to create new CNAME records in
        your DNS dashboard.
      </p>
      <p className="text-base text-gray-400 mt-6">
        Please refer to this guide for step by step process.
      </p>
      <label htmlFor="domainName" className="text-lg mt-6">
        Enter your domain name
      </label>
      <div className="mt-4">
        <label
          htmlFor="https"
          className="text-xl border-t border-l border-b border-gray-300 px-8 py-4"
        >
          https://
        </label>
        <input
          type="text"
          placeholder="jahangeerasif2344.spayee.com"
          className="text-xl px-36 py-4 border border-gray-300 bg-gray-300"
        />
        <button className={`${classes['bg']} text-xl px-8 py-4`}>
          Primary
        </button>
      </div>
      <p className="text-lg text-gray-400 mt-4">
        For Example : www.example.com or cohorts.example.com
      </p>
      <SaveButton handleSave={domainHandler} />
      <button className="text-lg font-bold" onClick={deleteHandler}>
        Delete Domain
      </button>
    </div>
  )
}

export default Cname
