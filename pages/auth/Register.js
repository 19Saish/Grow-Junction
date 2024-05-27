import { Auth } from 'aws-amplify'
import { Formik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API } from 'aws-amplify'
import { createUserInfo } from '../../src/graphql/mutations'
import { color } from '../../public/theme/Color'
import { RegistrationSchema } from '../../public/utils/schema'
import useWindowDimensions from '../../public/utils/useWindowDimensions'
import { StoreUserAuth, Signup } from '../../redux/actions/AuthAction'
import Header from '../components/common/Header'
import Button from '../ui-kit/Button'
import TextField from '../ui-kit/TextField'
import { useAuth0 } from '@auth0/auth0-react'

let productsp = [
  {
    id: 1,
    name: 'Product Number 1',
    brand: 'Brand Name',
    url: 'products-number-1',
    price: 100,
  },
  {
    id: 1,
    name: 'Product Number 1',
    brand: 'Brand Name',
    url: 'products-number-1',
    price: 100,
  },
  {
    id: 1,
    name: 'Product Number 1',
    brand: 'Brand Name',
    url: 'products-number-1',
    price: 100,
  },
]

const initialState = {
  //   first_name: 'riyaz',
  //   last_name: 'ahamed',
  //   email: 'er.riyaz2507@gmail.com',
  //   password: 'R!yaz2507',
  //   confirm_password: 'R!yaz2507',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
}

const options = {
  margin: 30,
  responsiveClass: true,
  nav: true,
  dots: true,
  autoplay: true,
  smartSpeed: 1000,
  //   dotsClass: {backgroundColor: 'red'},

  //   dotsContainer: {backgroundColor: 'red'},
  navClass: ['owl-prev', 'owl-next'],
  navText: ['', ''],
  responsive: {
    0: {
      items: 1,
    },
    // 400: {
    //   items: 1,
    // },
    // 600: {
    //   items: 2,
    // },
    // 700: {
    //   items: 3,
    // },
    // 1000: {
    //   items: 4,
    // },
  },
}

