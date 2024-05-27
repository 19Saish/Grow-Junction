import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import DataTable from 'react-data-table-component'
import DatePicker from 'react-multi-date-picker'
import moment from 'moment'
import classes from './RevenueHistor.module.css'
import Button from '../../../../pages/ui-kit/Button'
import TextField from '../../../../pages/ui-kit/TextField'
const columns = [
  {
    name: 'Booking Date',
    cell: (row) => (
      <span className="text-capital">
        {row.bookingDate ? moment(row.bookingDate).format('DD/MM/YYYY') : ''}
      </span>
    ),
    sortable: true,
    selector: (row) => row.bookingDate,
  },

  // {
  //   name: 'Order ID',
  //   width: '250px',
  //   sortable: true,
  //   selector: (row) => row.orderId,
  // },
  // {
  //   name: 'Transaction ID',
  //   width: '200px',
  //   sortable: true,
  //   selector: (row) => row.transactionId,
  // },

  {
    name: 'Name',
    cell: (row) => <span className="text-capital">{row.name}</span>,
    sortable: true,
    selector: (row) => row.name,
  },
  {
    name: 'Service Type',
    sortable: true,
    selector: (row) => row.serviceType,
    cell: (row) => <span className="text-capital">{row.serviceType}</span>,
  },
  {
    name: 'Your Income',
    sortable: true,
    selector: (row) => row.amountMentor,
  },
  {
    name: 'Grow Junction Fees',
    sortable: true,
    selector: (row) => row.amountGrow,
  },
  {
    name: 'User Email',
    sortable: true,
    selector: (row) => row.emailId,
  },

  {
    name: 'Status',
    sortable: true,
    selector: (row) => row?.status,
  },
]
function convertArrayOfObjectsToCSV(array) {
  // debugger
  let result
  const columnDelimiter = ','
  const lineDelimiter = '\n'
  const keys = Object.keys(array[array.length - 1])
  keys.splice(keys.indexOf('timeZone'), 1)
  keys.splice(keys.indexOf('serviceId'), 1)
  // const keys = headersConst
  result = ','
  result += keys.join(columnDelimiter)
  result += lineDelimiter

  array.forEach((item, index) => {
    result += ','
    // if (index > 0) {
    keys.forEach((key) => {
      switch (key) {
        case 'timeZone':
        case 'serviceId':
          return
        //   case 'first_name':
        //   case 'last_name':
        //   case 'short_description':
        //   case 'about_yourself':
        //     result += (item['about_yourself']?.[key] || '') + columnDelimiter
        //     break
        //   case 'facebook_url':
        //   case 'instagram_url':
        //   case 'personal_web_url':
        //   case 'other_url':
        //     result += (item['social']?.[key] || '') + columnDelimiter
        //     break
        //   case 'email':
        //   case 'mobile':
        //   case 'whatsapp':
        //     result += (item['contact_info']?.[key] || '') + columnDelimiter
        //     break
        //   case 'college_university':
        //   case 'course':
        //   case 'graduation_year':
        //     result += (item['education']?.[key] || '') + columnDelimiter
        //   case 'experience_years':
        //     result += (item['experience']?.['years'] || '') + columnDelimiter
        //     break
        //   case 'experience_months':
        //     result += (item['experience']?.['months'] || '') + columnDelimiter
        //     break
        //   case 'email':
        //     result += (item['username'] || '') + columnDelimiter
        //     break
        //   case 'interestedSkills':
        //     result +=
        //       (item['interestedSkills']?.join('_') || '') + columnDelimiter
        default:
          result += (item[key] || '') + columnDelimiter
      }
      // result += (item[key] || '') + columnDelimiter
    })
    // }
    result = result.substr(0, result.length - 1)
    result += lineDelimiter
    // keys.forEach((key, ind) => {
    //   // if (ind == 0 && !item[key]) {
    //   // } else {
    //   // if (key === 'timeZone' || key === 'successText') {
    //   //   debugger
    //   // }
    //   // if (key === 'timeZone') result += `"${JSON.stringify(item[key])}"`
    //   // else
    //   result += item[key]
    //   // }
    //   result += columnDelimiter

    //   // result += item[key]

    //   // ctr++
    //   // }
    // })
    // result += lineDelimiter
    // }
  })

  return result
}

