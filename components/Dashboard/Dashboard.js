import React from 'react'
import RightSideImages from './RightSideImages'
import classes from './Dashboard.module.css'
import { useRouter } from 'next/router'

import { Auth, Hub } from 'aws-amplify'
import { RegisterTypeRequest } from '../../redux/actions/AuthAction'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { ClearUser, StoreUserAuth } from '../../redux/actions/AuthAction'
import { checkUserKyc } from '../../utilities/others'
const Dashboard = ({ isLoggedin }) => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0()
  const router = useRouter()
  const registerType = useSelector((state) => state.AuthReducer)
  return (
    <section className={classes.main}>
      <header className={`flex-col md:flex-row ${classes.header}`}>
        <div className={classes.logo}></div>
        <div
          className={`flex gap-y-5 flex-col md:flex-row cursor-pointer ${classes['right-side']}`}
        >
          {isLoggedin ? (
            <div className="mb-5">
              <a
                className={classes.link}
                onClick={() => {
                  checkUserKyc()
                }}
              >
                Go to Dashboard
              </a>
            </div>
          ) : (
            <div className="md:flex-row mb-5 flex flex-col cursor-pointer ">
              <a
                className={classes.link}
                onClick={() => {
                  RegisterTypeRequest(dispatch, 'MENTOR')

                  router.push('/auth/Register')
                }}
              >
                Become a mentor
              </a>
              <a
                className={classes.link}
                onClick={() => {
                  RegisterTypeRequest(dispatch, 'STUDENT')
                  router.push('/auth/Register')
                }}
              >
                Become a student
              </a>
            </div>
          )}

          <a
            className={`${classes.button} cursor-pointer`}
            onClick={async () => {
              if (isLoggedin) {
                try {
                  await Auth.signOut()
                } catch (error) {}
                try {
                  if (registerType?.user?.email.includes('gmail.com'))
                    logout({
                      returnTo: window.location.origin,
                    })
                  else
                    logout({
                      federated: true,
                      returnTo: window.location.origin,
                    })
                } catch (error) {}
                ClearUser(dispatch)
                StoreUserAuth(dispatch, null)
              } else router.push('/auth/Login')
            }}
          >
            {isLoggedin ? 'Log out' : 'Log In'}
          </a>
        </div>
      </header>
      <section className={`p-16 flex-col md:flex-row md:p-32 ${classes.body}`}>
        <div className={classes.left}>
          <div className={`text-[24px] md:text-[48px] ${classes.heading}`}>
            If you are a <span className={classes.capital}>creator</span>
          </div>
          <div className={`text-[24px] md:text-[48px] ${classes.heading}`}>
            this is for you
          </div>
        </div>
        <div className={classes.right}>
          <RightSideImages />
        </div>
      </section>
    </section>
  )
}

export default Dashboard
