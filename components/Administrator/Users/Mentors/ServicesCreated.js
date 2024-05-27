import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import {
  getOneOnOnes,
  getCourses,
  getWorkshops,
  getTextQueries,
  getPackages,
} from '../../../../redux/actions/MentorServicesAction'
const columns = [
  {
    name: 'Created Date',
    cell: (row) => (
      <span className="text-capital">
        {row.createdAt ? moment(row.createdAt).format('DD/MM/YYYY') : ''}
      </span>
    ),
    sortable: true,
    selector: (row) => row.createdAt,
  },
  {
    name: 'Title',
    width: '350px',
    cell: (row) => (
      <span className="text-capital">
        {row.courseTitle || row.packageTitle}
      </span>
    ),
    sortable: true,
    selector: (row) => row.courseTitle || row.packageTitle,
  },
  {
    name: 'Service Type',
    cell: (row) => <span className="text-capital">{row.serviceType}</span>,
    sortable: true,
    selector: (row) => row.serviceType,
  },
  {
    name: 'Price',
    sortable: true,
    selector: (row) => row.finalPrice,
    cell: (row) => <span>{row.finalPrice}</span>,
  },
]
const ServicesCreated = ({ id }) => {
  const [mentor, setMentor] = useState()
  const [state, setState] = useState([])
  const [stateOneOnOne, setStateOneOnOne] = useState()
  const [stateWorkshop, setStateWorkshop] = useState()
  const [stateCourses, setStateCourses] = useState()
  const [stateTextQuery, setStateTextQuery] = useState()
  const [statePackages, setStatePackages] = useState()
  const dispatch = useDispatch()
  const services = useSelector((state) => state.MentorServiceReducer)
  const { workshop, courses, oneOnOne, textQuery, packages } = services
  const {
    currentMentor,
    mentors,
    currentMentorSales: bookings,
  } = useSelector((state) => state.MentorHeaderReducer)
  useEffect(() => {
    if (mentors?.length > 0) {
      // debugger
      const foundMentor = mentors.find((item) => item.id === id)
      if (foundMentor) {
        setMentor({ ...foundMentor })
      }
    }
  }, [mentors])
  useEffect(() => {
    // debugger
    if (
      (!oneOnOne?.length && !!mentor) ||
      (!oneOnOne.some((item) => item.username) && !!mentor)
    ) {
      debugger
      dispatch(getOneOnOnes(mentor.username))
    } else if (oneOnOne?.length && !!mentor) {
      setStateOneOnOne([
        ...(oneOnOne.find((item) => item.username === mentor.username)
          ?.services || []),
      ])
    }
  }, [oneOnOne, mentor])
  useEffect(() => {
    if (!stateOneOnOne) return
    debugger
    const oneOnOneState = [...stateOneOnOne]
    oneOnOneState.forEach((item) => {
      item.serviceType = 'OneOnOne'
    })
    setState((prev) => [
      ...prev.filter((item) => item.serviceType !== 'OneOnOne'),
      ...oneOnOneState,
    ])
  }, [stateOneOnOne])

  useEffect(() => {
    // debugger
    if (
      (!workshop?.length && !!mentor) ||
      (!workshop.some((item) => item.username) && !!mentor)
    ) {
      debugger
      dispatch(getWorkshops(mentor.username))
    } else if (workshop?.length && !!mentor) {
      setStateWorkshop([
        ...(workshop.find((item) => item.username === mentor.username)
          ?.services || []),
      ])
    }
  }, [workshop, mentor])
  useEffect(() => {
    if (!stateWorkshop) return
    debugger
    const workshopState = [...stateWorkshop]
    workshopState.forEach((item) => {
      item.serviceType = 'Workshop'
    })
    setState((prev) => [
      ...prev.filter((item) => item.serviceType !== 'Workshop'),
      ...workshopState,
    ])
  }, [stateWorkshop])

  useEffect(() => {
    // debugger
    if (
      (!textQuery?.length && !!mentor) ||
      (!textQuery.some((item) => item.username) && !!mentor)
    ) {
      debugger
      dispatch(getTextQueries(mentor.username))
    } else if (textQuery?.length && !!mentor) {
      setStateTextQuery([
        ...(textQuery.find((item) => item.username === mentor.username)
          ?.services || []),
      ])
    }
  }, [textQuery, mentor])
  useEffect(() => {
    if (!stateTextQuery) return
    debugger
    const textQueryState = [...stateTextQuery]
    textQueryState.forEach((item) => {
      item.serviceType = 'TextQuery'
    })
    setState((prev) => [
      ...prev.filter((item) => item.serviceType !== 'TextQuery'),
      ...textQueryState,
    ])
  }, [stateTextQuery])

  useEffect(() => {
    // debugger
    if (
      (!courses?.length && !!mentor) ||
      (!courses.some((item) => item.username) && !!mentor)
    ) {
      debugger
      dispatch(getCourses(mentor.username))
    } else if (courses?.length && !!mentor) {
      setStateCourses([
        ...(courses.find((item) => item.username === mentor.username)
          ?.services || []),
      ])
    }
  }, [courses, mentor])
  useEffect(() => {
    if (!stateCourses) return
    debugger
    const coursesState = [...stateCourses]
    coursesState.forEach((item) => {
      item.serviceType = 'Courses'
    })
    setState((prev) => [
      ...prev.filter((item) => item.serviceType !== 'Courses'),
      ...coursesState,
    ])
  }, [stateCourses])

  useEffect(() => {
    // debugger
    if (
      (!packages?.length && !!mentor) ||
      (!packages.some((item) => item.username) && !!mentor)
    ) {
      debugger
      dispatch(getPackages(mentor.username))
    } else if (packages?.length && !!mentor) {
      setStateOneOnOne([
        ...(packages.find((item) => item.username === mentor.username)
          ?.services || []),
      ])
    }
  }, [packages, mentor])
  useEffect(() => {
    if (!statePackages) return
    debugger
    const packagesState = [...statePackages]
    packagesState.forEach((item) => {
      item.serviceType = 'Packages'
    })
    setState((prev) => [
      ...prev.filter((item) => item.serviceType !== 'Packages'),
      ...packagesState,
    ])
  }, [statePackages])
  console.log('State-Puchases', state)
  // useEffect(() => {
  //   if (
  //     (!textQuery?.length && mentor) ||
  //     !textQuery.some((item) => item.username)
  //   ) {
  //     dispatch(getTextQueries(mentor.username))
  //   } else {
  //     setStateTextQuery(
  //       textQuery.filter((item) => item.username === mentor.username),
  //     )
  //   }
  // }, [textQuery, mentor])
  // useEffect(() => {
  //   if (
  //     (!workshop?.length && mentor) ||
  //     !workshop.some((item) => item.username)
  //   ) {
  //     dispatch(getWorkshops(mentor.username))
  //   } else {
  //     setStateWorkshop(
  //       workshop.filter((item) => item.username === mentor.username),
  //     )
  //   }
  // }, [workshop])
  // useEffect(() => {
  //   if (
  //     (!courses?.length && mentor) ||
  //     !courses.some((item) => item.username)
  //   ) {
  //     dispatch(getCourses(mentor.username))
  //   } else {
  //     setStateCourses(
  //       courses.filter((item) => item.username === mentor.username),
  //     )
  //   }
  // }, [courses, mentor])
  // useEffect(() => {
  //   if (
  //     (!packages?.length && mentor) ||
  //     !packages.some((item) => item.username)
  //   ) {
  //     dispatch(getPackages(mentor.username))
  //   } else {
  //     setStatePackages(
  //       packages.filter((item) => item.username === mentor.username),
  //     )
  //   }
  // }, [packages, mentor])
  // debugger
  return (
    <DataTable
      columns={columns}
      data={state}
      pagination
      noDataComponent="No Records Found !"
      persistTableHead
    />
  )
}

export default ServicesCreated
