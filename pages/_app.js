import '../styles/globals.css'
// import '../amplify-configure'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../redux/store'
import { useRouter } from 'next/router'
import Student from './student'
import Admin from './admin'
// import Services from './mentor/services'
import Mentor from './mentor'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-tooltip/dist/react-tooltip.css'

import { Formik } from 'formik'
// debugger
// toast.configure()
// add to existing imports
import Amplify from 'aws-amplify'

import config from '../src/aws-exports'
import { Auth0Provider } from '@auth0/auth0-react'
// check if env is localhost or not
// if you're not developing on localhost, you will need to detect this is another way—the docs linked above give some examples.
function MyApp({ Component, pageProps }) {
  // debugger
  const [host, setHost] = useState()
  useEffect(() => {
    const isLocalhost = !!(window.location.hostname === 'localhost')

    // split redirect signin and signout strings into correct URIs
    const [productionRedirectSignIn, localRedirectSignIn] =
      config.oauth.redirectSignIn.split(',')
    const [productionRedirectSignOut, localRedirectSignOut] =
      config.oauth.redirectSignOut.split(',')

    // use correct URI in the right env
    const updatedAwsConfig = {
      ...config,
      oauth: {
        ...config.oauth,
        // redirectSignIn: isLocalhost
        //   ? localRedirectSignIn
        //   : productionRedirectSignIn,
        // redirectSignOut: isLocalhost
        //   ? localRedirectSignOut
        //   : productionRedirectSignOut,
        redirectSignIn: productionRedirectSignIn,
        redirectSignOut: productionRedirectSignOut,
      },
    }
    setHost(window.location.origin)
    Amplify.configure(updatedAwsConfig)
  }, [])
  // console.log('toast', toast)
  const router = useRouter()
  // debugger
  if (router.asPath.includes('/mentor/')) {
    return (
      host && (
        <Auth0Provider
          domain="dev-tra4scc70r3ty8yh.us.auth0.com"
          clientId="QQR0KU0g8usdgAxqAyFEpWrx5EKreM7P"
          redirectUri={host}
        >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Mentor>
                <Component {...pageProps} />
              </Mentor>
            </PersistGate>
            <ToastContainer />
          </Provider>
        </Auth0Provider>
      )
    )
  }
  if (router.asPath.includes('/student/')) {
    return (
      host && (
        <Auth0Provider
          domain="dev-2den6jd36jliqugc.us.auth0.com"
          clientId="aH23l8WVJ9YnfCQO7BUVZacqJPjpJ34j"
          redirectUri={window.location.origin}
        >
          <Auth0Provider
            domain="dev-tra4scc70r3ty8yh.us.auth0.com"
            clientId="QQR0KU0g8usdgAxqAyFEpWrx5EKreM7P"
            redirectUri={host}
          >
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <Student>
                  <Component {...pageProps} />
                </Student>
              </PersistGate>
              <ToastContainer />
            </Provider>
          </Auth0Provider>
        </Auth0Provider>
      )
    )
  }
  if (router.asPath.includes('/admin/')) {
    return (
      host && (
        <Auth0Provider
          domain="dev-2den6jd36jliqugc.us.auth0.com"
          clientId="aH23l8WVJ9YnfCQO7BUVZacqJPjpJ34j"
          redirectUri={window.location.origin}
        >
          <Auth0Provider
            domain="dev-tra4scc70r3ty8yh.us.auth0.com"
            clientId="QQR0KU0g8usdgAxqAyFEpWrx5EKreM7P"
            redirectUri={host}
          >
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <Admin>
                  <Component {...pageProps} />
                </Admin>
              </PersistGate>
              <ToastContainer />
            </Provider>
          </Auth0Provider>
        </Auth0Provider>
      )
    )
  }
  // if (router.asPath.includes('/services/')) {
  //   return (
  //     <Provider store={store}>
  //       <PersistGate loading={null} persistor={persistor}>
  //         <Services>
  //           <Component {...pageProps} />
  //         </Services>
  //       </PersistGate>
  //       <ToastContainer />
  //     </Provider>
  //   )
  // }
  return (
    host && (
      <Auth0Provider
        domain="dev-tra4scc70r3ty8yh.us.auth0.com"
        clientId="QQR0KU0g8usdgAxqAyFEpWrx5EKreM7P"
        redirectUri={host}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
          <ToastContainer />
        </Provider>
      </Auth0Provider>
    )
  )
}

export default MyApp
