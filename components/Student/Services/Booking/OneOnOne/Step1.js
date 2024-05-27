import React from 'react'
import classes from './Step1.module.css'
const Step1 = ({
  showServiceDetail,
  oneOnOneService,
  handleBookClick,
  setShowServiceDetail,
}) => {
  debugger
  return (
    <div className="  flex justify-center items-center bg-gray-600 bg-opacity-50 overflow-x-hidden overflow-y-auto fixed inset-0 z-100 outline-none focus:outline-none">
      <div className=" bg-white text-center mt-9 rounded-2xl shadow-lg w-full md:w-2/5 lg:w-2/5">
        <div className="flex justify-between px-8 pb-4  border-gray-300 bg-slate-100 ">
          <div className="flex flex-row justify-start items-start px-6 py-6 bg-gray-100 rounded-md">
            <div
              className={`${classes['img-profile']} bg-gray-300 rounded-md`}
            ></div>
            <div className="ml-2 mt-6 p-2">
              <span className="text-3xl font-semibold ">
                1 on 1 Mock Interview
              </span>
              <div className="flex flex-row justify-start items-start mt-2">
                {/* <span className="text-4xl font-bold mt-4">
                        Rs. {oneOnOneService.listedPrice} {oneOnOneService.finalPrice}
                      </span> */}
                <span className="text-4xl font-bold py-3">
                  ₹
                  {oneOnOneService.listedPrice ===
                  oneOnOneService.finalPrice ? (
                    oneOnOneService.finalPrice
                  ) : (
                    <>
                      <span className="  bold">
                        <span className="bold">
                          {oneOnOneService.listedPrice}
                        </span>
                      </span>{' '}
                      <s className="text-xl   text-red-800 bold">
                        {oneOnOneService.finalPrice}
                      </s>
                    </>
                  )}
                  <span className="text-xl font-semibold ml-5">
                    {`(`}
                    {(oneOnOneService.finalPrice -
                      oneOnOneService.listedPrice) /
                      100}
                  </span>
                  <span className="text-xl font-semibold">%{`)`}</span>
                </span>
              </div>
              <div
                className="flex justify-center items-center px-4 py-2 mt-4 border-2 border-gray-900 rounded-full w-1/2 text-2xl font-semibold hover:bg-gray-900 hover:text-white w-auto"
                onClick={() => handleBookClick()}
              >
                Book Now
              </div>
            </div>
          </div>
          <div>
            <button
              className=""
              type="button"
              onClick={() => setShowServiceDetail(false)}
            >
              <img
                src="../../../assets/icon/cross.png"
                alt=""
                className="w-4 h-4 mr-2 ml-2"
              ></img>
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start ml-10">
          <div className="mt-5">
            <p className="text-xl font-bold mb-3 -ml-4">Session includes</p>
            <p className="flex text-sm font-semibold mb-2">
              <img
                src="../../../assets/icon/approve.png"
                alt=""
                className="w-4 h-4 mr-2"
              />
              1 on 1 mock interviwes
            </p>

            <p className="flex text-sm font-semibold mb-2">
              <img
                src="../../../assets/icon/approve.png"
                alt=""
                className="w-4 h-4 mr-2"
              />
              Career guidance
            </p>

            <p className="flex text-sm font-semibold mb-2">
              <img
                src="../../../assets/icon/approve.png"
                alt=""
                className="w-4 h-4 mr-2"
              />
              Portfolio review
            </p>

            <p className="flex text-sm font-semibold mb-10">
              <img
                src="../../../assets/icon/approve.png"
                alt=""
                className="w-4 h-4 mr-2"
              />
              Placement guidance
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step1
