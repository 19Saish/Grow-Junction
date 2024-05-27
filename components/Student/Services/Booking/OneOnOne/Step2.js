import React, { useState, useEffect, useReducer } from 'react'
import classes from './Step2.module.css'
import BookingDatePicker from 'react-datetime'
import moment from 'moment'
import TimezoneSelect, { allTimezones } from 'react-timezone-select'
import { API, graphqlOperation } from 'aws-amplify'
import { getMentorData } from '../../../../../utilities/user'
import { getS3FileUrl } from '../../../../../utilities/others'
import { toast } from 'react-toastify'

import {
  listSchedules,
  listConfigurations,
} from '../../../../../src/graphql/queries'

const reducerFunc = (state, action) => {
  if (action.type == 'SET_TIMESLOT_ADJUSTED') {
    debugger
    const keys = Object.keys(action.payload)
    const result = {}
    keys.forEach((key) => {
      // debugger
      const prevKeys = Object.keys(state)
      if (prevKeys.includes(key)) {
        const values = state[key]
        action.payload[key].forEach((time) => {
          if (!values.includes(time)) values.push(time)
        })
        result[key] = values
      } else {
        result[key] = action.payload[key]
      }
    })
    const keysNotfound = []
    Object.keys(state).forEach((item) => {
      if (!Object.keys(result).includes(item)) keysNotfound.push(item)
    })
    // if (state) ({ ...state, ...action.payload })
    const newPrevNotFound = {}
    keysNotfound.forEach((item) => {
      newPrevNotFound[item] = state[item]
    })
    debugger
    return { ...newPrevNotFound, ...result }
  } else if (action.type == 'RESET_TIMESLOT_ADJUSTED') {
    debugger
    return {}
  }
  return state
}
const Step2 = ({
  oneOnOneService,
  bookingdate: bd,
  timeZone: tz,
  timeSlot,
  closeBookSession1,
  handleBookSession3,
  backtoBookSession1,
}) => {
  const [state, dispatch] = useReducer(reducerFunc, {})
  const [timeZone, setTimeZone] = useState({})
  const [timeZoneMentor, setTimeZoneMentor] = useState({})
  const [timeSlots, setTimeSlots] = useState([])
  // const [timeSlotsAdjusted, setTimeSlotsAdjusted] = useState({})
  const [bookingdate, setBookingdate] = useState()
  const [scheduleDetails, setScheduleDetails] = useState([])
  const [everyday, setEveryday] = useState([])
  const [monday, setMonday] = useState([])
  const [tuesday, setTuesday] = useState([])
  const [availableDays, setAvailableDays] = useState([])
  const [wednesday, setWednesday] = useState([])
  const [thursday, setThursday] = useState([])
  const [friday, setFriday] = useState([])
  const [saturday, setSaturday] = useState([])
  const [sunday, setSunday] = useState([])
  const [image, setImage] = useState('')
  const [weekDay, setWeekDay] = useState('')
  const [mentor, setMentor] = useState()
  const [duration, setDuration] = useState()
  const [errorValidation, setErrorValidation] = useState()
  const [bookingDay, setBookingDay] = useState()
  const [addTime, setAddTime] = useState(0)
  const [unavailableDates, setUnavailableDates] = useState([])
  const [selectedTimeInterval, setSelectedTimeInterval] = useState('')
  useEffect(() => {
    debugger
    debugger
    if (bd) setBookingdate(bd)
    if (tz) setTimeZone(tz)
  }, [bd, tz])

  useEffect(() => {
    if(timeSlot)
    setSelectedTimeInterval(timeSlot)
  }, [timeSlot])
  const weekdays = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'everyday',
  ]
  const getNextDay = (day) => {
    const newWeekdays = weekdays.slice(0, weekdays.length - 1)
    const findIndex = newWeekdays.findIndex((a) => a === day.toLowerCase())
    if (findIndex > -1) {
      const nextIndex = (findIndex + 1) % newWeekdays.length
      const nextItem = newWeekdays[nextIndex]
      return nextItem.substr(0, 1).toUpperCase() + nextItem.substr(1)
    }
  }
  const getPrevDay = (day) => {
    const newWeekdays = weekdays.slice(0, weekdays.length - 1)
    const findIndex = newWeekdays.findIndex((a) => a === day.toLowerCase())
    if (findIndex > -1) {
      const nextIndex =
        findIndex - 1 === -1 ? newWeekdays.length - 1 : findIndex - 1
      const nextItem = newWeekdays[nextIndex]
      return nextItem.substr(0, 1).toUpperCase() + nextItem.substr(1)
    }
  }
  useEffect(() => {
    setAddTime(timeZoneMentor.offset - timeZone.offset)
  }, [timeZoneMentor, timeZone])
  // debugger
  useEffect(() => {
    // debugger
    getAvailability(
      oneOnOneService?.username,
      oneOnOneService?.sessionDuration,
      oneOnOneService?.sessionDurationIn,
    )
    const men = getMentorData(oneOnOneService.username)
    const usrName = oneOnOneService?.username

    showPreview(men)
    setMentor(men)
    const getConfiguration = async () => {
      debugger
      try {
        const results = await API.graphql(
          graphqlOperation(listConfigurations, {
            filter: { username: { contains: usrName } },
          }),
        )
        if (results.data.listConfigurations.items.length > 0) {
          // setIsNew(false)
          const data = { ...results.data.listConfigurations.items[0] }
          const { timezone: tz } = data
          setTimeZoneMentor(tz)
          setTimeZone(tz)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getConfiguration()
  }, [oneOnOneService])
  const yesterday = moment().subtract(1, 'day')
  const disablePastDt = (current) => {
    return current.isAfter(yesterday)
  }
  const handleBookSession = () => {
    if (!bookingdate || !selectedTimeInterval) {
      let errorVal = { ...errorValidation }
      if (!bookingdate) {
        errorVal = { ...errorVal, bookingDate: true }
        // setErrorValidation({ ...errorValidation, bookingDate: true })
      }
      if (!selectedTimeInterval) {
        errorVal = { ...errorVal, timeSlot: true }
        // setErrorValidation({ ...errorValidation, timeSlot: true })
      }
      setErrorValidation({ ...errorVal })
      setTimeout(() => {
        setErrorValidation(null)
      }, 3000)
      debugger
      return
    }
    setErrorValidation(null)
    handleBookSession3({
      bookingDate: bookingdate,
      timeZone,
      slot: selectedTimeInterval,
    })
  }

  const handleBookingDate = (dt) => {
    // debugger
    setBookingdate(dt._d)
    // setBookingdate(dt.format('DD-MM-YYYY'))
    // console.log(dt._d)
  }
  const showPreview = async (mentorPassed) => {
    // e.stopPropagation()

    if (mentorPassed) {
      if (mentorPassed.profile_image) {
        // const img = await Storage.get(mentorPassed.profile_image)
        const img = await getS3FileUrl(mentorPassed.profile_image)
        console.log('image - ', img)
        setImage(img)
      }

      // setMentor(mentorPassed)
      // setShowServiceDetail(false)
      // setShowMentor(true)
    }
    // debugger
    console.log('mentorPassed', mentorPassed)
  }
  // console.log('mentor', mentor)
  console.log('oneOnOneService', oneOnOneService)
  // console.log('timeslots', timeSlots)
  console.log('timeZone', timeZone)
  const getAvailability = async (
    username,
    sessionDuration,
    sessionDurationIn,
  ) => {
    sessionDuration !== 'undefined' ? setDuration(sessionDuration) : ''
    // debugger
    if (username) {
      // setMentorName(username)
      // debugger
      try {
        const results = await API.graphql(
          graphqlOperation(listSchedules, {
            filter: { username: { contains: username } },
          }),
        )
        // debugger
        if (results.data.listSchedules.items.length > 0) {
          setScheduleDetails(results.data.listSchedules.items)
          setUnavailableDates(
            results.data.listSchedules.items[0]?.unavailableDates,
          )
          // results.data.listSchedules.items[0]?.unavailableDates.length > 0 ? (
          //   results.data.listSchedules.items[0]?.unavailableDates.map((ud, index) =>{
          //     debugger
          //    // disablePastDt.includes(ud)
          //   })
          // ) : null

          console.log(results.data.listSchedules.items)

          // debugger

          if (
            results.data.listSchedules.items[0]?.daySchedules.everyday
              .everyday &&
            results.data.listSchedules.items[0]?.availableSameTime
          ) {
            setAvailableDays([])
            setEveryday(
              results.data.listSchedules.items[0]?.daySchedules.everyday.time,
            )
            if (
              results.data.listSchedules.items[0]?.daySchedules.everyday.time
                ?.length > 0
            ) {
              // debugger
              const t =
                results.data.listSchedules.items[0]?.daySchedules.everyday.time
              // timeIntervals(t, sessionDuration, sessionDurationIn)
              addAvailabelDays(
                'Everyday',
                results.data.listSchedules.items[0]?.daySchedules?.everyday
                  ?.time,
              )
            }
          } else {
            if (
              results.data.listSchedules.items[0]?.daySchedules.Sunday.Sunday
            ) {
              addAvailabelDays(
                'Sunday',
                results.data.listSchedules.items[0]?.daySchedules?.Sunday?.time,
              )

              setSunday(
                results.data.listSchedules.items[0]?.daySchedules?.Sunday?.time,
              )
              //timeIntervals(results.data.listSchedules.items[0]?.daySchedules?.sunday?.time?.startTime,results.data.listSchedules.items[0]?.daySchedules?.sunday?.time?.endTime ,sessionDuration)
            }
            if (
              results.data.listSchedules.items[0]?.daySchedules.Monday.Monday
            ) {
              addAvailabelDays(
                'Monday',
                results.data.listSchedules.items[0]?.daySchedules?.Monday?.time,
              )
              setMonday(
                results.data.listSchedules.items[0]?.daySchedules?.Monday?.time,
              )
              //timeIntervals(results.data.listSchedules.items[0]?.daySchedules?.monday?.time?.startTime,results.data.listSchedules.items[0]?.daySchedules?.monday?.time?.endTime ,sessionDuration)
            }
            if (
              results.data.listSchedules.items[0]?.daySchedules.Tuesday.Tuesday
            ) {
              addAvailabelDays(
                'Tuesday',
                results.data.listSchedules.items[0]?.daySchedules?.Tuesday
                  ?.time,
              )
              setTuesday(
                results.data.listSchedules.items[0]?.daySchedules?.Tuesday
                  ?.time,
              )
              //timeIntervals(results.data.listSchedules.items[0]?.daySchedules?.tuesday?.time?.startTime,results.data.listSchedules.items[0]?.daySchedules?.tuesday?.time?.endTime ,sessionDuration)
            }
            if (
              results.data.listSchedules.items[0]?.daySchedules.Wednesday
                .Wednesday
            ) {
              addAvailabelDays(
                'Wednesday',
                results.data.listSchedules.items[0]?.daySchedules?.wednesday
                  ?.time,
              )

              setWednesday(
                results.data.listSchedules.items[0]?.daySchedules?.wednesday
                  ?.time,
              )
              //timeIntervals(results.data.listSchedules.items[0]?.daySchedules?.wednesday?.time?.startTime,results.data.listSchedules.items[0]?.daySchedules?.wednesday?.time?.endTime ,sessionDuration)
            }
            if (
              results.data.listSchedules.items[0]?.daySchedules.Thursday
                .Thursday
            ) {
              addAvailabelDays(
                'Thursday',
                results.data.listSchedules.items[0]?.daySchedules?.Thursday
                  ?.time,
              )

              setThursday(
                results.data.listSchedules.items[0]?.daySchedules?.Thursday
                  ?.time,
              )
              //timeIntervals(results.data.listSchedules.items[0]?.daySchedules?.thursday?.time?.startTime,results.data.listSchedules.items[0]?.daySchedules?.thursday?.time?.endTime ,sessionDuration)
            }
            if (
              results.data.listSchedules.items[0]?.daySchedules.Friday.Friday
            ) {
              addAvailabelDays(
                'Friday',
                results.data.listSchedules.items[0]?.daySchedules?.Friday?.time,
              )
              setFriday(
                results.data.listSchedules.items[0]?.daySchedules?.Friday?.time,
              )
              //timeIntervals(results.data.listSchedules.items[0]?.daySchedules?.friday?.time?.startTime,results.data.listSchedules.items[0]?.daySchedules?.friday?.time?.endTime ,sessionDuration)
            }
            if (
              results.data.listSchedules.items[0]?.daySchedules.Saturday
                .Saturday
            ) {
              addAvailabelDays(
                'Saturday',
                results.data.listSchedules.items[0]?.daySchedules?.Saturday
                  ?.time,
              )
              setSaturday(
                results.data.listSchedules.items[0]?.daySchedules?.Saturday
                  ?.time,
              )
              //timeIntervals(results.data.listSchedules.items[0]?.daySchedules?.saturday?.time?.startTime,results.data.listSchedules.items[0]?.daySchedules?.saturday?.time?.endTime ,sessionDuration)
            }
          }
          // debugger
        }
      } catch (error) {
        console.log(`Load Error:${error}`)
      }
    }
  }
  // add minutes
  function addMinutes(time, minutes) {
    var date = new Date(
      new Date('01/01/2023 ' + time).getTime() + minutes * 60000,
    )
    var tempTime =
      (date.getHours().toString().length == 1
        ? '0' + date.getHours()
        : date.getHours()) +
      ':' +
      (date.getMinutes().toString().length == 1
        ? '0' + date.getMinutes()
        : date.getMinutes()) +
      ':' +
      (date.getSeconds().toString().length == 1
        ? '0' + date.getSeconds()
        : date.getSeconds())
    return tempTime
  }
  const setTimeInterval = (slot) => {
    // debugger
    // setIsSelected(true)
    setSelectedTimeInterval(slot)
  }
  useEffect(() => {
    const dt = new Date(bookingdate)
    const day = weekdays[dt.getDay()]?.toLowerCase().toString()
    setWeekDay(day)
    setTimeSlots([])
    dispatch({ type: 'RESET_TIMESLOT_ADJUSTED' })
    // setTimeSlotsAdjusted({})
    setAvailableDays([])
    const newWeekdays = weekdays.slice(0, weekdays.length - 1)
    setBookingDay(newWeekdays[new Date(bookingdate).getDay()])
    // debugger
    // setTimeout(() => {
    if (everyday.length) {
      addAvailabelDays('Everyday', everyday)
    } else {
      if (sunday.length) addAvailabelDays('Sunday', sunday)
      if (monday.length) addAvailabelDays('Monday', monday)
      if (tuesday.length) addAvailabelDays('Tuesday', tuesday)
      if (wednesday.length) addAvailabelDays('Wednesday', wednesday)
      if (thursday.length) addAvailabelDays('Thursday', thursday)
      if (friday.length) addAvailabelDays('Friday', friday)
      // debugger
      if (saturday.length) addAvailabelDays('Saturday', saturday)
    }
    // }, 500)

    // var d = new Date("2023-02-02T02:59:26.186Z");
    // d.setTime(d.getTime() + (-8) * 60000*60);

    // console.log('bookingdate', newWeekdays[new Date(bookingdate).getDay()])
    if (day !== 'undefined' && day === 'sunday') {
      // timeIntervals(sunday, duration, oneOnOneService.sessionDurationIn)
      // if( sunday?.time?.length > 0){
      //   sunday.map((s, index) =>{
      //     timeIntervals(s.startTime, s.endTime, duration)
      //   })
      // }
    }

    if (day !== 'undefined' && day === 'monday') {
      // timeIntervals(monday, duration, oneOnOneService.sessionDurationIn)
      // if( monday?.time?.length > 0){
      //   monday.map((s, index) =>{
      //     timeIntervals(s.startTime, s.endTime, duration)
      //   })
      // }
    }

    if (day !== 'undefined' && day === 'tuesday') {
      // timeIntervals(tuesday, duration, oneOnOneService.sessionDurationIn)
      // if( tuesday?.time?.length > 0){
      //   tuesday.map((s, index) =>{
      //     timeIntervals(s.startTime, s.endTime, duration)
      //   })
      // }
    }

    if (day !== 'undefined' && day === 'wednesday') {
      // timeIntervals(wednesday, duration, oneOnOneService.sessionDurationIn)
      // if( wednesday?.time?.length > 0){
      //   wednesday.map((s, index) =>{
      //     timeIntervals(s.startTime, s.endTime, duration)
      //   })
      // }
    }

    if (day !== 'undefined' && day === 'thursday') {
      // timeIntervals(thursday, duration, oneOnOneService.sessionDurationIn)
      // if( thursday?.time?.length > 0){
      //   thursday.map((s, index) =>{
      //     timeIntervals(s.startTime, s.endTime, duration)
      //   })
      // }
    }

    if (day !== 'undefined' && day === 'friday') {
      // timeIntervals(friday, duration, oneOnOneService.sessionDurationIn)
      // if( friday?.time?.length > 0){
      //   friday.map((s, index) =>{
      //     timeIntervals(s.startTime, s.endTime, duration)
      //   })
      // }
    }

    if (day !== 'undefined' && day === 'saturday') {
      // timeIntervals(saturday, duration, oneOnOneService.sessionDurationIn)
      // if( saturday?.time?.length > 0){
      //   saturday.map((s, index) =>{
      //     timeIntervals(s.startTime, s.endTime, duration)
      //   })
      // }
    }

    // if (day !== 'undefined' && day === 'sunday') {
    //   timeIntervals(sunday.startTime, sunday.endTime, duration)
    //   // if( sunday?.time?.length > 0){
    //   //   sunday.map((s, index) =>{
    //   //     timeIntervals(s.startTime, s.endTime, duration)
    //   //   })
    //   // }
    // }

    // day && day === 'monday'
    //   ? timeIntervals(startTime, endTime, interval)
    //   : null

    // day && day === 'tuesday'
    //   ? timeIntervals(startTime, endTime, interval)
    //   : null

    // day && day === 'wednesday'
    //   ? timeIntervals(startTime, endTime, interval)
    //   : null

    // day && day === 'thursday'
    //   ? timeIntervals(startTime, endTime, interval)
    //   : null

    // day && day === 'friday'
    //   ? timeIntervals(startTime, endTime, interval)
    //   : null

    // day && day === 'saturday'
    //   ? timeIntervals(startTime, endTime, interval)
    //   : null
  }, [bookingdate, timeZone])
  useEffect(() => {
    // setTimeout(() => {
    setAvailableDays([...Object.keys(state)])
    // }, 1000)
  }, [state])
  // useEffect(() => {
  //   setTimeout(() => {
  //     debugger
  //     setAvailableDays((prev) => [...Object.keys(timeSlotsAdjusted)])
  //   }, 500)
  // }, [bookingdate, timeZone])
  const addSlot = (times, day, slot) => {
    if (times[day]) {
      if (!times[day].includes(slot)) times[day].push(slot)
    } else {
      times[day] = []
    }
  }
  const addAvailabelDays = (day, time) => {
    const interval = oneOnOneService?.sessionDuration
    const sessionDurationIn = oneOnOneService?.sessionDurationIn
    const addTimeTemp = timeZoneMentor.offset - timeZone.offset
    // debugger
    // const daysToAdd = [day]
    // const prevAvailableDates = [...availableDays]
    // time.forEach((t) => {
    //   const mentorDay = moment('01/01/2023').day()
    //   const startTimeDate = moment('01/01/2023 ' + t.startTime).add(
    //     addTime,
    //     'hours',
    //   )
    //   if (startTimeDate.day() !== mentorDay) {
    //     debugger
    //     if (addTime > 0) {
    //       daysToAdd.push(getPrevDay(day))
    //     } else {
    //       daysToAdd.push(getNextDay(day))
    //     }
    //   }

    //   const endTimeDate = moment('01/01/2023 ' + t.endTime).add(
    //     addTime,
    //     'hours',
    //   )
    //   if (endTimeDate.day() !== mentorDay) {
    //     debugger
    //     if (addTime > 0) {
    //       daysToAdd.push(getPrevDay(day))
    //     } else {
    //       daysToAdd.push(getNextDay(day))
    //     }
    //   }
    // })
    const times = {}
    const mentorDay = moment('01/01/2023').day()
    // debugger
    if (day === 'Everyday') {
      
      const newWeekdays = weekdays.slice(0, weekdays.length - 1)
      newWeekdays.forEach((weekday) => {
        time.forEach((t) => {
          if (t.startTime !== undefined && t.endTime !== undefined) {
            const startTimeDate = moment('01/01/2023 ' + t.startTime).add(
              addTimeTemp,
              'hours',
            )
            const endTimeDate = moment('01/01/2023 ' + t.endTime).add(
              addTimeTemp,
              'hours',
            )

            let stime = startTimeDate.format('HH:mm') + ':00'
            let etime = endTimeDate.format('HH:mm') + ':00'
            let nextTimeDate = startTimeDate

            while (
              moment('01/01/2023 ' + endTimeDate.format('HH:mm')).isAfter(
                moment('01/01/2023 ' + nextTimeDate.format('HH:mm')),
              )
            ) {
              // debugger
              if (sessionDurationIn == 'hours') {
                stime = addMinutes(stime, interval * 60)
              } else {
                stime = addMinutes(stime, interval)
              }
              nextTimeDate = moment('01/01/2023 ' + stime)
              if (startTimeDate.day() !== mentorDay) {
                // debugger
                if (addTimeTemp > 0) {
                  addSlot(
                    times,
                    getPrevDay(weekday).toLowerCase(),
                    stime.slice(0, -3),
                  )
                } else {
                  addSlot(
                    times,
                    getNextDay(weekday).toLowerCase(),
                    stime.slice(0, -3),
                  )
                }
              } else {
                addSlot(times, weekday.toLowerCase(), stime.slice(0, -3))
              }
            }
          }
        })
      })
    } else {
      time.forEach((t) => {
        if (t.startTime !== undefined && t.endTime !== undefined) {
          const startTimeDate = moment('01/01/2023 ' + t.startTime).add(
            addTimeTemp,
            'hours',
          )
          const endTimeDate = moment('01/01/2023 ' + t.endTime).add(
            addTimeTemp,
            'hours',
          )

          let stime = startTimeDate.format('HH:mm') + ':00'
          let etime = endTimeDate.format('HH:mm') + ':00'
          let nextTimeDate = startTimeDate

          while (
            moment('01/01/2023 ' + endTimeDate.format('HH:mm')).isAfter(
              moment('01/01/2023 ' + nextTimeDate.format('HH:mm')),
            )
          ) {
            // debugger
            if (sessionDurationIn == 'hours') {
              stime = addMinutes(stime, interval * 60)
            } else {
              stime = addMinutes(stime, interval)
            }
            nextTimeDate = moment('01/01/2023 ' + stime)
            if (startTimeDate.day() !== mentorDay) {
              // debugger
              if (addTimeTemp > 0) {
                addSlot(
                  times,
                  getPrevDay(day).toLowerCase(),
                  stime.slice(0, -3),
                )
              } else {
                addSlot(
                  times,
                  getNextDay(day).toLowerCase(),
                  stime.slice(0, -3),
                )
              }
            } else {
              addSlot(times, day.toLowerCase(), stime.slice(0, -3))
            }
          }
        }
      })
    }

    console.log('times', times)
    debugger
    dispatch({ type: 'SET_TIMESLOT_ADJUSTED', payload: times })
    // const prev={...timeSlotsAdjusted}
    // setTimeSlotsAdjusted((prev) => {
    //   const keys = Object.keys(times)
    //   const result = {}
    //   keys.forEach((key) => {
    //     // debugger
    //     const prevKeys = Object.keys(prev)
    //     if (prevKeys.includes(key)) {
    //       const values = prev[key]
    //       times[key].forEach((time) => {
    //         if (!values.includes(time)) values.push(time)
    //       })
    //       result[key] = values
    //     } else {
    //       result[key] = times[key]
    //     }
    //   })
    //   const keysNotfound = []
    //   Object.keys(prev).forEach((item) => {
    //     if (!Object.keys(result).includes(item)) keysNotfound.push(item)
    //   })
    //   // if (prev) ({ ...prev, ...times })
    //   const newPrevNotFound = {}
    //   keysNotfound.forEach((item) => {
    //     newPrevNotFound[item] = prev[item]
    //   })
    //   debugger
    //   return { ...newPrevNotFound, ...result }
    // })
  }
  const timeIntervals = (time, interval, sessionDurationIn) => {
    // setTimeSlots([])
    debugger
    const times = []
    time.forEach((t) => {
      if (t.startTime !== undefined && t.endTime !== undefined) {
        const startTimeDate = moment('01/01/2023 ' + t.startTime).add(
          addTime,
          'hours',
        )
        const endTimeDate = moment('01/01/2023 ' + t.endTime).add(
          addTime,
          'hours',
        )

        let stime = startTimeDate.format('HH:mm') + ':00'
        let etime = endTimeDate.format('HH:mm') + ':00'

        times.push(stime.slice(0, -3))
        while (stime != etime) {
          if (sessionDurationIn == 'hours') {
            stime = addMinutes(stime, interval * 60)
          } else {
            stime = addMinutes(stime, interval)
          }
          times.push(stime.slice(0, -3))
        }
        if (times.length > 0) {
          times.pop()
        }
      }
    })
    setTimeSlots(times.sort())
  }
  console.log('timeSlotsAdjusted', state)
  return (
    <div className="flex justify-center items-center bg-gray-600 bg-opacity-50 overflow-x-hidden overflow-y-auto fixed inset-0 z-100 outline-none focus:outline-none ">
      <div className="flex flex-col justify-between bg-white text-center mt-9 rounded-2xl shadow-lg w-full md:w-2/5 lg:w-2/5 min-h-[50vh]">
        <div className="flex justify-between px-8 pb-4 border-b border-gray-300 bg-slate-100 ">
          <div className="flex flex-col justify-start items-start border=b-2">
            <span className="text-2xl font-semibold mt-3">
              Select the date you want to schedule a meet
            </span>
          </div>
          <div>
            <button
              className=""
              type="button"
              onClick={() => closeBookSession1()}
            >
              <img
                src="../../../assets/icon/cross.png"
                alt=""
                className="w-4 h-4 mr-2 mt-5"
              ></img>
            </button>
          </div>
        </div>
        {availableDays.length > 0 && availableDays.length < 7 && (
          <>
            <div className="text-lg px-3 font-semibold text-left">
              Days when Mentor is available
            </div>
            <div className="flex px-3 justify-start items-start border=b-2">
              {availableDays.map((item) => (
                <span className="text-base border border-orange-600 text-gray-600 mr-2 p-2 rounded-full font-semibold mt-3">
                  {item}
                </span>
              ))}
            </div>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-0">
          <div className="border-r-2">
            <div className="bg-gray-100 m-2 mr-3 w-auto rounded-lg ">
              <div className="flex flex-row justify-start items-start px-4 py-2">
                <div
                  className={`${classes['persona']} bg-gray-300 rounded-full flex justify-center`}
                >
                  {image ? (
                    <img
                      src={image}
                      alt=""
                      className={`${classes['persona']} rounded-full`}
                    />
                  ) : null}
                </div>
                <div>
                  <p className=" flex justify-start items-start text-lg font-semibold mt-5 px-6">
                    Call with{' '}
                    {(mentor?.about_yourself?.first_name &&
                      mentor?.about_yourself?.first_name) +
                      ' ' +
                      (mentor?.about_yourself?.last_name &&
                        mentor?.about_yourself?.last_name)}
                  </p>
                  <p className="text-base font-semibold text-black  text-left">
                    For 1 on 1 mock interview
                  </p>
                  <p className="text-sm text-left">
                    {oneOnOneService.description}
                  </p>
                </div>
              </div>
              <div className="flex justify-around w-full p-2">
                <div className="flex justify-center items-center border-2 border-gray-900 hover:border-none hover:bg-blue-700 hover:text-white text-white font-bold p-1 rounded-full">
                  <img
                    src="../../../assets/icon/clock.png"
                    alt=""
                    className="w-4 h-3"
                  ></img>
                  <p className="text-sm text-black ml-1 hover:border-none hover:bg-blue-700 hover:text-white font-bold">
                    {oneOnOneService.sessionDuration}
                    {oneOnOneService.sessionDurationIn}
                  </p>
                </div>
                {/* <div className="flex justify-center items-center border-2 border-gray-900 hover:border-none hover:bg-blue-700 hover:text-white text-white font-bold p-1 rounded-full">
                        <img
                          src="../../../images/camera.png"
                          alt=""
                          className="w-4 h-3"
                        ></img>
                        <p className="text-sm text-black ml-1 hover:border-none hover:bg-blue-700 hover:text-white font-bold">
                          Video session
                        </p>
                      </div> */}
                <div className="flex justify-center items-center border-2 border-gray-900 hover:border-none hover:bg-blue-700 hover:text-white text-white font-bold p-1 rounded-full">
                  <img
                    src="../../../assets/icon/mentor-dashboard/price.svg"
                    alt=""
                    className="w-4 h-3"
                  ></img>
                  <p className="text-sm text-black ml-1 hover:border-none hover:bg-blue-700 hover:text-white font-bold">
                    ₹ {oneOnOneService.finalPrice}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap">
                <>
                  {bookingDay && state[bookingDay]?.length > 0 ? (
                    <>
                      {state[bookingDay]?.sort()?.map((slot, index) => {
                        return (
                          <div key={index}>
                            <span
                              className={`flex px-8 py-2 border-2 rounded-full m-2 text-sm font-normal ${
                                slot === selectedTimeInterval
                                  ? ' border border-orange-400'
                                  : ''
                              }`}
                              onClick={() => setTimeInterval(slot)}
                            >
                              {slot}
                            </span>
                          </div>
                        )
                      })}
                      {errorValidation?.timeSlot && (
                        <div className="text-base text-center w-full text-red-600">
                          Please select a time slot
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-base text-center w-full">
                      {' '}
                      No available slots
                    </div>
                  )}
                </>
              </div>

              <span>
                {scheduleDetails?.daySchedules?.everyday?.time?.startTime}
              </span>
              <span>
                {scheduleDetails?.daySchedules?.everyday?.time?.startTime}
              </span>
            </div>
          </div>
          <div>
            <div className=" text-base font-normal p-8 w-full">
              {/* <DatePicker onChange={onChange} value={value} /> */}
              <label className="text-left">
                Booking Date
                <div className="flex justify-center">
                  <BookingDatePicker
                    inputProps={{
                      style: {
                        minWidth: 200,
                        borderRadius: 5,
                        textAlign: 'center',
                        border: '1px solid black',
                      },
                      placeholder: 'Select Date',
                    }}
                    timeFormat={false}
                    value={bookingdate}
                    minDate={new Date()}
                    dateFormat="DD-MM-YYYY"
                    isValidDate={disablePastDt}
                    //isValidDate={disableCustomDt}
                    // onChange={(val) => setDt(val)}
                    onChange={handleBookingDate}
                  />
                </div>
                {errorValidation?.bookingDate && (
                  <div className="text-base text-center w-full text-red-600">
                    Please select a Booking date
                  </div>
                )}
              </label>
            </div>
            <div className="select-wrapper  text-base font-normal w-full p-6">
              <TimezoneSelect
                value={timeZone}
                onChange={setTimeZone}
                timezones={{
                  ...allTimezones,
                  'America/Lima': 'Pittsburgh',
                  'Europe/Berlin': 'Frankfurt',
                }}
              />
            </div>
          </div>
          {/* gird */}
        </div>
        <div className="flex justify-evenly w-full">
          <div className="py-4 px-6 border-t border-gray-300 w-full">
            <div className="flex justify-center items-center w-full">
              <button
                className="flex justify-center items-center text-base bg-white hover:bg-gray-900 text-black hover:text-white font-bold py-2 border border-black w-full rounded-md"
                onClick={() => backtoBookSession1()}
              >
                <span className="text-base font-semibold py-1">Back</span>
              </button>
            </div>
          </div>

          <div className="py-4 px-6 border-t border-gray-300 w-full">
            <div className="flex justify-center items-center w-full">
              <button
                className="flex justify-center items-center text-base bg-white hover:bg-gray-900 text-black hover:text-white font-bold py-2 border border-black w-full rounded-md"
                onClick={() => handleBookSession()}
              >
                <span className="text-base font-semibold py-1">Continue</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step2
