import React, { useState } from 'react'
import Amplify, { Auth } from 'aws-amplify'
import Image from 'next/image'
import { color } from '../../public/theme/Color'
import BoxBodyContainer from '../components/common/BoxBodyContainer'
import Button from '../ui-kit/Button'
// import { useSelector } from "react-redux";
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const VerifyEmail = () => {
  const registerType = useSelector((state) => state.AuthReducer)
  const router = useRouter()
  const [verifyMail, setVerifyMail] = useState(false)

  console.log(registerType.userAuth?.username)

  //   useEffect(() => {
  //     const getInfo = async () => {
  //       await Auth.currentUserInfo()
  //         .then((res) => {
  //           console.log('res', res);
  //         })
  //         .catch((err) => {
  //           console.log('err', err);
  //         });
  //     };
  //     getInfo();
  //   }, []);
  const handleVerifyEmail = async () => {
    // const res = await Auth.currentUserInfo()
    // if (res) {
    //   Object.entries(res?.attributes).forEach((item, index) => {
    //     if (item[0] === 'email_verified' && item[1]) {
    //router.push('/auth/Login')
    //     } else if (item[0] === 'email_verified' && !item[1]) {
    //       toast.error(`Email not verified yet`)
    //     }
    //   })
    // }
    // await Auth.userAttributes('er.riyaz2507@gmail.com')
    //   .then((res) => {
    //     console.log('res', res)
    //     router.push('/register/KYC_step1')
    //   })
    //   .catch((err) => {
    //     console.log('err', err)
    //   })
    if (registerType) {
      if (registerType === 'STUDENT') {
        router.push('/student')
      } else {
        {
          router.push('/mentor')
        }
      }
    }
  }
  return (
    
      <div className="flex h-screen bg-white">
        <div className='m-auto px-4'>
        <div className="flex flex-col justify-center items-center mt-10 bg-gray-50 ">
          <Image
            src={require('../../public/assets/icon/logo.svg')}
            alt=""
            //style={{ height: 89, width: 224 }}
          />
          <div
            style={{
              backgroundColor: color.blackVariant,
              //height: 66,
              //width: 66,
              borderRadius: 66,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src={require('../../public/assets/icon/mailBox.png')}
              alt=""
              style={{ height: 42, width: 42 }}
            />
          </div>
          <div className='mt-20 text-gray-900 text-4xl font-bold'
            // style={{
            //   marginTop: 40,
            //   fontSize: 36,
            //   color: color.blackVariant,
            //   //   lineHeight: 49.03,
            // }}
          >
            <span>Verify your email</span>
          </div>
          <div className='mt-5 text-gray-900 text-xl p-5'
            // style={{
            //   display: 'flex',
            //   flex: 1,
            //   justifyContent: 'center',
            //   padding: 10,
            // }}
          >
             <span className='text-gray-900 text-xl font-normal'>To keep a trusted and safe community, we’ve sent an email to{' '}</span> 
              <span className='text-gray-900 text-2xl font-bold' >  
                {registerType.userAuth?.username}
              </span>{' '}
              <span className='text-gray-900 text-xl font-normal'>for verification, and you’ll only do this once.</span>
            
          </div>
          <div className='flex flex-row text-gray-900 text-base mt-10'>
            <span>Not the correct email?{' '}</span>
            <div
              className='text-blue-900 font-bold text-base'
              // style={{ fontSize: 16, color: color.blue }}
              onClick={() => {
                router.back()
              }}
            >
              {'  '}
              Change email address
            </div>
          </div>
          <Button
            label={!verifyMail ? 'Open my email' : 'Continue'}
            className='flex justify-center item-center bg-gray-900 text-white text-base font-bold  px-24 py-4 mt-5 rounded-md'
            // styleOverride={{
            //   height: 62,
            //   backgroundColor: color.blackVariant,
            //   color: color.white,
            //   //   alignSelf: 'center',
            //   //   marginTop: 40,
            //   //  width: 494,
            //   fontSize: 16,
            //   fontWeight: 700,
            // }}
            link={!verifyMail}
            href={`https://${registerType.userAuth?.username.split('@')[1]}`}
            //   onClick={handleSubmit}
            onClick={() => {
              // router.push('/auth/VerifyEmail');
              // Auth.currentAuthenticatedUser(registerType.userAuth?.userDataKey);
              //   alertService.success('Success!!', 'asdsadsa');
              //   let data = Auth.currentUserInfo();
              //   console.log("data", data);
              //   router.push("/register/KYC_step1");
              //   console.log("entry");
              //   router.asPath('www.google.com')
              //   return (
              //     <Link
              //       target="_blank"
              //       rel="noopener noreferrer"
              //       href={'https://gmail.com/'}
              //     />
              //   );
              if (!verifyMail) {
                setVerifyMail(true)
              } else {
                handleVerifyEmail()
              }
            }}
          />
          <div
            onClick={async () => {
              let username = '"er.riyaz2507@gmail.com"'
              try {
                await Auth.resendSignUp(username)
                console.log('code resent successfully')
              } catch (err) {
                console.log('error resending code: ', err)
              }
            }}
          >
            <div className='flex flex-row text-gray-900 text-base mt-5 mb-10'
              // style={{
              //   marginTop: 48,
              //   display: 'flex',
              //   flexDirection: 'row',
              //   flex: 1,
              //   color: color.blackVariant,
              //   fontSize: 16,
              // }}
              onClick={async () => {
                try {
                  await Auth.resendSignUp('er.riyaz2507@gmail.com')
                    .then((res) => {
                      console.log('res', res)
                    })
                    .catch((err) => {
                      console.log('err', err)
                    })
                } catch (e) {
                  console.log('e', e)
                }
              }}
            >
              Did not receive any mail?{' '}
              <div className='text-blue-900 font-bold text-base'>
                {' '}
                Resend email
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    
  )
}

export default VerifyEmail
