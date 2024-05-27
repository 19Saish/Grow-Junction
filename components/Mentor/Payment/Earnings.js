import React, { useState, useEffect } from 'react'
import { Formik, useFormikContext } from 'formik'
import TextField from '../../../pages/ui-kit/TextField'
import { createPayment, updatePayment } from '../../../src/graphql/mutations'
import { listPayments } from '../../../src/graphql/queries'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import { toast } from 'react-toastify'
import { getLoggedinUserEmail } from '../../../utilities/user'

const Earnings = () => {
  const initialState = {
    accountType: '',
    accountHolderName: '',
    ifscCode: '',
    accountNumber: '',
  }

  const [state, setState] = useState(initialState)
  const [user, setUser] = useState()
  const [isNew, setIsNew] = useState(true)

  useEffect(() => {
    getUser()
  }, [])
  const resetState = () => {
    setState({ ...initialState })
  }

  const getUser = async () => {
    debugger
    try {
      try {
        const usr = await Auth.currentAuthenticatedUser()
        console.log('usr', usr)
      } catch (error) {}
      const usrName = getLoggedinUserEmail()
      const results = await API.graphql(
        graphqlOperation(listPayments, {
          filter: { username: { contains: usrName } },
        }),
      )
      if (results.data.listPayments.items.length > 0) {
        setIsNew(false)
        const data = { ...results.data.listPayments.items[0] }
        const { createdAt, updatedAt, owner, ...rest } = data
        console.log('data - ', data)
        setState({ ...rest })
      }
    } catch (error) {
      console.log(`Load Error:${error}`)
    }
  }

  return (
    <>
      <Formik
        initialValues={{ ...state }}
        enableReinitialize={true}
        onSubmit={async (values, e) => {
          debugger
          try {
            if (!values?.id) {
              try {
                debugger
                // values.id = uuid()
                await API.graphql({
                  query: createPayment,
                  variables: { input: { ...values } },
                })
                toast.success('Payment added successfully')
                // window.location.href = window.location.href
              } catch (error) {
                toast.error(`Save Error:${error.errors[0].message}`)
              }
            } else {
              const { createdAt, updatedAt, owner, ...rest } = {
                ...values,
              }
              rest.username = getLoggedinUserEmail()
              try {
                await API.graphql({
                  query: updatePayment,
                  variables: {
                    input: { ...rest },
                  },
                })
                toast.success('Payment updated successfully')
              } catch (error) {
                debugger
                toast.error(`Save Error:${error.errors[0].message}`)
                console.log(error)
              }
            }
          } catch (e) {
            console.log('error-', e)
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <>
              <div className="flex flex-col md:flex-row lg:flex-row w-full p-10">
                <div className="flex flex-col md:flex-row lg:flex-row w-full justify-between">
                  <div className="flex justify-center items-center text-2xl font-semibold text-gray-900 p-6">
                    Your Earnings
                  </div>
                </div>
              </div>

              <div className="m-5 bg-white">
                <div className="flex flex-col md:flex-row lg:flex-row bg-white w-full">
                  <div className="flex flex-col p-10 w-auto md:w-1/4 lg:w-1/4 bg-green-100 rounded-md m-3">
                    <div className="text-base font-semibold">Balance</div>
                    <div className="text-lg font-semibold">₹ 0</div>
                  </div>

                  <div className="flex flex-col w-auto md:w-1/4 lg:w-1/4 p-10 bg-blue-100 rounded-md m-3">
                    <span className="text-base font-semibold">
                      Pending Completion
                    </span>
                    <p className="text-xl font-semibold">₹ 0</p>
                  </div>

                  <div className="flex flex-col w-auto md:w-1/4 lg:w-1/4 p-10 bg-pink-100 rounded-md m-3">
                    <span className="text-base font-semibold">
                      Total Earnings
                    </span>
                    <p className="text-xl font-semibold">₹ 0</p>
                  </div>
                </div>

                <div className="m-3 bg-white">
                  <div className="flex flex-col md:flex-row lg:flex-row w-full">
                    <div className="w-auto md:w-1/4 lg:w-1/4 text-sm font-semibold border-2 p-4">
                      Item
                    </div>
                    <div className="w-auto md:w-1/4 lg:w-1/4 text-sm font-semibold border-2 p-4">
                      Total Count
                    </div>
                    <div className="w-auto md:w-1/4 lg:w-1/4 text-sm font-semibold border-2 p-4">
                      Completed
                    </div>
                    <div className="w-auto md:w-1/4 lg:w-1/4 text-sm font-semibold border-2 p-4">
                      Total Earnings
                    </div>
                  </div>

                  {/* repeat */}
                  <div className="flex flex-col md:flex-row lg:flex-row w-full">
                    <div className="w-auto md:w-1/4 lg:w-1/4 text-sm font-semibold border-2 p-4"></div>
                    <div className="w-auto md:w-1/4 lg:w-1/4 text-sm font-semibold border-2 p-4"></div>
                    <div className="w-auto md:w-1/4 lg:w-1/4 text-sm font-semibold border-2 p-4"></div>
                    <div className="w-auto md:w-1/4 lg:w-1/4 text-sm font-semibold border-2 p-4"></div>
                  </div>
                  <div className="flex flex-col md:flex-row lg:flex-row w-full ">
                    <div className="w-auto md:w-1/4 lg:w-1/4 text-sm font-semibold border-2 p-4"></div>
                    <div className="w-auto md:w-1/4 lg:w-1/4 text-sm font-semibold border-2 p-4"></div>
                    <div className="w-auto md:w-1/4 lg:w-1/4 text-sm font-semibold border-2 p-4"></div>
                    <div className="w-auto md:w-1/4 lg:w-1/4 text-sm font-semibold border-2 p-4"></div>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </Formik>
    </>
  )
}

export default Earnings
