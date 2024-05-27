import ACTION_KEYS from '../../constants/action-keys'
import { API, graphqlOperation } from 'aws-amplify'
import { listStudentRegisters } from '../../src/graphql/queries'
export const setStudentTitle = (dispatch, title) => {
  try {
    dispatch({ type: ACTION_KEYS.STUDENT_HEADING, payload: title })
  } catch (err) {}
}
export const setStudents = async (dispatch) => {
  try {
    const results = await API.graphql(
      graphqlOperation(
        listStudentRegisters,
        //   {
        //   filter: { username: { contains: usrName } },
        // }
      ),
    )
    debugger
    if (results.data.listStudentRegisters.items.length > 0) {
      // console.log('data - ', data)
      dispatch({
        type: ACTION_KEYS.SET_STUDENTS,
        payload: results.data.listStudentRegisters.items,
      })
    }
  } catch (err) {
    debugger
  }
}
