import React, { useState, useEffect } from 'react'
import { Formik, useFormikContext } from 'formik'
import TextField from '../../../pages/ui-kit/TextField'
import { createPayment, updatePayment } from '../../../src/graphql/mutations'
import { listPayments } from '../../../src/graphql/queries'
import { API, Auth, input, Storage, graphqlOperation } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import { toast } from 'react-toastify'
import { getLoggedinUserEmail } from '../../../utilities/user'

const BankDetails = () => {
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
            <form>
              <div className="flex flex-col md:flex-row lg:flex-row w-full p-10">
                <div className="flex flex-col md:flex-row lg:flex-row w-full justify-between">
                  <div className="flex justify-center items-center text-2xl font-semibold text-gray-900 p-6">
                    Your Bank Details
                  </div>
                  <div className="flex flex-row px-4">
                    <div
                      className="flex justify-center items-center text-black text-base font-semibold cursor-pointer hover:bg-white px-5 py-1 hover:border-2 hover:border-black"
                      onClick={resetState}
                    >
                      Reset all
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="mt-2 text-base bg-white hover:bg-gray-900 hover:text-white text-black border-gray-900 font-bold py-4 px-6 ml-10 border rounded"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="m-5 md:m-20 lg:m-20 bg-white">
                <div className="flex flex-col md:flex-row lg:flex-row border-b-2 rounder-md w-auto">
                  <div className="basis-1/2">
                    <div className="flex flex-col justify-start items-start p-3">
                      <div className="flex flex-col text-gray-900 text-base font-bold">
                        <div>
                          <span className="px-5">Account type</span>
                        </div>
                        <div className="m-3">
                          <select
                            className="px-3 py-3 top-1  text-lg right-1 bg-gray-50 border text-gray-600"
                            value={values.accountType}
                            name="accountType"
                            onChange={handleChange}
                          >
                            <option value="savings">Savings</option>
                            <option value="current">Current</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row lg:flex-row border-b-2 rounder-md">
                  <div className="basis-1/2">
                    <div className="flex flex-col justify-start items-start p-3">
                      <div>
                        <span className="px-5 text-gray-900 text-base font-bold">
                          Account holder name
                        </span>
                      </div>

                      <div className="m-3 w-full">
                        <TextField
                          name="accountHolderName"
                          onChangeValue={handleChange}
                          value={values.accountHolderName}
                          type="text"
                          id="accountHolderName"
                          placeholder="Account holder name"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row lg:flex-row border-b-2 rounder-md">
                  <div className="basis-1/2">
                    <div className="flex flex-col justify-start items-start p-3">
                      <div>
                        <span className="px-5 text-gray-900 text-base font-bold">
                          IFSC code
                        </span>
                      </div>

                      <div className="m-3 w-full">
                        <TextField
                          name="ifscCode"
                          onChangeValue={handleChange}
                          value={values.ifscCode}
                          type="text"
                          id="ifscCode"
                          placeholder="IFSC code"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row lg:flex-row rounder-md">
                  <div className="basis-1/2">
                    <div className="flex flex-col justify-start items-start p-3">
                      <div>
                        <span className="px-5 text-gray-900 text-base font-bold">
                          Account number
                        </span>
                      </div>

                      <div className="m-3 w-full">
                        <TextField
                          name="accountNumber"
                          onChangeValue={handleChange}
                          value={values.accountNumber}
                          type="text"
                          id="accountNumber"
                          placeholder="Account number"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )
        }}
      </Formik>
    </>
  )
}

export default BankDetails