const spaceValidation = new RegExp(/^[^ ]*$/)
const Register = (props) => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0()
  const registerType = useSelector((state) => state.AuthReducer)
  const { width, height } = useWindowDimensions()
  const router = useRouter()
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)

  //   const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  //     ssr: false,
  //   });

  //   const [registration, setRegistration] = useState(initialState);

  console.log('assdasda', registerType?.registerType)

  return (
    
    <div className='flex flex-row bg-gray-50'>
    
    <div
      className="flex flex-row md:flex-row lg:flex-row  bg-gray-50"
      style={{
        backgroundColor: color.headerColor,
      }}
    >
      <div className='flex flex-col'>
        <Header
          btnName="Log In"
          onClickBtn={() => {
            router.push('/auth/Login')
          }}
          style={{
            backgroundColor: color.blackVariant,
            height: 42,
           width: 95,
            fontSize: 16,
          }}
        />
        <div style={{ borderWidth: 1, borderColor: color.divider }} />

        <div
          className="flex flex-col px-12 md:px-44"
          style={{
            backgroundColor: color.headerColor,
          }}
        >
          <div
            className="text-gray-900 font-semibold text-3xl mt-16"
            style={{
              // textAlign: 'center',
              // color: color.blackVariant,
              // fontSize: 28,
              // marginTop: 56,
            }}
          >
            Welcome to Grow Junction
          </div>
          <div
           className="text-gray-900 font-normal text-base mt-10 mb-10"
            // style={{
            //   fontSize: 16,
            //   color: color.blackVariant,
            //   marginBottom: 40,
            // }}
          >
            Fill in the details to create your account
          </div>
          <Formik
            enableReinitialize={true}
            initialValues={initialState}
            onSubmit={async (values, { setErrors }) => {
              setLoader(true)
              let username = values.email
              let first_name = values.first_name
              let last_name = values.last_name
              let email = values.email
              let password = values.password
              let register_type = registerType?.registerType
              let profile_registration = 'false'
              const userInfo = {
                kyc_done: false,
                register_type: registerType?.registerType,
                email,
                name: first_name + ' ' + last_name,
                profile_image: '',
                username: email,
              }
              try {
                const { user } = await Auth.signUp({
                  username,
                  password,
                  attributes: {
                    email: email,
                    'custom:first_name': first_name,
                    'custom:last_name': last_name,
                    'custom:register_type': register_type,
                    'custom:kyc_done': profile_registration,
                  },
                  autoSignIn: {
                    enabled: true,
                  },
                })
                Signup(dispatch)
                console.log('user', user)
                await API.graphql({
                  query: createUserInfo,
                  variables: { input: { ...userInfo } },
                })
                if (user) {
                  StoreUserAuth(dispatch, user)
                  setLoader(false)
                  router.push('/auth/VerifyEmail')
                }
              } catch (e) {
                console.log('err', e)

                if (e?.toString()?.includes('UsernameExistsException')) {
                  setErrors({ email: 'User email id is already registered' })
                }
                setLoader(false)
              }
            }}
            validationSchema={RegistrationSchema()}
            validateOnChange={true}
            validateOnBlur={true}
            validateOnMount={true}
          >
            {({
              handleChange,
              values,
              isSubmitting,
              errors,
              touched,
              handleBlur,
              setErrors,
              handleSubmit,
              setFieldValue,
              ...restProps
            }) => (
              <>
                <div
                  style={{
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ marginRight: 20, display: 'flex', flex: 1 }}>
                    <TextField
                      label="First Name"
                      id="first_name"
                      type="FirstName"
                      placeholder="Robert"
                      value={values.first_name}
                      onChangeValue={(text) => {
                        //   onChange(text);
                        if (spaceValidation.test(text.target.value)) {
                          console.log(text.target.id, text.target.value)

                          setFieldValue(text.target.id, text.target.value)
                        }
                      }}
                      errMsg={touched.first_name && errors.first_name}
                      styleOverride={{ marginRight: 5 }}
                    />
                  </div>
                  <TextField
                    label="Last Name"
                    id="last_name"
                    type="LastName"
                    placeholder="Miller"
                    value={values.last_name}
                    onChangeValue={(text) => {
                      if (spaceValidation.test(text.target.value)) {
                        setFieldValue(text.target.id, text.target.value)
                      }
                    }}
                    errMsg={touched.last_name && errors.last_name}
                  />
                </div>

                <TextField
                  label="Email"
                  id="email"
                  type="Email"
                  placeholder="examplemail@gmail.com"
                  value={values.email}
                  onChangeValue={(text) => {
                    if (spaceValidation.test(text.target.value)) {
                      setFieldValue(text.target.id, text.target.value)
                    }
                  }}
                  errMsg={touched.email && errors.email}
                />

                <TextField
                  label="Password"
                  id="password"
                  type="Password"
                  placeholder="Enter Password"
                  icon={require('../../public/assets/icon/eye.png')}
                  value={values.password}
                  onChangeValue={(text) => {
                    if (spaceValidation.test(text.target.value)) {
                      setFieldValue(text.target.id, text.target.value)
                    }
                  }}
                  errMsg={touched.password && errors.password}
                />
                <TextField
                  label="Confirm Password"
                  id="confirm_password"
                  type="password"
                  placeholder="Re-Enter Password"
                  value={values.confirm_password}
                  onChangeValue={(text) => {
                    if (spaceValidation.test(text.target.value)) {
                      setFieldValue(text.target.id, text.target.value)
                    }
                  }}
                  errMsg={touched.confirm_password && errors.confirm_password}
                />
                <Button
                  label={`Get Started ${
                    registerType?.registerType &&
                    `as a ${registerType?.registerType.toLowerCase()}`
                  }`}
                  styleOverride={{
                    height: 62,
                    backgroundColor: color.btnColor,
                    color: color.blackVariant,
                    marginTop: 35,
                    fontSize: 16,
                  }}
                  loader={loader}
                  onClick={handleSubmit}
                  //   onClick={() => {
                  //     router.push('/auth/VerifyEmail');
                  //   }}
                />
                <div className="flex ">
                  <Button
                    label="Google"
                    image="/assets/icon/google.svg"
                    styleOverride={{
                      height: 50,
                      backgroundColor: 'white',
                      color: color.blackVariant,
                      border: '1px solid black',
                      fontSize: 16,
                      marginTop: 40,
                      marginBottom:10,
                    }}
                    // containerOverride={{
                    //   marginLeft: 10,
                    // }}
                    loader={loader}
                    onClick={() =>
                      // Auth.federatedSignIn({
                      //   provider: CognitoHostedUIIdentityProvider.Google,
                      // })
                      {
                        // logout({ returnTo: window.location.origin })
                        // setTimeout(() => {
                        //   debugger
                        Signup(dispatch)
                        loginWithRedirect()
                        // }, 3000)
                      }
                    }
                    //   onClick={() => {
                    //     // router.prefetch('www.google.com')
                    //     window.open('https://www.codexworld.com/', '_self')
                    //   }}
                  />

                  <Button
                    label="LinkedIn"
                    image="/assets/icon/inkedin-circled.svg"
                    styleOverride={{
                      height: 50,
                      backgroundColor: 'white',
                      color: color.blackVariant,
                      border: '1px solid black',
                      fontSize: 16,
                      marginTop: 40,
                      marginBottom:10,
                    }}
                    containerOverride={{
                      marginLeft: 10,
                    }}
                    loader={loader}
                    onClick={() => {
                      // logout({ returnTo: window.location.origin })
                      // setTimeout(() => {
                      //   debugger
                      Signup(dispatch)
                      loginWithRedirect()
                      // }, 100)
                    }}
                    //   onClick={() => {
                    //     // router.prefetch('www.google.com')
                    //     window.open('https://www.codexworld.com/', '_self')
                    //   }}
                  />
                </div>
              </>
            )}
          </Formik>
        </div>
      </div>
    

      {/* <OwlCarousel
        className="owl-theme"
        loop
        // margin={4}
        // nav={true}
        // navText={[
        //   '<img src="/images/Arrow_left.png" />',
        //   '<img src="/images/Arrow_right.png" />',
        // ]}
        style={{
          width: width / 3,
          height: height / 2.5,
          top: height / 6,
          position: 'absolute',
          right: 0,
          //   right: width / 350,
        }}
        // dots={true}
        animateIn={true}
        {...options}>
        {productsp && productsp.length > 0
          ? productsp.map((product, index) => {
              return (
                <Image
                  key={index}
                  src={require('../../public/assets/icon/carousel.png')}
                  alt={product.name}
                  style={{height: height / 1.5, width: width / 5}}
                  title={product.name}
                />
              );
            })
          : ''}
      </OwlCarousel> */}
    </div>
    
  
    <div className=" order-1 md:order-2 lg:order-2 hidden md:block">
        <Image
          src={require('../../public/assets/icon/rectangle.png')}
          alt={''}
          style={{ width: width / 1.75, height: height }}
          // style={{width: 600, height: 400}}
        />
      </div>
    
    </div>
    
  )
}
export default Register
