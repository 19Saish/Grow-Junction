import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { color } from '../../public/theme/Color'
import Button from '../ui-kit/Button'
import { useDispatch } from 'react-redux'
import { RegisterTypeRequest } from '../../redux/actions/AuthAction'

const TypeOfRegister = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <div className="p-20 md:p-40 flex flex-col h-screen">
      <Image
        src={require('../../public/assets/icon/logo.svg')}
        alt=""
        style={{ height: 89, width: 224 }}
      />
      <div
        className="text-center"
        style={{ marginTop: 80, fontSize: 36, color: color.blackVariant }}
      >
        Choose to Register
      </div>
      <div
        className="flex flex-col md:flex-row items-center justify-center"
        style={{
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <Button
          label="Register as mentors"
          classOverride="mr-0 md:mr-10"
          styleOverride={{
            height: 62,
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: color.btnColor,
            color: color.blackVariant,
            marginTop: 40,
            borderRadius: 4,
            // marginRight: 24,
            fontSize: 16,
            fontWeight: 700,
          }}
          onClick={() => {
            RegisterTypeRequest(dispatch, 'MENTOR')

            router.push('/auth/Register')
          }}
        />
        <Button
          label="Register as student"
          styleOverride={{
            height: 62,
            // width: 360,
            backgroundColor: color.btnColor,
            color: color.blackVariant,
            marginTop: 40,
            borderRadius: 4,
            fontSize: 16,
            fontWeight: 700,
          }}
          onClick={() => {
            RegisterTypeRequest(dispatch, 'STUDENT')
            router.push('/auth/Register')
          }}
        />
      </div>
      <div className="flex justify-center w-full">
        <div
          className="hover:bg-white px-5 py-2 text-center border-2 border-r-2 border-gray-400 "
          style={{
            fontSize: 16,
            marginTop: 36,
            color: color.blackVariant,
            cursor: 'pointer',
            fontSize: 16,
            minWidth: 300,
            //   fontWeight: 600,
          }}
          onClick={() => {
            router.replace('/auth/Login')
          }}
        >
          Go back to Login
        </div>
      </div>
    </div>
  )
}

export default TypeOfRegister
