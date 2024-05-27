import React, { useState } from 'react'
//import DatePicker from 'react-datepicker'
//import 'react-datepicker/dist/react-datepicker.css'

const Upcoming = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [value, onChange] = useState(new Date())

  const [showCallDetail, setShowCallDetail] = useState(false)
  const [showJoinCall, setShowJoinCall] = useState(false)
  const [showReschedule, setShowReschedule] = useState(false)
  const [showRescheduleBooking, setShowRescheduleBooking] = useState(false)

  //No upcoming bookings to show
  const [upcomingBooking, setUpcomingBooking] = useState(true)

  return (
    <>
      <div className="bg-gray-50 mt-10">
        {upcomingBooking && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0">
            <div className="flex justify-center align-center bg-gray-50 mt-10">
              <div className=" bg-white text-center border border-b-2 rounded-2xl shadow-lg m-4 w-auto  md:w-5/6 lg:w-5/6">
                <div className="flex justify-between py-6 px-6 border-b border-gray-300">
                  <div className="flex justify-between p-2">
                    <img
                      src="../../../assets/icon/clock.png"
                      alt=""
                      className="w-3 h-3 mt-2"
                    ></img>
                    <span className="text-base font-normal md:text-xl lg:text-xl ml-2">
                      Today 05:00 - 05:30 pm (30min)
                    </span>
                  </div>

                  <div>
                    <div className="group relative text-base">
                      <button className="py-4 px-4 rounded inline-flex items-center group">
                        <img
                          src="../../../assets/icon/menu.png"
                          alt=""
                          className=""
                        ></img>
                      </button>

                      {/* menu list */}
                      <ul className="rounded absolute hidden text-black group-hover:block w-30 border-2 border-gray-50 shadow-md">
                        <li
                          className="bg-white hover:bg-gray-300 py-4 px-2 cursor-pointer border-b-2 border-gray-300"
                          onClick={() => setShowReschedule(true)}
                        >
                          Reschedule
                        </li>
                        <li
                          className="bg-white hover:bg-gray-300 py-4 px-2 cursor-pointer"
                          onClick={() => setShowCallDetail(true)}
                        >
                          Call details
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-start text-black text-2xl font-semibold p-6">
                    Mickey
                  </div>
                  <div className="flex justify-start text-black text-xl font-normal px-6 mb-10">
                    1 on 1 mock interview
                  </div>
                </div>
                <div className="py-4 px-6 border-t border-gray-300 text-gray-600">
                  <div className="flex justify-end">
                    <button
                      className="flex justify-center items-center bg-white border-2 border-gray-900 hover:border-amber-400 hover:bg-amber-400 hover:text-white text-black  rounded-full mr-5 w-full md:w-1/4 lg:w-1/4"
                      type="button"
                    >
                      <span className="text-sm font-semibold py-3">
                        Call details
                      </span>
                    </button>

                    <button
                      className="flex justify-center items-center bg-black hover:bg-amber-400 text-white rounded-full mr-5 w-full md:w-1/4 lg:w-1/4"
                      type="button"
                    >
                      <span className="text-sm font-semibold py-2">
                        Join call
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2nd */}
            <div className="flex justify-center align-center bg-gray-50 mt-10">
              <div className=" bg-white text-center border border-b-2 rounded-2xl shadow-lg m-4 w-auto md:w-5/6 lg:w-5/6">
                <div className="flex justify-between py-6 px-6 border-b border-gray-300">
                  <div className="flex justify-between p-2">
                    <img
                      src="../../../assets/icon/clock.png"
                      alt=""
                      className="w-3 h-3 mt-2"
                    ></img>
                    <span className="text-base font-normal md:text-xl lg:text-xl ml-2">
                      Today 05:00 - 05:30 pm (30min)
                    </span>
                  </div>

                  <div>
                    <div className="group relative text-base">
                      <button className="py-4 px-4 rounded inline-flex items-center group">
                        <img
                          src="../../../assets/icon/menu.png"
                          alt=""
                          className=""
                        ></img>
                      </button>

                      {/* menu list */}
                      <ul className="rounded absolute hidden text-black group-hover:block w-30 border-2 border-gray-50 shadow-md">
                        <li
                          className="bg-white hover:bg-gray-300 py-4 px-2 cursor-pointer border-b-2 border-gray-300"
                          onClick={() => setShowReschedule(true)}
                        >
                          Reschedule
                        </li>
                        <li
                          className="bg-white hover:bg-gray-300 py-4 px-2 cursor-pointer"
                          onClick={() => setShowCallDetail(true)}
                        >
                          Call details
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-start text-black text-2xl font-semibold p-6">
                    Mickey
                  </div>
                  <div className="flex justify-start text-black text-xl font-normal px-6 mb-10">
                    1 on 1 mock interview
                  </div>
                </div>
                <div className="py-4 px-6 border-t border-gray-300 text-gray-600">
                  <div className="flex justify-end">
                    <button
                      className="flex justify-center items-center bg-white border-2 border-gray-900 hover:border-amber-400 hover:bg-amber-400 hover:text-white text-black  rounded-full mr-5 w-full md:w-1/4 lg:w-1/4"
                      type="button"
                    >
                      <span className="text-sm font-semibold py-3">
                        Call details
                      </span>
                    </button>

                    <button
                      className="flex justify-center items-center bg-black hover:bg-amber-400 text-white rounded-full mr-5 w-full md:w-1/4 lg:w-1/4"
                      type="button"
                    >
                      <span className="text-sm font-semibold py-2">
                        Join call
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3rd */}

            <div className="flex justify-center align-center bg-gray-50 mt-10">
              <div className=" bg-white text-center border border-b-2 rounded-2xl shadow-lg m-4 w-auto  md:w-5/6 lg:w-5/6">
                <div className="flex justify-between py-6 px-6 border-b border-gray-300">
                  <div className="flex justify-between p-2">
                    <img
                      src="../../../assets/icon/clock.png"
                      alt=""
                      className="w-3 h-3 mt-2"
                    ></img>
                    <span className="text-base font-normal md:text-xl lg:text-xl ml-2">
                      Today 05:00 - 05:30 pm (30min)
                    </span>
                  </div>

                  <div>
                    <div className="group relative text-base">
                      <button className="py-4 px-4 rounded inline-flex items-center group">
                        <img
                          src="../../../assets/icon/menu.png"
                          alt=""
                          className=""
                        ></img>
                      </button>

                      {/* menu list */}
                      <ul className="rounded absolute hidden text-black group-hover:block w-30 border-2 border-gray-50 shadow-md">
                        <li
                          className="bg-white hover:bg-gray-300 py-4 px-2 cursor-pointer border-b-2 border-gray-300"
                          onClick={() => setShowReschedule(true)}
                        >
                          Reschedule
                        </li>
                        <li
                          className="bg-white hover:bg-gray-300 py-4 px-2 cursor-pointer"
                          onClick={() => setShowCallDetail(true)}
                        >
                          Call details
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-start text-black text-2xl font-semibold p-6">
                    Mickey
                  </div>
                  <div className="flex justify-start text-black text-xl font-normal px-6 mb-10">
                    1 on 1 mock interview
                  </div>
                </div>
                <div className="py-4 px-6 border-t border-gray-300 text-gray-600">
                  <div className="flex justify-end">
                    <button
                      className="flex justify-center items-center bg-white border-2 border-gray-900 hover:border-amber-400 hover:bg-amber-400 hover:text-white text-black  rounded-full mr-5 w-full md:w-1/4 lg:w-1/4"
                      type="button"
                    >
                      <span className="text-sm font-semibold py-3">
                        Call details
                      </span>
                    </button>

                    <button
                      className="flex justify-center items-center bg-black hover:bg-amber-400 text-white rounded-full mr-5 w-full md:w-1/4 lg:w-1/4"
                      type="button"
                    >
                      <span className="text-sm font-semibold py-2">
                        Join call
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 4th */}
            <div className="flex justify-center align-center bg-gray-50 mt-10">
              <div className=" bg-white text-center border border-b-2 rounded-2xl shadow-lg m-4 w-auto  md:w-5/6 lg:w-5/6">
                <div className="flex justify-between py-6 px-6 border-b border-gray-300">
                  <div className="flex justify-between p-2">
                    <img
                      src="../../../assets/icon/clock.png"
                      alt=""
                      className="w-3 h-3 mt-2"
                    ></img>
                    <span className="text-base font-normal md:text-xl lg:text-xl ml-2">
                      Today 05:00 - 05:30 pm (30min)
                    </span>
                  </div>

                  <div>
                    <div className="group relative text-base">
                      <button className="py-4 px-4 rounded inline-flex items-center group">
                        <img
                          src="../../../assets/icon/menu.png"
                          alt=""
                          className=""
                        ></img>
                      </button>

                      {/* menu list */}
                      <ul className="rounded absolute hidden text-black group-hover:block w-30 border-2 border-gray-50 shadow-md">
                        <li
                          className="bg-white hover:bg-gray-300 py-4 px-2 cursor-pointer border-b-2 border-gray-300"
                          onClick={() => setShowReschedule(true)}
                        >
                          Reschedule
                        </li>
                        <li
                          className="bg-white hover:bg-gray-300 py-4 px-2 cursor-pointer"
                          onClick={() => setShowCallDetail(true)}
                        >
                          Call details
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-start text-black text-2xl font-semibold p-6">
                    Mickey
                  </div>
                  <div className="flex justify-start text-black text-xl font-normal px-6 mb-10">
                    1 on 1 mock interview
                  </div>
                </div>
                <div className="py-4 px-6 border-t border-gray-300 text-gray-600">
                  <div className="flex justify-end">
                    <button
                      className="flex justify-center items-center bg-white border-2 border-gray-900 hover:border-amber-400 hover:bg-amber-400 hover:text-white text-black  rounded-full mr-5 w-full md:w-1/4 lg:w-1/4"
                      type="button"
                    >
                      <span className="text-sm font-semibold py-3">
                        Call details
                      </span>
                    </button>

                    <button
                      className="flex justify-center items-center bg-black hover:bg-amber-400 text-white rounded-full mr-5 w-full md:w-1/4 lg:w-1/4"
                      type="button"
                    >
                      <span className="text-sm font-semibold py-2">
                        Join call
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!upcomingBooking && (
          <>
            <div className="flex flex-col justify-center items-center h-screen">
              <div className="w-40 h-40 md:w-1/5 md:h-1/5 lg:w-1/5 lg:h-1/5 bg-gray-400 -mt-40 mb-5"></div>
              <p>No upcoming bookings to show</p>
            </div>
          </>
        )}

        {/* outer */}
      </div>

      {showCallDetail ? (
        <>
          <div className="flex justify-center items-center bg-gray-600 bg-opacity-50 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" bg-white text-center mt-9 rounded-2xl shadow-lg w-full md:w-1/5 lg:w-1/5">
              <div className="flex justify-between px-8 py-4 border-b border-gray-300">
                <div className="text-sm font-semibold mt-4">Call details</div>
                <div>
                  <button
                    className=""
                    type="button"
                    onClick={() => setShowCallDetail(false)}
                  >
                    <img
                      src="../../../assets/icon/cross.png"
                      alt=""
                      className="w-4 h-4 mr-2"
                    ></img>
                  </button>
                </div>
              </div>

              <p className="flex justify-start text-sm font-semibold mt-5 px-8">
                What is this call about?
              </p>
              <p className="flex justify-start text-xs font-normal text-gray-500 px-8">
                Mock Interview
              </p>

              <p className="flex justify-start text-sm font-semibold mt-5 px-8">
                Email
              </p>
              <p className="flex justify-start text-xs font-normal text-gray-500 px-8">
                Mickeymya@gmail.com
              </p>

              <p className="flex justify-start text-sm font-semibold mt-5 px-8">
                Phone
              </p>
              <p className="flex justify-start text-xs font-normal text-gray-500 px-8">
                +91 9886 768 786
              </p>

              <div className="py-4 px-6 border-t border-gray-300 text-gray-600 mt-5">
                <div className="flex justify-end">
                  <button
                    className="text-base bg-white hover:bg-gray-900 text-black hover:text-white font-bold py-4 px-6 border border-black rounded"
                    type="button"
                    onClick={() => setShowJoinCall(true)}
                  >
                    Join Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {showReschedule ? (
        <>
          <div className="flex justify-center items-center bg-gray-600 bg-opacity-50 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" bg-white text-center mt-9 rounded-2xl shadow-lg w-full md:w-1/4 lg:w-1/4">
              <div className="flex justify-between px-8 py-4 border-b border-gray-300">
                <div className="flex flex-col justify-start items-start">
                  <span className="text-sm font-semibold mt-4">
                    Reschedule Booking
                  </span>
                  <span className="text-xs font-normal mt-4">
                    Mickey : Today 05:00 - 05:30 pm (30min)
                  </span>
                </div>
                <div>
                  <button
                    className=""
                    type="button"
                    onClick={() => setShowReschedule(false)}
                  >
                    <img
                      src="../../../assets/icon/cross.png"
                      alt=""
                      className="w-4 h-4 mr-2"
                    ></img>
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-start items-start px-8 py-4">
                <div className="mt-2">
                  <div className="flex items-center">
                    <input
                      id="avilability"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-gray-900 bg-gray-100 rounded border-gray-300 focus:ring-black"
                    />
                    <label
                      htmlFor="avilability"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      Using existing availability
                    </label>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex items-center">
                    <input
                      id="customtime"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-gray-900 bg-gray-100 rounded border-gray-300 focus:ring-black"
                    />
                    <label
                      htmlFor="customtime"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      providing custom time slots
                    </label>
                  </div>
                </div>

                <div className="text-sm font-normal mb-2 mt-5">
                  Reason <span className="text-gray-400">(optional)</span>
                </div>
                <div className="flex flex-wrap items-stretch w-5/6 border-2 ">
                  <textarea className="w-full"></textarea>
                </div>
              </div>

              <div className="py-4 px-6 border-t border-gray-300 text-gray-600">
                <div className="flex justify-center item-center w-full">
                  <button
                    className="flex justify-center items-center bg-gray-900 border-2 border-gray-900 hover:border-amber-400 hover:bg-amber-400 hover:text-black text-white w-full rounded-md"
                    type="button"
                    onClick={() => setShowRescheduleBooking(true)}
                  >
                    <span className="text-sm font-semibold py-2">
                      Reschedule call
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {showJoinCall ? (
        <>
          <div className="flex justify-center items-center bg-gray-600 bg-opacity-50 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" bg-white text-center mt-9 rounded-2xl shadow-lg w-full md:w-1/4 lg:w-1/4">
              <div className="flex justify-between px-8 py-4 border-b border-gray-300">
                <div className="text-sm font-semibold mt-4">Join Call</div>
                <div>
                  <button
                    className=""
                    type="button"
                    onClick={() => setShowJoinCall(false)}
                  >
                    <img
                      src="../../../assets/icon/cross.png"
                      alt=""
                      className="w-4 h-4 mr-2"
                    ></img>
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center px-4 py-2">
                <img
                  src="../../../images/student.png"
                  alt=""
                  className="w-20 h-20 mt-2"
                />
                <div className="text-xl font-semibold py-4">
                  Call with Mickey
                </div>
                <div className="flex text-sm font-normal text-gray-700">
                  For 1 on 1 mock interview
                </div>
                <div className="flex flex-row justify-center items-center text-xl font-normal p-4">
                  <button>
                    <img
                      src="../../../assets/icon/date.png"
                      alt=""
                      className="w-15 h-15 px-4"
                    />
                  </button>
                  <span className="text-sm font-semibold text-blue-600 text-normal">
                    Wednesday, 05 November 5:30 pm
                  </span>
                </div>
              </div>

              <div className="py-4 px-6 border-t border-gray-300 text-gray-600">
                <div className="flex justify-evenly">
                  <button className="text-base bg-white hover:bg-gray-900 text-black hover:text-white font-bold py-4 px-6 border border-black rounded">
                    View Details
                  </button>
                  <button className="text-base bg-white hover:bg-gray-900 text-black hover:text-white font-bold py-4 px-6 border border-black rounded">
                    Launch Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {showRescheduleBooking ? (
        <>
          <div className="flex justify-center items-center bg-gray-600 bg-opacity-50 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" bg-white text-center mt-9 rounded-2xl shadow-lg w-full md:w-1/4 lg:w-1/4">
              <div className="flex justify-between px-8 py-4 border-b border-gray-300">
                <div className="flex flex-col justify-start items-start">
                  <span className="text-sm font-semibold mt-4">
                    Reschedule Booking
                  </span>
                  <span className="text-xs font-normal mt-4">
                    Mickey : Today 05:00 - 05:30 pm (30min)
                  </span>
                </div>
                <div>
                  <button
                    className=""
                    type="button"
                    onClick={() => setShowRescheduleBooking(false)}
                  >
                    <img
                      src="../../../assets/icon/cross.png"
                      alt=""
                      className="w-4 h-4 mr-2"
                    ></img>
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-start items-start px-8 py-4">
                <div className="mt-5">
                  <div className="flex items-center">
                    <input
                      id="availability"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-gray-900 bg-gray-100 rounded border-gray-300 focus:ring-black"
                    />
                    <label
                      htmlFor="availability"
                      className="ml-2 text-sm font-semibold text-gray-900"
                    >
                      Using existing availability
                    </label>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center">
                    <input
                      id="customtime"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-gray-900 bg-gray-100 rounded border-gray-300 focus:ring-black"
                    />
                    <label
                      htmlFor="customtime"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      providing custom time slots
                    </label>
                  </div>
                </div>

                <div className="flex flex-row mt-10 w-full">
                  <div className="flex flex-row justify-center border-2 mb-5 rounded-lg w-1/2">
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="text-sm font-normal"
                    ></input>
                  </div>
                  <div className="p-1"></div>
                  <div className="flex flex-row justify-center border-2 mb-5 rounded-lg w-1/2">
                    <input
                      type="time"
                      id="time"
                      name="time"
                      className="text-sm font-normal"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row md:flex-row lg:flex-row mt-2 w-full">
                  <div className="flex flex-row justify-center border-2 mb-5 rounded-lg w-1/2">
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="text-sm font-normal"
                    ></input>
                  </div>
                  <div className="p-1"></div>
                  <div className="flex flex-row justify-center border-2 mb-5 rounded-lg w-1/2">
                    <input
                      type="time"
                      id="time"
                      name="time"
                      className="text-sm font-normal"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row md:flex-row lg:flex-row mt-2 w-full">
                  <div className="flex flex-row justify-center border-2 mb-5 rounded-lg w-1/2">
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="text-sm font-normal"
                    ></input>
                  </div>
                  <div className="p-1"></div>
                  <div className="flex flex-row justify-center border-2 mb-5 rounded-lg w-1/2">
                    <input
                      type="time"
                      id="time"
                      name="time"
                      className="text-sm font-normal"
                    ></input>
                  </div>
                </div>

                <div className="flex justify-center item-center w-full">
                  <button className="flex justify-center items-center bg-white border-2 border-gray-900 hover:border-amber-400 hover:bg-amber-400 hover:text-black text-black w-full rounded-md">
                    <img
                      src="../../../assets/icon/darkPlus.png"
                      alt=""
                      className="w-4 h-4 mr-2"
                    ></img>
                    <span className="text-xl font-semibold py-2">
                      Add slots
                    </span>
                  </button>
                </div>

                <div className="text-sm font-normal mt-10">
                  Reason{' '}
                  <span className="text-sm text-gray-300">(optional)</span>
                </div>
                {/* todo - text area width to increase */}
                <div className="flex flex-wrap w-96 border-2 ">
                  <textarea></textarea>
                </div>
              </div>

              <div className="py-4 px-6">
                <div className="flex justify-center item-center w-auto border-2 mb-5 px-4 py-2 rounded-lg">
                  <img
                    src="../../../assets/icon/exclamationmarkcircle.png"
                    className="w-3 h-3"
                  ></img>
                  <span className="text-xs  font-normal w-auto text-gray-900 ml-2">
                    Make sure to provide at least 3 slots to ensure attendee has
                    enough options to pick from
                  </span>
                </div>
              </div>

              <div className="py-4 px-6 border-t border-gray-300 text-gray-600">
                <div className="flex justify-center item-center w-full">
                  <button className="flex justify-center items-center bg-gray-900 border-2 border-gray-900 hover:border-amber-400 hover:bg-amber-400 hover:text-black text-white w-full rounded-md">
                    <span className="text-sm font-semibold py-2">
                      Reschedule call
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default Upcoming
