import React from 'react'
import BankDetails from './BankDetails'
import Earnings from './Earnings'

const Payment = () => {
  const [openTab, setOpenTab] = React.useState(1)
  return (
    <>
      <div className="flex flex-row w-full">
        <div className="w-full">
          <div className="bg-grey-50">
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
              <li className="mr-2">
                <a
                  href="#"
                  className={
                    openTab === 1
                      ? 'inline-block p-4 text-xl text-white bg-amber-400 rounded-t-lg active'
                      : 'inline-block p-4 text-xl text-black rounded-t-lg hover:text-white hover:bg-amber-400'
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenTab(1)
                  }}
                >
                  Your Bank Details
                </a>
              </li>
              <li className="mr-2">
                <a
                  href="#"
                  className={
                    openTab === 2
                      ? 'inline-block p-4 text-xl text-white bg-amber-400 rounded-t-lg active'
                      : 'inline-block p-4 text-xl text-black rounded-t-lg hover:text-white hover:bg-amber-400'
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenTab(2)
                  }}
                >
                  Your Earnings
                </a>
              </li>
            </ul>

            <div className={openTab === 1 ? 'block' : 'hidden'}>
              <BankDetails setValuesParent={() => {}} />
            </div>

            <div className={openTab === 2 ? 'block' : 'hidden'}>
              <Earnings />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment
