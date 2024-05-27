import React from 'react'

const SkeletonLoader = () => {
  return (
    <div
      role="status"
      className="space-y-0 animate-pulse max-w-lg"
      style={{ display: 'flex', flex: 1 }}
    >
      <div
        className="flex items-center space-x-2 w-full"
        // style={{ width: "100%" }}
      >
        <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
        <div className="h-8 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
        <div className="h-8 bg-gray-300 rounded-full dark:bg-gray-600 w-135"></div>
        {/* <div className="h-8 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
        <div className="h-8 bg-gray-300 rounded-full dark:bg-gray-600 w-35"></div> */}
      </div>
      <div className="flex items-center w-full space-x-2 ">
        <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-8 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-8 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      </div>
      {/* <div className="flex items-center w-full space-x-2 max-w-[400px]">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[480px]">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      </div> */}
      {/* <div className="flex items-center w-full space-x-2 max-w-[440px]">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[360px]">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div> */}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default SkeletonLoader
