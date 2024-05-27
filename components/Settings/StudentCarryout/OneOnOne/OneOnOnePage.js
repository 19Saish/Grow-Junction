import React from 'react'
import Card from '../Utilities/Card/Card'
import Link from 'next/link'

const OneOnOnePage = () => {

  

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by Date, Topic, Expertise"
          className="text-lg border border-gray-500 w-2/5"
        />
        <button className="text-lg px-10 py-2 border border-gray-500 mx-12">
          Expertise
        </button>
        <button className="text-lg px-10 py-2 border border-gray-500">
          Date
        </button>
        <div className="grid grid-cols-3 ml-4">
          <Link href="/admin/oneononejoin">
            <Card />
          </Link>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  )
}

export default OneOnOnePage
