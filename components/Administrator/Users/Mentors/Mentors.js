import React, { useMemo, useState, useEffect, useRef } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'
import { toast } from 'react-toastify'
import { API, Auth } from 'aws-amplify'
import DataTable from 'react-data-table-component'
import Button from '../../../../pages/ui-kit/Button'
import Papa from 'papaparse'
import { useSelector, useDispatch } from 'react-redux'
import { getCognitoUsers } from '../../../../utilities/others'
import { setMentors } from '../../../../redux/actions/MentorTitleAction'
import { listStudentBookings } from '../../../../src/graphql/queries'
import AddMentor from './AddMentor'
import ACTION_KEYS from '../../../../constants/action-keys'
// import {
//   createStudentRegister,
//   updateStudentRegister,
// } from '../../../../src/graphql/mutations'
import classes from './Mentors.module.css'
function Mentors() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [mentorsFiltered, setMentorsFiltered] = useState()
  const [showModal, setShowModal] = useState(false)
  const [cognitoUsers, setCognitoUsers] = useState([])
  const [filterText, setFilterText] = useState()
  const [filterBy, setFilterBy] = useState()
  const [studentBookings, setStudentBookings] = useState([])
  const [studentBookingsFiltered, setStudentBookingsFiltered] = useState([])
  const [studentBookingsLoading, setStudentBookingsLoading] = useState(true)

  const dispatch = useDispatch()
  // debugger
  const mentorObj = useSelector((state) => state.MentorHeaderReducer)
  useEffect(() => {
    ;(async () => {
      try {
        const users = await getCognitoUsers()
        debugger
        setCognitoUsers(users.users)
      } catch (error) {}
    })()
  }, [])
  useEffect(() => {
    if (mentorObj?.mentors?.length === 0) {
      setMentors(dispatch)
    }
  }, [mentorObj])
  useEffect(() => {
    let mentorsData = mentorObj.mentors.filter((a) => a.username)
    if (studentBookings.length > 0) {
      mentorsData.forEach((item) => {
        // debugger
        // if (cognitoUsers.length > 0) {
        //   debugger
        //   const usernames = cognitoUsers.map((u) => u.Username)
        //   item.isCognito = usernames.some(
        //     (u) => u.toLowerCase().trim() === item.username,
        //   )
        // } else {
        //   item.isCognito = false
        // }
        // item.signupby = 'Internal'
        item.bookings = []
      })
      studentBookings.forEach((item) => {
        // debugger
        const found = mentorsData.find((a) => a.username == item.username)
        if (found) {
          if (found.bookings && found.bookings.length) {
          } else {
            found.bookings = []
          }
          found.bookings.push({ ...item })
        }
        // else {
        //   const newItem = {
        //     about_yourself: {
        //       //   grow_junction_url,
        //       first_name:
        //         item.name.split(' ').length > 1 ? item.name.split(' ')[0] : '',
        //       last_name:
        //         item.name.split(' ').length > 1 ? item.name.split(' ')[1] : '',
        //       // short_description,
        //       // about_yourself,
        //     },
        //     // current_employee,
        //     // linkedIn_url,
        //     // degree,
        //     // experience,
        //     // recent_college,
        //     // your_role,
        //     username: item.emailId,
        //     // social,
        //     // :{
        //     //   linkedin_url,
        //     //   facebook_url,
        //     //   instagram_url,
        //     //   personal_web_url,
        //     //   other_url,
        //     // }
        //     contact_info: {
        //       email: item.emailId,
        //       mobile: item.mobileNumber,
        //       whatsapp: item.whatsapp,
        //     },
        //     // education,
        //     // :{
        //     //   degree,
        //     // college_university,
        //     // course,
        //     // graduation_year
        //     // }
        //     // professional_info,
        //     // :
        //     //   {
        //     //     occupation: String
        //     //     organization: String
        //     //     location: String
        //     //     position: String
        //     //     experience: Experience
        //     //   }
        //     // profile_image,
        //     // student_profile,
        //     whatsapp_number: item.mobileNumber,

        //     bookings: [item],
        //     createdAt: item.createdAt,
        //     // interestedSkills,
        //   }
        //   mentorsData.push(newItem)
        // }
      })
    }
    setMentorsFiltered(mentorsData)
    setStudentBookingsFiltered(mentorsData)
  }, [mentorObj.mentors, studentBookings])
  // console.log('mentorsFiltered', mentorsFiltered)
  const fileref = useRef()
  const [csvFile, setCsvFile] = useState()
  const [headers, setHeaders] = useState([])

  const headersConst = [
    // about_yourself,
    // :{
    'grow_junction_url',
    'first_name',
    'last_name',
    'short_description',
    'about_yourself',
    // }
    'current_employee',
    'linkedIn_url',
    'degree',
    // 'experience',
    'recent_college',
    'your_role',
    // 'email',
    // "social",
    // :{
    // "linkedin_url",
    'facebook_url',
    'instagram_url',
    'personal_web_url',
    'other_url',
    // }
    // contact_info,
    // :{
    'email',
    'mobile',
    'whatsapp',
    // }
    // education,
    // :{
    //   degree,
    'college_university',
    'course',
    'graduation_year',
    // }
    // professional_info,
    // :
    //   {
    'occupation',
    'organization',
    'location',
    'position',
    'currency',
    // 'experience',
    'experience_years',
    'experience_months',
    //   }
    // 'profile_image',
    // 'student_profile',
    // whatsapp_number,
    // 'interestedSkills',
  ]
  // const downloadTemplate = async () => {
  //   const filename = `template-${uuid()}.csv`
  //   const templateUrl = await getS3FileUrl(
  //     'template.csv',
  //     'templates-grow-junction',
  //     filename,
  //   )
  //   //https://templates-grow-junction.s3.us-east-1.amazonaws.com/template.csv?X-A…2Fjs%20md%2Fbrowser%2FChrome_108.0.0.0%20api%2Fs3%2F3.254.0&x-id=GetObject
  //   const link = document.createElement('a')
  //   // let csv = convertArrayOfObjectsToCSV(mentorsFiltered)
  //   // if (csv == null) return
  //   console.log('templateUrl', templateUrl)

  //   link.setAttribute('href', templateUrl)
  //   link.setAttribute('download', filename)
  //   // debugger
  //   link.click()
  // }
  console.log('mentorObj', mentorObj?.mentors)
  const [rows, setRows] = useState([])
  // const [loading, setLoading] = useState()
  // const [csvArray, setCsvArray] = useState([])
  const [stepsObject, setStepsObject] = useState({})
  // [{name: "", age: 0, rank: ""},{name: "", age: 0, rank: ""}]
  const main = async (file) => {
    const reader = new FileReader()
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true, delimiter: ',' })
      const parsedData = csv?.data
        // ?.filter((i) => i.name)
        .map((i) => {
          // let jsn = {}
          // try {
          //   jsn = JSON.parse(i.timeZone)
          // } catch (error) {}
          return {
            about_yourself: {
              grow_junction_url: i.grow_junction_url,
              first_name: i.first_name,
              last_name: i.last_name,
              short_description: i.short_description,
              about_yourself: i.about_yourself,
            },
            current_employee: i.current_employee,
            linkedIn_url: i.linkedIn_url,
            degree: i.degree,
            experience: i.experience_years + ' ' + i.experience_months,
            recent_college: i.recent_college,
            your_role: i.your_role,
            // email: i.email,
            username: i.email,
            social: {
              linkedin_url: i.linkedin_url,
              facebook_url: i.facebook_url,
              instagram_url: i.instagram_url,
              personal_web_url: i.personal_web_url,
              other_url: i.other_url,
            },
            contact_info: {
              email: i.email,
              mobile: i.mobile,
              whatsapp: i.whatsapp,
            },
            education: {
              degree: i.degree,
              college_university: i.college_university,
              course: i.course,
              graduation_year: i.graduation_year,
            },
            professional_info: {
              occupation: i.occupation,
              organization: i.organization,
              location: i.location,
              position: i.position,
              experience: {
                years: i.experience_years,
                months: i.experience_months,
              },
            },
          }
        })
      // const columns = Object.keys(parsedData[0])
      // let colPresent = true
      // headersConst.forEach((col) => {
      //   if (!columns.includes(col)) {
      //     colPresent = false
      //     return
      //   }
      // })
      // if (colPresent) {
      // setHeaders(columns)
      // setRows(parsedData)
      // } else {
      //   toast.error(`The required columns not present. Invalid csv file.`)
      // }
      // debugger
      parsedData.forEach(async (data, index) => {
        if (
          data.contact_info.email &&
          !(mentorsFiltered || []).find(
            (item) =>
              item.username.toLowerCase().trim() !==
              data.username.toLowerCase().trim(),
          )
        ) {
          try {
            await API.graphql({
              query: createStudentRegister,
              variables: { input: { ...data } },
            })
            // toast.success('Student booking added successfully')
            // window.location.href = window.location.href
          } catch (error) {
            console.log('create error', error)
            // toast.error(`Save Error:${error.errors[0].message}`)
          }
        } else if (data.contact_info.email) {
          data.id = mentorsFiltered.find(
            (item) =>
              item.username.toLowerCase().trim() !==
              data.username.toLowerCase().trim(),
          ).id
          // const { createdAt, updatedAt, owner, ...rest } = {
          //   ...data,
          // }
          // rest.username = getLoggedinUserEmail()
          try {
            await API.graphql({
              query: updateStudentRegister,
              variables: {
                input: { ...data },
              },
            })
            // toast.success('Student booking updated successfully')
          } catch (error) {
            // debugger
            // toast.error(`Save Error:${error.errors[0].message}`)
            console.log('update error', error)
          }
        }
        if (index === parsedData.length - 1) {
          toast.success('Data imported successfully')
          setStudents(dispatch)
        }
      })
    }
    if (file) reader.readAsText(file)
    // try {
    //   const rows = await readXlsxFile(file)
    //   setHeaders(rows[0])
    //   setRows(rows)
    // } catch (error) {
    //   console.log('err', error)
    // }
    // processCSV(rows[0], rows.slice(1))
  }
  console.log('rows', rows)
  console.log('headers', headers)
  function convertArrayOfObjectsToCSV(array) {
    // debugger
    let result
    const columnDelimiter = ','
    const lineDelimiter = '\n'
    // const keys = Object.keys(array[array.length - 1])
    const keys = headersConst
    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach((item, index) => {
      // if (index > 0) {
      keys.forEach((key) => {
        switch (key) {
          case 'grow_junction_url':
          case 'first_name':
          case 'last_name':
          case 'short_description':
          case 'about_yourself':
            result += (item['about_yourself']?.[key] || '') + columnDelimiter
            break
          case 'facebook_url':
          case 'instagram_url':
          case 'personal_web_url':
          case 'other_url':
            result += (item['social']?.[key] || '') + columnDelimiter
            break
          case 'email':
          case 'mobile':
          case 'whatsapp':
            result += (item['contact_info']?.[key] || '') + columnDelimiter
            break
          case 'college_university':
          case 'course':
          case 'graduation_year':
            result += (item['education']?.[key] || '') + columnDelimiter
          case 'experience_years':
            result += (item['experience']?.['years'] || '') + columnDelimiter
            break
          case 'experience_months':
            result += (item['experience']?.['months'] || '') + columnDelimiter
            break
          case 'email':
            result += (item['username'] || '') + columnDelimiter
            break
          case 'interestedSkills':
            result +=
              (item['interestedSkills']?.join('_') || '') + columnDelimiter
          default:
            result += (item[key] || '') + columnDelimiter
        }
      })
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
  function editRecord(username) {
    const rec = mentorsFiltered.find((i) => i.username === username)
    dispatch({
      type: ACTION_KEYS.SET_MENTOR_SALES,
      payload: {
        id: rec.id,
        data: rec.bookings,
      },
    })
    router.push(`/admin/users/mentors/${rec.id}`)
  }
  function downloadCSV() {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(mentorsFiltered)
    if (csv == null) return

    const filename = `export-${uuid()}.csv`

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }
  const columns = [
    {
      name: 'Created Date',
      cell: (row) => (
        <span className="text-capital">
          {moment(row.createdAt).format('DD/MM/YYYY')}
        </span>
      ),
      sortable: true,
      selector: (row) => row.createdAt,
    },
    {
      name: 'Name',
      sortable: true,
      width: '250px',
      selector: (row) =>
        row.about_yourself?.first_name + ' ' + row.about_yourself?.last_name,
      cell: (row) => (
        <span className="text-capital">
          {row.about_yourself?.first_name + ' ' + row.about_yourself?.last_name}
        </span>
      ),
    },
    {
      name: 'Email',
      sortable: true,
      width: '250px',
      selector: (row) => (row?.username === 'null' ? '' : row?.username || ''),
      cell: (row) => <span className="min-w-[250px]">{row.username}</span>,
    },
    {
      name: 'Whatsapp',
      sortable: true,
      selector: (row) =>
        row?.contact_info?.whatsapp === 'null'
          ? ''
          : row?.contact_info?.whatsapp || '',
    },
    {
      name: 'Role',
      sortable: false,
      selector: (row) => 'Mentor',
    },
    {
      name: 'Action',
      sortable: false,
      cell: (row) => (
        <a
          onClick={() => editRecord(row.username)}
          style={{ cursor: 'pointer' }}
        >
          <img src="/assets/icon/edit.svg" />
        </a>
      ),
    },
  ]
  useEffect(() => {
    // debugger
    if (filterBy && filterText) {
      const filtered = mentorsFiltered.filter((item) => {
        switch (filterBy) {
          case 'name':
            return (
              item?.about_yourself?.first_name +
              ' ' +
              item?.about_yourself?.last_name
            )
              .toLowerCase()
              .trim()
              .includes(filterText.trim().toLowerCase())
          case 'contact_info.whatsapp':
            return item?.contact_info?.whatsapp
              ?.toLowerCase()
              .includes(filterText?.trim()?.toLowerCase())
          case 'username':
            return item?.username
              .toLowerCase()
              .includes(filterText?.trim()?.toLowerCase())
        }
      })
      setStudentBookingsFiltered(filtered)
    } else {
      setStudentBookingsFiltered(mentorsFiltered)
    }
  }, [filterText, filterBy])
  useEffect(() => {
    setStudentBookingsLoading(true)
    ;(async () => {
      try {
        const listData = await API.graphql({
          query: listStudentBookings,
        })
        setStudentBookings(
          listData?.data?.listStudentBookings?.items.filter((a) => a.username),
        )
        // setStudentBookingsFiltered(
        //   listData?.data?.listStudentBookings?.items.filter((a) => a.username),
        // )
        setStudentBookingsLoading(false)
        // setShowDomainInput(false)
        setLoading(false)
      } catch (err) {
        setStudentBookingsLoading(false)
        console.log('err', err)
        // setDomainListLoading(false)
      }
    })()
  }, [])
  // console.log('studentBookings', studentBookings)
  /* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */

  // data state to store the TV Maze API data. Its initial value is an empty array
  // if (studentBookingsLoading) {
  //   return <div>Loading...</div>
  // }
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className="left">
          <select
            className=" px-3 mr-5 py-3 top-1  text-lg right-1 bg-gray-50"
            // value="values.sessionDurationIn"
            value={filterBy}
            placeholder="Add Filters"
            onChange={(e) => {
              // if (!e.target.value) {
              //   setFilterText('')
              // }
              // debugger
              setFilterBy(e.target.value)
            }}
          >
            <option value="">Add Filters</option>
            <option value="name">Name</option>
            <option value="contact_info.whatsapp">Whatsapp</option>
            <option value="username">Email</option>
          </select>
          <input
            className="bg-white mr-3 p-3 text-lg min-w-[300px] rounded-2 border-2"
            // style={{
            //   backgroundColor: 'white',
            //   color: 'black',
            //   marginRight: 10,
            //   minWidth: '300px',
            //   width: 129,
            //   fontSize: 12,
            //   padding: '10px',
            //   borderRadius: 5,
            //   border: '1px solid #ccc',
            // }}
            value={filterText}
            placeholder="Search by Name or Email or Whatsapp number"
            name="value"
            onChange={(e) => {
              setFilterText(e.target.value)
              // setDomainName(() => ({
              //   [e.target.name]: e.target.value,
              // }))
            }}
          />
        </div>
        <input
          name="file"
          ref={fileref}
          type="file"
          accept=".csv"
          id="csvFile"
          onClick={(e) => {
            // setCsvArray([])
          }}
          style={{ display: 'none' }}
          onChange={(e) => {
            // debugger
            setCsvFile(e.target.files[0])
            setTimeout(() => {
              main(e.target.files[0])
            }, 1000)
          }}
        />
        <div className={classes.right}>
          {/* <Button
            label="Download Template"
            image="/assets/icon/mentor-dashboard/export.svg"
            styleOverride={{
              height: 38,
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
              fontSize: 12,
            }}
            containerOverride={{
              marginLeft: 10,
              marginBottom: 20,
            }}
            onClick={() => {
              downloadTemplate()
            }}
          /> */}
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
              marginBottom: 20,
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
          {/* <Button
            label="Import"
            image="/assets/icon/mentor-dashboard/import.svg"
            styleOverride={{import MentorHeaderReducer from '../../../../redux/reducers/MentorHeaderReducer';

              height: 38,
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
              fontSize: 12,
            }}
            containerOverride={{
              // marginLeft: 10,
              marginBottom: 20,
            }}
            // loader={loader}
            onClick={() =>
              // Auth.federatedSignIn({
              //   provider: CognitoHostedUIIdentityProvider.Google,
              // })
              {
                fileref.current.click()
                // logout({ returnTo: window.location.origin })
                // setTimeout(() => {
                //   debugger
                // Login(dispatch)
                // loginWithRedirect()
                // }, 3000)
              }
            }
            
          /> */}

          <Button
            label="New"
            image="/assets/icon/mentor-dashboard/user1.svg"
            styleOverride={{
              height: 38,
              backgroundColor: '#ffbf00',
              color: 'white',
              border: '1px solid black',
              fontSize: 12,
            }}
            containerOverride={{
              marginLeft: 10,
              marginBottom: 20,
            }}
            onClick={() => {
              setShowModal(true)
            }}
          />
        </div>
      </div>
      {loading ? (
        <div className="text-3xl flex justify-center p-5">Loading....</div>
      ) : (
        <DataTable
          columns={columns}
          data={studentBookingsFiltered}
          pagination
          noDataComponent="No Records Found !"
          persistTableHead
        />
      )}
      {showModal && <AddMentor show={showModal} setShow={setShowModal} />}
    </div>
  )
}

export default Mentors
