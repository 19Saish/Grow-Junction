import React, { useEffect, useState } from 'react'
import classes from './Payment.module.css'
import {
  createPaymentSetting,
  updatePaymentSetting,
} from '../../../src/graphql/mutations'
import { API } from 'aws-amplify'
import SaveButton from '../../Utilities/SaveBtn/SaveButton'
import PaymentColumns from './PaymentColumns/PaymentColumns'
import PaymentRows from './PaymentRows/PaymentRows'
import { toast } from 'react-toastify'

function PaymentSetting() {
  const [paymentState, setPaymentState] = useState({
    country: '',
    currency: '',
    gateway: '',
    taxType: '',
    defaultTaxRate: '',
  })
  const [gatewayState, setGatewayState] = useState({
    keyId: '',
    keySecret: '',
    webhookSecret: '',
    webhookMode: '',
  })

  const [taxDetails1State, setTaxDetails1State] = useState({
    GSTInput: '',
    taxDetails: '',
    visibleOnInvoices: '',
    placeOfSupplyCGST: '',
  })

  const [taxDetails2State, setTaxDetails2State] = useState({
    createInvoices: '',
    invoiceNotes: '',
  })

  const [invoiceState, setInvoiceState] = useState({
    prefix: '',
    nextNo: '',
  })

  const [checkoutState, setCheckoutState] = useState({
    CheckoutInvoiceNote: '',
  })

  const [firstSave, setFirstSave] = useState(true)
  const [paymentId, setPaymentId] = useState('');

  const handlePaymentChange = (e) => {
    setPaymentState({ ...paymentState, [e.target.name]: e.target.value })
  }
  const handleGatewayChange = (e) => {
    setGatewayState({ ...gatewayState, [e.target.name]: e.target.value })
  }
  const handleTax1Change = (e) => {
    setTaxDetails1State({
      ...taxDetails1State,
      [e.target.name]: e.target.value,
    })
  }
  const handleTax2Change = (e) => {
    setTaxDetails2State({
      ...taxDetails2State,
      [e.target.name]: e.target.value,
    })
  }
  const handleInvoiceChange = (e) => {
    setInvoiceState({ ...invoiceState, [e.target.name]: e.target.value })
  }
  const handleCheckoutChange = (e) => {
    setCheckoutState({ ...checkoutState, [e.target.name]: e.target.value })
  }

  const createPayment = async () => {
    if (
      paymentState ||
      gatewayState ||
      taxDetails1State ||
      taxDetails2State ||
      invoiceState ||
      checkoutState
    ) {
      try {
        const result = await API.graphql({
          query: createPaymentSetting,
          variables: {
            input: {
              ...paymentState,
              ...gatewayState,
              ...taxDetails1State,
              ...taxDetails2State,
              ...invoiceState,
              ...checkoutState,
            },
          },
        })
        setPaymentId(result.data.createPaymentSetting.id);
        toast.success('Saved Successfully!!')
      } catch (error) {
        console.log(error)
        toast.error('Save Error!!!')
      }
    }
  }



  const updatePayment = async () => {
    if (
      paymentState ||
      gatewayState ||
      taxDetails1State ||
      taxDetails2State ||
      invoiceState ||
      checkoutState
    ) {
      const { createdAt, updatedAt, ...rest } = {
        ...paymentState,
        ...gatewayState,
        ...taxDetails1State,
        ...taxDetails2State,
        ...invoiceState,
        ...checkoutState,
      }
      
      rest.id = paymentId

      try {
        await API.graphql({
          query: updatePaymentSetting,
          variables: {
            input: {
              ...rest
            },
          },
        })

        toast.success('Saved Successfully!!')
      } catch (error) {
        console.log(error)
        toast.error('Save Error!!!')
      }
    }
  }

  const handleSave = () => {
    if (firstSave) {
      createPayment()
      console.log('submitted')
      setFirstSave(false)
    } else {
      updatePayment()
    }
  }

  return (
    <div className="overflow-auto">
      <h1 className="text-3xl font-medium mb-8">Payment</h1>
      <hr />
      <div className="border border-gray-200 m-10 px-14 py-6 relative">
        <PaymentColumns />
        <PaymentRows
          handleChange={handlePaymentChange}
          rowState={paymentState}
        />
        <p className="text-sm text-gray-400 text-center mt-4">
          To enable country specific pricing, please purchase an add-on from
          Subscription settings.
        </p>
        <SaveButton handleSave={handleSave} />
      </div>
      {/* second block */}
      <div className="grid sm:grid-cols-2">
        <div className="m-10 col-span-1">
          <h3>Payment Gateway Details</h3>
          <p className="text-lg mt-6">
            <span className="font-bold">Razorpay:</span> <br />
            After successful registration, use this link to generate your KeyId
            and Secret -{' '}
            <a
              className={`${classes['anchor']}`}
              href="https://dashboard.razorpay.com/#/app/keys"
            >
              https://dashboard.razorpay.com/#/app/keys
            </a>
            . You also need to set-up a webhook for handling bank delays during
            payments. Go to page{' '}
            <a
              className={`${classes['anchor']}`}
              href="https://dashboard.razorpay.com/#/app/webhooks"
            >
              https://dashboard.razorpay.com/#/app/webhooks
            </a>
            and create a new webhook with the following details :
          </p>
          <p className="text-lg mt-4">
            <span className="font-bold">Webhook URL:</span> <br />
            <a
              className={`${classes['anchor']}`}
              href="https://www.growjunction.com/readerapi/rzp/checkout/webhook/success"
            >
              https://www.growjunction.com/readerapi/rzp/checkout/webhook/success
            </a>
            <br /> Active : <span className="font-bold">Checked</span> <br />{' '}
            Secret : From Razorpay Webhook Secret Text Field active events{' '}
            <br /> Active event :{' '}
            <span className="font-bold">
              payment.authorized subscription.charged subscription.completed
            </span>
          </p>
        </div>
        <div className="col-span-1 mt-10">
          <div className="border border-gray-300 w-full">
            <p className="text-2xl bg-gray-300 px-4 py-2 mx-4 my-2">
              Everywhere - Indian Rupee (₹) - Razorpay
            </p>
            <div className="mx-4 my-2">
              <label className="text-lg mt-4" htmlFor="keyid">
                Razorpay Key Id:
              </label>
              <input
                type="password"
                id="keyid"
                name="keyId"
                className="w-full text-lg border border-gray-300"
                value={gatewayState.keyId}
                onChange={handleGatewayChange}
                required
              />
              <label className="text-lg mt-4" htmlFor="keysecret">
                Razorpay Key Secret:
              </label>
              <input
                type="password"
                id="keysecret"
                name="keySecret"
                className="w-full text-lg border border-gray-300"
                value={gatewayState.keySecret}
                onChange={handleGatewayChange}
                required
              />
              <label className="text-lg mt-4" htmlFor="websecret">
                Razorpay Webhook Secret:
              </label>
              <input
                type="password"
                id="websecret"
                name="webhookSecret"
                className="w-full text-lg border border-gray-300"
                value={gatewayState.webhookSecret}
                onChange={handleGatewayChange}
                required
              />
              <label className="text-lg mt-4">
                Razorpay Webhook Integration Mode:
              </label>
              <div className="flex items-center mt-4">
                <input
                  type="radio"
                  id="flash"
                  name="webhookMode"
                  value="flash"
                  onChange={handleGatewayChange}
                />
                <label className="text-lg ml-2" htmlFor="flash">
                  Flash
                </label>
                <input
                  className="ml-44"
                  type="radio"
                  id="embedded"
                  name="webhookMode"
                  value="embedded"
                  onChange={handleGatewayChange}
                />
                <label className="text-lg ml-2" htmlFor="embedded">
                  Embedded
                </label>
              </div>
            </div>
          </div>
          <SaveButton handleSave={handleSave} />
        </div>
        {/* third block */}
        <div className="sm:m-10">
          <p className="text-2xl">Tax Details</p>
        </div>
        <div className="mt-10 ml-4">
          <label className="mt-0 mb-4 text-xl">
            Allow learners to claim GST Input Credit (in case of INR){' '}
          </label>
          <div className="mt-4 mr-4 flex items-center text-xl">
            <input
              className="mr-2"
              type="radio"
              id="No"
              name="GSTInput"
              value="No"
              onChange={handleTax1Change}
            />
            <label htmlFor="No">No</label>
            <input
              className="ml-44 mr-2"
              type="radio"
              id="Yes"
              name="GSTInput"
              value="Yes"
              onChange={handleTax1Change}
            />
            <label htmlFor="Yes">Yes</label>
          </div>
          <label htmlFor="taxdetails" className="mt-10 mb-10 text-xl">
            Your Tax Details
          </label>
          <textarea
            name="taxDetails"
            id="taxdetails"
            cols="30"
            rows="10"
            className="w-full text-lg border border-gray-300"
            onChange={handleTax1Change}
          ></textarea>
          <label className="mt-10 mb-4 text-xl" htmlFor="invoices">
            Will be visible on your invoices. eg
          </label>
          <input
            type="text"
            id="invoices"
            name="visibleOnInvoices"
            onChange={handleTax1Change}
            className="text-xl w-full bg-gray-300"
          />
          <label className="mt-10 mb-4 text-xl" htmlFor="cgst">
            Place of Supply for CGST,SGST or IGST (in case of INR)
          </label>
          <input
            type="text"
            id="cgst"
            name="placeOfSupplyCGST"
            className="text-xl w-full border border-gray-300"
            onChange={handleTax1Change}
          />
          <SaveButton handleSave={handleSave} />
        </div>
        {/* fourth-block */}
        <div className="sm:m-10">
          <p className="text-2xl">Tax Details</p>
        </div>
        <div className="mt-10 text-xl ml-4">
          <label htmlFor="createinvoices">Create Invoices</label>
          <div className="mt-4 mr-4 flex items-center text-xl">
            <input
              className="mr-2"
              type="radio"
              id="InvoiceNo"
              name="createInvoices"
              value="No"
              onChange={handleTax2Change}
            />
            <label htmlFor="InvoiceNo">No</label>
            <input
              className="ml-44 mr-2"
              type="radio"
              id="InvoiceYes"
              name="createInvoices"
              value="Yes"
              onChange={handleTax2Change}
            />
            <label htmlFor="InvoiceYes">Yes</label>
          </div>
          <label className="mt-10 text-xl mb-4" htmlFor="notes">
            Invoice Notes
          </label>
          <textarea
            name="invoiceNotes"
            id="in"
            cols="30"
            rows="10"
            className={`w-full text-lg mt-4 border border-gray-300`}
            onChange={handleTax2Change}
          ></textarea>
          <div className="flex justify-end mt-8 mb-10">
            <SaveButton handleSave={handleSave} />
          </div>
        </div>
        {/* fifith block */}
        <div className="sm:m-10">
          <p className="text-2xl">Invoice Number</p>
        </div>
        <div className="mt-10 ml-4">
          <label className="text-xl mt-4" htmlFor="prefix">
            Prefix
          </label>
          <input
            type="text"
            id="prefix"
            name="prefix"
            className="w-full text-xl border border-gray-300"
            onChange={handleInvoiceChange}
          />
          <label className="text-xl mt-4" htmlFor="nextno">
            Next Number
          </label>
          <input
            type="text"
            id="nextno"
            name="nextNo"
            className="w-full text-xl border border-gray-300"
            onChange={handleInvoiceChange}
          />
          <p className="text-xl bg-gray-300 w-full mt-4">
            Next Invoice Number will be Grow-11266
          </p>
          <SaveButton handleSave={handleSave} />
        </div>
        {/* sixth block */}
        <div className="sm:m-10">
          <p className="text-2xl">Checkout Message</p>
          <p className="text-xl text-gray-400">In case of no payment gateway</p>
        </div>
        <div className="mt-10 text-xl ml-4">
          <label htmlFor="invoicenotes" className="text-xl mt-10 mb-4">
            Invoice Notes
          </label>
          <textarea
            name="CheckoutInvoiceNote"
            id="invoicenotes"
            cols="30"
            rows="10"
            className="w-full text-xl border border-gray-300"
            onChange={handleCheckoutChange}
          ></textarea>
          <SaveButton handleSave={handleSave} />
        </div>
      </div>
    </div>
  )
}

export default PaymentSetting
