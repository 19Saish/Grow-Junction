import Image from 'next/image'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { color } from '../../public/theme/Color'
import BoxBodyContainer from '../components/common/BoxBodyContainer'
import KYC_header from '../components/registration/KYC_header'
import Button from '../ui-kit/Button'
import CheckBox from '../ui-kit/CheckBox'
import DropDown from '../ui-kit/DropDown'
import TextField from '../ui-kit/TextField'
import * as mutations from '../../src/graphql/mutations'
import { API } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import Schedule from '../../components/Mentor/Availability/Schedule'
import Availability from '../../components/Mentor/Availability/index'
import { createSchedule, updateSchedule } from '../../src/graphql/mutations'
import { getLoggedinUserEmail } from '../../utilities/user'
import WithAuthenticatedKYCDone from '../../hoc/withAuthenticatedKYCDone'
const timeAvailability = [
  {
    day: 'Sunday',
    checked: false,
    sortId: 1,
    time_schedule: [
      {
        startTime: '00',
        leftMeridianDropDown: false,
        startTimeMeridian: 'AM',
        endTime: '00',
        rightMeridianDropDown: false,
        endTimeMeridian: 'AM',
      },
    ],
  },
  {
    day: 'Monday',
    checked: false,
    sortId: 2,
    time_schedule: [
      {
        startTime: '00',
        leftMeridianDropDown: false,
        startTimeMeridian: 'AM',
        endTime: '00',
        rightMeridianDropDown: false,
        endTimeMeridian: 'AM',
      },
    ],
  },
  {
    day: 'Tuesday',
    checked: false,
    sortId: 3,
    time_schedule: [
      {
        startTime: '00',
        leftMeridianDropDown: false,
        startTimeMeridian: 'AM',
        endTime: '00',
        rightMeridianDropDown: false,
        endTimeMeridian: 'AM',
      },
    ],
  },
  {
    day: 'Wednesday',
    checked: false,
    sortId: 4,
    time_schedule: [
      {
        startTime: '00',
        leftMeridianDropDown: false,
        startTimeMeridian: 'AM',
        endTime: '00',
        rightMeridianDropDown: false,
        endTimeMeridian: 'AM',
      },
    ],
  },
  {
    day: 'Thrusday',
    checked: false,
    sortId: 5,
    time_schedule: [
      {
        startTime: '00',
        leftMeridianDropDown: false,
        startTimeMeridian: 'AM',
        endTime: '00',
        rightMeridianDropDown: false,
        endTimeMeridian: 'AM',
      },
    ],
  },
  {
    day: 'Friday',
    checked: false,
    sortId: 6,
    time_schedule: [
      {
        startTime: '00',
        leftMeridianDropDown: false,
        startTimeMeridian: 'AM',
        endTime: '00',
        rightMeridianDropDown: false,
        endTimeMeridian: 'AM',
      },
    ],
  },
  {
    day: 'Saurday',
    checked: false,
    sortId: 7,
    time_schedule: [
      {
        startTime: '00',
        leftMeridianDropDown: false,
        startTimeMeridian: 'AM',
        endTime: '00',
        rightMeridianDropDown: false,
        endTimeMeridian: 'AM',
      },
    ],
  },
]

const sameAvailability = [
  {
    day: 'Everyday',
    checked: true,
    time_schedule: [
      {
        startTime: '00',
        leftMeridianDropDown: false,
        startTimeMeridian: 'AM',
        endTime: '00',
        rightMeridianDropDown: false,
        endTimeMeridian: 'AM',
      },
    ],
  },
]

const meridian = ['AM', 'PM']

const MentorAvailability = () => {
  const router = useRouter()
  const [sameTimeAvailabel, setSameTimeAvailabel] = useState(false)
  const [mentorAvailability, setMentorAvailability] = useState(timeAvailability)
  const [sameTimeAvailability, setSameTimeAvailability] =
    useState(sameAvailability)
  const [loading, setLoading] = useState(false)
  const [availabilityValues, setAvailabilityvalues] = useState()
  const [reload, setReload] = useState(false)

  const availability = sameTimeAvailabel ? sameAvailability : mentorAvailability

  const handleSubmit = async () => {
    debugger
    setLoading(true)
    try {
      if (!availabilityValues.id) {
        try {
          // values.id = uuid()
          await API.graphql({
            query: createSchedule,
            variables: { input: { ...availabilityValues } },
          })
          // toast.success('Schedule added successfully')

          setLoading(false)
          setReload(true)
          setTimeout(() => {
            setReload(false)
          }, 100)
          router.push('/register/KYC_step4')
          // window.location.href = window.location.href
        } catch (error) {
          toast.error(`Save Error:${error.errors[0].message}`)
          setLoading(false)
        }
      } else {
        // const { createdAt, updatedAt, domain_id, owner, ...rest } = {
        //   ...values,
        // }
        try {
          await API.graphql({
            query: updateSchedule,
            variables: {
              input: { ...availabilityValues },
              // condition: { username: { contains: state.username } },
            },
            // authMode: 'AMAZON_COGNITO_USER_POOLS',
          })
          // toast.success('Schedule updated successfully')

          // setDaySchedules([])
          setLoading(false)

          setReload(true)
          setTimeout(() => {
            setReload(false)
          }, 100)
          router.push('/register/KYC_step4')
        } catch (error) {
          debugger
          toast.error(`Save Error:${error.errors[0].message}`)
          setLoading(false)
          console.log(error)
        }
      }
    } catch (e) {
      console.log('error-', e)
    }
  }
  const setValues = (values) => {
    console.log('values-updated', values)
    values.username = getLoggedinUserEmail()
    setAvailabilityvalues(values)
  }
  return (
    <div className="md:p-40 bg-white p-20">
      <div
        className="flex flex-col justify-start items-center"
        style={
          {
            // backgroundColor: color.headerColor,
          }
        }
      >
        <KYC_header stepImage={'/assets/icon/StepIndicator3.png'} />
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color.headerColor,
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'column',
              maxWidth: 750,
            }}
          >
            <div
              style={{
                color: color.blackVariant,
                fontWeight: 400,
                fontSize: 36,
                marginTop: 60,
                padding: 30,
              }}
            >
              Let your audience know your availability
            </div>
            <div
              style={{
                color: color.lightGrey,
                fontSize: 16,
                fontWeight: 400,
                marginTop: 16,
                padding: 30,
              }}
            >
              Leting your audience know your availability will help them connect
              or opt for your service at their convenience, you can edit it
              multiple time later
            </div>

            <Schedule
              reload={reload}
              setValuesParent={setValues}
              insideStep={true}
            />
            <div style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
              <Button
                label={'Previous'}
                styleOverride={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 6,
                  paddingBottom: 6,
                  color: color.white,
                  borderRadius: 22,
                  height: 43,
                  fontSize: 15,
                  backgroundColor: color.blackVariant,
                  // width: 186,
                  marginRight: 24,
                }}
                onClick={() => {
                  router.back()
                }}
              />
              <Button
                label={'Continue'}
                styleOverride={{
                  paddingTop: 6,
                  paddingBottom: 6,
                  color: color.white,
                  borderRadius: 22,
                  height: 43,
                  fontSize: 15,
                  backgroundColor: color.btnColor,
                  // width: 186,
                }}
                loader={loading}
                onClick={() => {
                  handleSubmit()
                  // router.push('/register/KYC_step4')
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WithAuthenticatedKYCDone(MentorAvailability)
