import React, { useState } from 'react'
import { color } from '../../public/theme/Color'
import BoxBodyContainer from '../components/common/BoxBodyContainer'
import Button from '../ui-kit/Button'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Image from 'next/image'

const numberValidation = new RegExp(/^[0-9]{0,10}$/)
const KYC_step4 = () => {
  const registerType = useSelector((state) => state.AuthReducer)
  const router = useRouter()
  //   const [phoneNumber, setPhoneNumber] = useState()
  const [loading, setLoading] = useState()

  const initialState = {
    phoneNumber: '',
  }
  return (
    <BoxBodyContainer
      //   styleOverride={{ height: '100%' }}
      body={
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Image
                src={require('../../public/assets/icon/logo.svg')}
                alt=""
                style={{
                  height: 89,
                  width: 224,
                  alignSelf: 'center',
                  marginTop: 208,
                }}
              />
              <Image
                src={require('../../public/assets/icon/success.png')}
                alt=""
                style={{
                  height: 67,
                  width: 67,
                  alignSelf: 'center',
                  marginTop: 60,
                }}
              />
              <div
                style={{
                  color: color.blackVariant,
                  fontWeight: 700,
                  fontSize: 36,
                  marginTop: 52,
                  marginBottom: 52,
                }}
              >
                {`Successfully registered as ${
                  registerType?.registerType === 'STUDENT'
                    ? 'Student'
                    : 'Mentor'
                }`}
              </div>
              <Button
                label={'Continue to dashboard'}
                styleOverride={{
                  height: 62,
                  backgroundColor: color.blackVariant,
                  color: color.white,
                  width: 494,
                  fontSize: 16,
                  fontWeight: 700,
                  marginBottom: 208,
                }}
                // link={!verifyMail}
                onClick={() => {
                  if (registerType?.registerType === 'STUDENT') {
                    router.push('/student')
                  } else {
                    router.push('/mentor')
                  }
                }}
              />
            </div>
          </div>
        </div>
      }
    />
  )
}

export default KYC_step4
