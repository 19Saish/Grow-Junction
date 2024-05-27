import React, { useState } from 'react'
import OneOnOneSessionData from './OneOnOneSessionData'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { v4 as uuid } from 'uuid'
import { setS3FileUrl } from '../../../../../utilities/others'
const OneOnOneBooking = ({ oneOnOneService, setShow, show = false }) => {
  const [showServiceDetail, setShowServiceDetail] = useState(show)
  const [bookSession1, setBookSession1] = useState(false)
  const [bookSession3, setBookSession3] = useState(false)
  const [bookSession4, setBookSession4] = useState(false)
  const [image, setImage] = useState('')
  const [step2, setStep2] = useState()
  const [step3, setStep3] = useState()
  const [step4, setStep4] = useState()
  const handleBookClick = () => {
    setShowServiceDetail(false)
    setBookSession1(true)
  }
  const handleBookSession3 = (obj) => {
    debugger
    setBookSession1(false)
    setBookSession3(true)
    setStep2(obj)
  }
  const handleBookSession4 = (obj) => {
    setStep3(obj)
    if (oneOnOneService?.questions?.length > 0) {
      setBookSession1(false)
      setBookSession3(false)
      setBookSession4(true)
    } else {
      handleBookSession5({}, obj, false)
    }
  }
  const handleBookSession5 = async (obj, step3Temp, bookSession4) => {
    debugger
    setShow(true)
    setBookSession1(false)
    setBookSession3(false)
    if (typeof bookSession4 != 'undefined') setBookSession4(true)
    else setBookSession(false)
    setStep4(obj)
    const finalObj = { step2, step3: step3 || step3Temp, step4: [] }
    const tempStep4 = []
    if (Object.keys(obj).length > 0) {
      await obj.forEach(async (item) => {
        const { file, ...rest } = item
        if (file) {
          const name = file.name.substr(0, file.name.lastIndexOf('.'))
          const ext = file.name.substr(file.name.lastIndexOf('.') + 1)
          const filename = `${name}_${uuid()}.${ext}`
          rest.filename = filename
          try {
            // await setS3FileUrl(filename, file)
            debugger
          } catch (error) {}
          tempStep4.push({ ...rest })
        } else {
          tempStep4.push({ ...rest })
        }
      })
      finalObj.step4 = tempStep4
    }
    console.log(finalObj)
    // if (!values?.id) {
    //         try {
    //           debugger

    //           values.username = finalObj.step3.emailId
    //           values.serviceType = '1 on 1 Session'
    //           // values.bookingDate = moment(bookingdate).format('L')
    //           // values.timeSlot = timeSlot ? timeSlot : ''

    //           // await API.graphql({
    //           //   query: createStudentBooking,
    //           //   variables: { input: { ...values } },
    //           // })
    //           // toast.success('Student booking added successfully')
    //           // window.location.href = window.location.href
    //         } catch (error) {
    //           // toast.error(`Save Error:${error.errors[0].message}`)
    //         }
    //       } else {
    //         const { createdAt, updatedAt, owner, ...rest } = {
    //           ...values,
    //         }
    //         rest.username = getLoggedinUserEmail()
    //         try {
    //           // await API.graphql({
    //           //   query: updateStudentBooking,
    //           //   variables: {
    //           //     input: { ...rest },
    //           //   },
    //           // })
    //           // toast.success('Student booking updated successfully')
    //         } catch (error) {
    //           // debugger
    //           // toast.error(`Save Error:${error.errors[0].message}`)
    //           // console.log(error)
    //         }
    //       }
  }
  const backtoBookSession1 = () => {
    setShowServiceDetail(true)
    setBookSession1(false)
    setBookSession3(false)
    setShow(true)
  }
  const backtoBookSession2 = () => {
    setShowServiceDetail(false)
    setBookSession1(true)
    setBookSession3(false)
    setShow(true)
  }
  const backtoBookSession3 = () => {
    setShowServiceDetail(false)
    setBookSession1(false)
    setBookSession3(true)
    setShow(true)
  }
  console.log('step3-out', step3)
  const closeBookSession1 = () => {
    setImage('')
    setBookSession1(false)
    setBookSession3(false)
  }
  const closeBookSession3 = () => {
    setImage('')
    setBookSession1(false)
    setBookSession3(false)
    setBookSession4(true)
  }
  const closeBookSession4 = () => {
    setImage('')
    setBookSession1(false)
    setBookSession3(false)
    setBookSession4(false)
    setShow(false)
  }
  console.log('step4', step4)
  return (
    <>
      {showServiceDetail && (
        <Step1
          oneOnOneService={oneOnOneService}
          handleBookClick={handleBookClick}
          setShowServiceDetail={(val) => {
            setShow(val)
            setShowServiceDetail(val)
          }}
        />
      )}
      {bookSession1 && (
        <Step2
          oneOnOneService={oneOnOneService}
          backtoBookSession1={backtoBookSession1}
          bookingdate={step2?.bookingDate}
          timeZone={step2?.timeZone}
          timeSlot={step2?.slot}
          closeBookSession1={(val) => {
            closeBookSession1(val)
            setShow(val)
          }}
          handleBookSession3={handleBookSession3}
        />
      )}
      {bookSession3 && (
        <Step3
          oneOnOneService={oneOnOneService}
          bookingdate={step2?.bookingDate}
          backtoBookSession2={backtoBookSession2}
          handleBookSession4={handleBookSession4}
          timeZone={step2?.timeZone}
          timeSlot={step2?.slot}
          step3={step3}
          closeBookSession3={(val) => {
            closeBookSession3(val)

            setShow(true)
          }}
        />
      )}
      {/* {bookSession4 && (
        <OneOnOneSessionData
          backtoBookSession3={backtoBookSession3}
          oneOnOneService={oneOnOneService}
          closeBookSession4={closeBookSession4}
          handleBookSession5={handleBookSession5}
        />
      )} */}
    </>
  )
}

export default OneOnOneBooking
