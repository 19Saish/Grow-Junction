import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const PaymentRows = ({ handleChange, rowState }) => {
  const [country, setCountry] = useState([])
  const [countryNames, setCountryNames] = useState([])

  const router = useRouter()

  const { route } = router

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all ')
        const countries = await res.json()
        setCountry(countries)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCountries()
  }, [route])

  useEffect(() => {
    let coun = []
    country.map((item) => {
      let countryNames = item?.name?.common
      coun.push(countryNames)
    })
    setCountryNames(coun?.sort())
  }, [])

  return (
    <div className=" grid grid-cols-5 gap-2">
      <div>
        <select
          name="country"
          id="country"
          className="xl:text-lg text-base w-full mt-4 border border-gray-300 rounded-sm"
          value={rowState.country}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Country
          </option>
          <option value="Everywhere">Everywhere</option>
          {countryNames.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
      </div>
      <div>
        <select
          name="currency"
          id="currency"
          value={rowState.currency}
          className="xl:text-lg text-base w-full mt-4 border border-gray-300 rounded-sm"
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Currency
          </option>
          <option value="Indian Rupee">Indian Rupee</option>
          <option value="USD">USD</option>
        </select>
      </div>
      <div>
        <select
          name="gateway"
          id="payment"
          value={rowState.gateway}
          className="xl:text-lg text-base w-full mt-4 border border-gray-300 rounded-sm"
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Gateway
          </option>
          <option value="Razorpay">Razorpay</option>
        </select>
      </div>
      <div>
        <select
          name="taxType"
          id="tax"
          value={rowState.taxType}
          className="xl:text-lg text-base w-full mt-4 border border-gray-300 rounded-sm"
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Tax Type
          </option>
          <option value="GST">GST</option>
        </select>
      </div>
      <div>
        <input
          type="number"
          value={rowState.defaultTaxRate}
          name="defaultTaxRate"
          className="xl:text-lg text-base w-full border border-gray-300 mt-4 rounded-sm"
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default PaymentRows
