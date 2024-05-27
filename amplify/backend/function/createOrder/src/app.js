/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	xclientid
	xclientsecret
Amplify Params - DO NOT EDIT */
// import fetch from 'node-fetch'
// import { v4 as uuid } from 'uuid/v4'
// import * as express from 'express'
// import * as bodyParser from 'body-parser'
const fetch = require('node-fetch')

const express = require('express')
const { v4: uuid } = require('uuid')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const createOrder = ({
  order_note = 'Additional order info',
  order_amount = 100,
  customer_id = '12345',
  customer_name = 'name',
  customer_email = 'care@cashfree.com',
  customer_phone = '9816512345',
}) => {
  const prom = new Promise(async (resolve, reject) => {
    let payment_session_id = {}
    const orderId = `order-${uuid()}`
    const response = await fetch('https://sandbox.cashfree.com/pg/orders', {
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2022-09-01',
        'x-client-id': process.env.xclientid,
        'x-client-secret': process.env.xclientsecret,
      },
      body: `{
              "order_id": "${orderId}",
              "order_currency": "INR",
              "order_note": "${order_note}",
              "customer_details": {
                  "customer_id": "${customer_id}",
                  "customer_name": "${customer_name}",
                  "customer_email": "${customer_email}",
                  "customer_phone": "${customer_phone}"
              },              
             "order_amount": ${order_amount}
          }`,
      method: 'POST',
    })
    //     "order_splits": [
    //       {
    //            "vendor_id": "vendor1",
    //            "percentage": 40
    //       },
    //       {
    //            "vendor_id": "vendor2",
    //            "percentage": 60
    //       }
    //  ],
    const data = await response.json()
    console.log('data', data)
    //   console.log("payment_session_id", data.payment_session_id);
    if (data.code === 'order_already_exists') {
      const responseGet = await fetch(
        `https://sandbox.cashfree.com/pg/orders/${orderId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-version': '2022-09-01',
            'x-client-id': process.env.xclientid,
            'x-client-secret': process.env.xclientsecret,
          },
        },
      )
      const dataGet = await responseGet.json()
      console.log('dataGet', dataGet)
      payment_session_id = dataGet.payment_session_id
      debugger
    } else {
      payment_session_id = data.payment_session_id
    }
    console.log('payment_session_id', payment_session_id)
    resolve({
      payment_session_id: payment_session_id || {},
      data: data,
      order_id: orderId,
    })
  })

  return prom
}
// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

/**********************
 * Example get method *
 **********************/

// app.get('/createOrder', function (req, res) {
//   // Add your code here
//   res.json({ success: 'get call succeed!', url: req.url })
// })

// app.get('/createOrder/*', function (req, res) {
//   // Add your code here
//   res.json({ success: 'get call succeed!', url: req.url })
// })

/****************************
 * Example post method *
 ****************************/

app.post('/createOrder', function (req, res) {
  // Add your code here
  // res.json({ success: 'get call succeed!', xclientid: process.env.xclientid })
  const order = {
    order_note: 'Additional order info',
    order_amount: 100,
    customer_id: '12345',
    customer_name: 'name',
    customer_email: 'care@cashfree.com',
    customer_phone: '9816512345',
    ...req.body,
  }
  createOrder(order)
    .then((result) => {
      console.log('result', result)
      try {
        res.json({ success: 'post call succeed!', result: result })
      } catch {
        res.json({
          error: 'get call succeed!',
          xclientid: process.env.xclientid,
        })
      }
    })
    .catch((e) => {
      res.status(500).json({ error: e })
    })
})

app.listen(3000, function () {
  console.log('App started')
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
