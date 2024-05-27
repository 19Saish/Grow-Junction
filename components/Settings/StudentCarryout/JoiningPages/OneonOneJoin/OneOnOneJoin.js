import React from 'react'
import JoinBtn from '../../../../Utilities/JoinBtn/JoinBtn'

const OneOnOneJoin = () => {
  const joinHandler = () => {}
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-10">1 on 1 Session</h1>
      <hr />
      <div className="mt-10">
        {/* {upcomingWorkshop?.map((item, index) => (
          <table className={index === 0 ? `w-4/5` : `w-4/5 mt-10`}>
            <tr>
              <th className="text-lg col-span-2 break-all">
                {`${item?.title} Workshop by ${item?.username}`}
              </th>
              <th className="text-lg"> {item?.workshopDate} </th>
              <th className="text-lg">{`${item?.workshopTime} (${item?.callDuration})`}</th>
            </tr>
          </table>
        ))} */}
      </div>

      <div className="mt-64 w-full">
        <div className="flex justify-center">
          <JoinBtn handleJoin={joinHandler} />
        </div>
      </div>
    </div>
  )
}

export default OneOnOneJoin
