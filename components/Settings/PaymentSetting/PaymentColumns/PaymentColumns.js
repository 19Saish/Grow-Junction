import React from 'react'

const PaymentColumns = () => {
  return (
    <div>
      <div className="grid xl:grid-cols-5 grid-cols-4 gap-2">
        <div className="md:col-span-1 col-span-2">
          <div className="w-full bg-gray-300 h-14">
            <p className="xl:text-xl text-base p-4">Country</p>
          </div>
        </div>
        {/* second */}
        <div className="md:col-span-1 col-span-2">
          <div className="w-full bg-gray-300 h-14">
            <p className="xl:text-xl text-base p-4">Currency</p>
          </div>
        </div>
        {/* third */}
        <div className="md:col-span-1 col-span-2">
          <div className="w-full bg-gray-300 h-14">
            <p className="xl:text-xl text-sm p-4">Payment Gateway</p>
          </div>
        </div>
        {/* fourth */}
        <div className="md:col-span-1 col-span-2">
          <div className="w-full bg-gray-300 h-14">
            <p className="xl:text-xl text-base p-4">Tax Type</p>
          </div>
        </div>
        {/* fifth */}
        <div className="md:col-span-1 col-span-2">
          <div className="w-full bg-gray-300 h-14">
            <p className="xl:text-xl text-sm p-4">Default Tax Rate</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentColumns
