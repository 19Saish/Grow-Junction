import React, { useState } from 'react'
import classes from './DomainSetting.module.css'
import Cname from './Cname/Cname'

const DomainSetting = () => {
  const [clicked, setClicked] = useState(1)
  const [active, setActive] = useState(1)

  const handleClick = (id) => {
    setClicked(id)
    setActive(id)
  }

  

  return (
    <div className="h-screen overflow-auto">
      <h1 className="text-4xl font-semibold mb-10">Domain</h1>
      <hr />
      <div className="md:grid md:grid-cols-4 grid-cols-2 w-full">
        <div className="md:m-10">
          <p className="text-xl font-semibold">Your Domains</p>
        </div>
        <div className="mt-8 w-full col-span-3">
          <div>
            <label htmlFor="defaultdomain" className="text-lg">
              Default Domain
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
              <button className="text-xl px-8 py-4">Set Primary</button>
            </div>
          </div>
          <div>
            <p className="text-lg mt-16">Link your Custom Domain</p>

            <div class="text-lg mt-20 w-4/5 font-medium text-center border-b border-gray-200 ">
              <ul class="grid grid-cols-4">
                <li
                  class={
                    active === 1
                      ? `${classes['active']} mr-2 pb-4 col-span-2 w-full cursor-pointer`
                      : `mr-2 pb-4 col-span-2 w-full cursor-pointer`
                  }
                  onClick={() => handleClick(1)}
                >
                  With Cloudflare
                </li>
                <li
                  class={
                    active === 2
                      ? `${classes['active']} mr-2 pb-4 col-span-2 w-full cursor-pointer`
                      : `mr-2 pb-4 col-span-2 w-full cursor-pointer`
                  }
                  onClick={() => handleClick(2)}
                >
                  With CNAME Mapping
                </li>
              </ul>
            </div>
            <div
              className={
                clicked === 2
                  ? `${classes['show-content']}`
                  : `${classes['content']}`
              }
            >
              <Cname />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DomainSetting