const RevenueHistory = ({ id }) => {
  const d = new Date()
  const [values, setValues] = useState([
    d.setDate(d.getDate() - 5),
    d.setDate(d.getDate() + 5),
  ])
  const [summary, setSummary] = useState({
    totTranCount: 0,
    totSuccCount: 0,
    totTranAmount: 0,
    totMentAmount: 0,
  })
  const [bookigsFiltered, setBookingsFiltered] = useState('')
  const [selection, setSelection] = useState('')
  const [orderIdFilter, setOrderIdFilter] = useState('')
  const [transactionIdFilter, setTransactionIdFilter] = useState('')
  const [emailFilter, setEmailFilter] = useState('')
  const [serviceTypeFilter, setServiceTypeFilter] = useState('')
  const [channelFilter, setChannelFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  // const selectRef = useRef()
  const { currentMentor, currentMentorSales: bookings } = useSelector(
    (state) => state.MentorHeaderReducer,
  )
  function downloadCSV() {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(bookigsFiltered)
    if (csv == null) return

    const filename = `export-${uuid()}.csv`

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }
  const reset = () => {
    setOrderIdFilter('')
    setTransactionIdFilter('')
    setEmailFilter('')
    setSelection('')
    setServiceTypeFilter('')
    setChannelFilter('')
    setStatusFilter('')
    setBookingsFiltered(bookings)
  }
  const filter = () => {
    const bookingsFil = bookings.filter((item) => {
      debugger
      let ret = true
      if (orderIdFilter) {
        ret = item.orderId
          ?.toLowerCase()
          .trim()
          .includes(orderIdFilter.toLowerCase())
      }
      if (emailFilter) {
        ret =
          ret &&
          item.emailId?.toLowerCase().trim().includes(emailFilter.toLowerCase())
      }
      if (transactionIdFilter) {
        ret =
          ret &&
          item.transactionId?.toLowerCase().trim().includes(transactionIdFilter)
      }
      if (serviceTypeFilter) {
        ret =
          ret &&
          item.serviceType?.toLowerCase().trim() ===
            serviceTypeFilter.toLowerCase()
      }
      if (channelFilter) {
        ret =
          ret &&
          item.channel?.toLowerCase().trim() === channelFilter.toLowerCase()
      }
      if (statusFilter) {
        ret =
          ret &&
          item.status?.toLowerCase().trim() === statusFilter.toLowerCase()
      }
      return ret
    })
    setBookingsFiltered(bookingsFil)
  }
  useEffect(() => {
    if (bookings.length > 0) {
      setBookingsFiltered(bookings)
      const totTranCount = bookings.length
      const totSuccCount = bookings.filter((item) => item.isSuccess).length
      const totTranAmount = bookings.reduce(
        (tot, item) => tot + (item.amountGrow || 0) + (item.amountMentor || 0),
        0,
      )
      const totMentAmount = bookings.reduce(
        (tot, item) => tot + item.amountMentor || 0,
        0,
      )
      setSummary({
        totTranCount,
        totSuccCount,
        totTranAmount,
        totMentAmount,
      })
    }
  }, [bookings])

  debugger
  console.log('bookings', bookings)
  // console.log('selectRef.current', selectRef?.current?.value)
  // console.log('selection', selection)
  return (
    <div className="flex flex-col py-5 m-5">
      <div className="flex justify-between flex-wrap py-5 mr-5">
        <div className={`${classes.box} w-[100px]`}>
          <span>Total Transaction</span>
          <span>{summary.totTranCount}</span>
        </div>
        <div className={`${classes.box} w-[100px]`}>
          <span>Successful Transaction</span>
          <span>{summary.totSuccCount}</span>
        </div>
        <div className={`${classes.box} w-[100px]`}>
          <span>Transation Amount</span>
          <span>{summary.totTranAmount}</span>
        </div>
        <div className={`${classes.box} w-[100px]`}>
          <span>Mentor Amount</span>
          <span>{summary.totMentAmount}</span>
        </div>
      </div>
      <div className="flex justify-start gap-[20px] flex-wrap py-5 mr-5">
        <TextField
          classOverride="max-w-[250px] min-w-[250px] border-2"
          classOverrideContainer="max-w-[250px]"
          value={orderIdFilter}
          onChangeValue={(e) => setOrderIdFilter(e.target.value)}
          // value={values.bankDetails?.accountName}
          // onChangeValue={handleChange}
          placeholder="Order ID"
        />
        <TextField
          placeholder="Transaction ID"
          classOverride="max-w-[250px] min-w-[250px]  border-2"
          classOverrideContainer="max-w-[250px]"
          value={transactionIdFilter}
          onChangeValue={(e) => setTransactionIdFilter(e.target.value)}
        />
        <TextField
          classOverride="max-w-[250px]"
          classOverrideContainer="max-w-[250px]"
          value={emailFilter}
          onChangeValue={(e) => setEmailFilter(e.target.value)}
          // value={values.bankDetails?.accountName}
          // onChangeValue={handleChange}
          placeholder="User Email"
        />
      </div>
      <div className="flex justify-start gap-[20px] flex-wrap py-5 mr-5">
        <select
          className=" min-w-[250px] text-lg py-0 border-2"
          value={serviceTypeFilter}
          onChange={(e) => setServiceTypeFilter(e.target.value)}
        >
          <option value="">Service Type</option>
          <option value="OneOnOne">1 on 1 Session</option>
          <option value="Workshop">Workshop</option>
          <option value="Courses">Course</option>
          <option value="Packages">Packages</option>
        </select>
        <select
          className=" min-w-[250px] text-lg py-0 border-2"
          value={channelFilter}
          onChange={(e) => setChannelFilter(e.target.value)}
        >
          <option value="">Channel</option>
          <option value="Web">Web</option>
          <option value="Android">Android</option>
          <option value="IOS">IOS</option>
        </select>
        <select
          className=" min-w-[250px] text-lg py-0 border-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Status</option>
          <option value="Initiated">Initiated</option>
          <option value="Success">Success</option>
          <option value="Refund">Refund</option>
          <option value="Failure">Failure</option>
        </select>
        <div className="flex  mr-5">
          <Button
            label="Reset"
            // image="/assets/icon/mentor-dashboard/search.svg"
            styleOverride={{
              height: 38,
              backgroundColor: '#ffbf00',
              color: 'black',
              border: '1px solid black',
              fontSize: 12,
            }}
            containerOverride={{
              marginLeft: 10,
              // marginBottom: 20,
            }}
            onClick={reset}
          />
        </div>
      </div>
      <div className="flex items-center justify-start">
        <select
          className="mr-5 text-lg"
          value={selection}
          onChange={(e) => setSelection(e.target.value)}
        >
          <option value="">Date FIlter</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="date-range">Date Range</option>
        </select>

        {selection === 'date-range' && (
          <div className="flex py-5 mr-5">
            <div className="text-lg ">Date Range</div>
            <DatePicker
              format="DD/MM/YYYY"
              value={values}
              onChange={setValues}
              range
            />
          </div>
        )}
        <div className="flex py-5 mr-5">
          <Button
            label="Search"
            image="/assets/icon/mentor-dashboard/search.svg"
            styleOverride={{
              height: 38,
              backgroundColor: '#ffbf00',
              color: 'black',
              border: '1px solid black',
              fontSize: 12,
            }}
            containerOverride={{
              marginLeft: 10,
              // marginBottom: 20,
            }}
            onClick={filter}
          />
          <Button
            label="Export"
            image="/assets/icon/mentor-dashboard/export.svg"
            styleOverride={{
              height: 38,
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
              fontSize: 12,
              marginRight: 10,
            }}
            containerOverride={{
              marginLeft: 10,
              // marginBottom: 20,
            }}
            // loader={loader}
            onClick={() =>
              // Auth.federatedSignIn({
              //   provider: CognitoHostedUIIdentityProvider.Google,
              // })
              {
                // logout({ returnTo: window.location.origin })
                // setTimeout(() => {
                //   debugger
                // Login(dispatch)
                // loginWithRedirect()
                // }, 3000)
                downloadCSV()
              }
            }
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={bookigsFiltered}
        pagination
        noDataComponent="No Records Found !"
        persistTableHead
      />
    </div>
  )
}

export default RevenueHistory
