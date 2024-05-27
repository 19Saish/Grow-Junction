import { listOneOnOnes } from '/src/graphql/queries'
import { listTextQueries } from '/src/graphql/queries'
import { listWorkshops } from '/src/graphql/queries'
import { listCourses } from '/src/graphql/queries'
import { listPackages } from '/src/graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'
import ACTION_KEYS from '../../constants/action-keys'
export const getOneOnOnes = (username) => async (dispatch) => {
  try {
    const results = await API.graphql(
      graphqlOperation(listOneOnOnes, {
        filter: { username: { contains: username } },
      }),
    )
    //   if (results.data.listOneOnOnes.items.length > 0) {
    dispatch({
      type: ACTION_KEYS.ONE_ON_ONE,
      username,
      payload: results.data.listOneOnOnes.items,
    })
  } catch (error) {
    debugger
  }
  //   }
}
export const getWorkshops = (username) => async (dispatch) => {
  const results = await API.graphql(
    graphqlOperation(listWorkshops, {
      filter: { username: { contains: username } },
    }),
  )
  //   if (results.data.listWorkshops.items.length > 0) {
  dispatch({
    type: ACTION_KEYS.WORKSHOP,
    username,
    payload: results.data.listWorkshops.items,
  })
  //   }
}
export const getCourses = (username) => async (dispatch) => {
  const results = await API.graphql(
    graphqlOperation(listCourses, {
      filter: { username: { contains: username } },
    }),
  )
  //   if (results.data.listCourses.items.length > 0) {
  dispatch({
    type: ACTION_KEYS.COURSES,
    username,
    payload: results.data.listCourses.items,
  })
  //   }
}
export const getTextQueries = (username) => async (dispatch) => {
  const results = await API.graphql(
    graphqlOperation(listTextQueries, {
      filter: { username: { contains: username } },
    }),
  )
  //   if (results.data.listTextQueries.items.length > 0) {
  dispatch({
    type: ACTION_KEYS.TEXT_QUERY,
    username,
    payload: results.data.listTextQueries.items,
  })
  //   }
}
export const getPackages = (username) => async (dispatch) => {
  const results = await API.graphql(
    graphqlOperation(listPackages, {
      filter: { username: { contains: username } },
    }),
  )
  //   if (results.data.listPackages.items.length > 0) {
  dispatch({
    type: ACTION_KEYS.PACKAGES,
    username,
    payload: results.data.listPackages.items,
  })
  //   }
}
