import ACTION_KEYS from '../../constants/action-keys'
import { API, Auth, input, Storage, graphqlOperation } from 'aws-amplify'
import { listMentorRegisters } from '../../src/graphql/queries'
export const setMentorTitle = (dispatch, title) => {
  try {
    dispatch({ type: ACTION_KEYS.MENTOR_HEADING, payload: title })
  } catch (err) {}
}
export const setMentors = async (dispatch) => {
  debugger
  try {
    const results = await API.graphql(
      graphqlOperation(
        listMentorRegisters,
        //   {
        //   filter: { username: { contains: usrName } },
        // }
      ),
    )

    if (results.data.listMentorRegisters.items.length > 0) {
      // console.log('data - ', data)

      dispatch({
        type: ACTION_KEYS.SET_MENTORS,
        payload: results.data.listMentorRegisters.items,
      })
    }
  } catch (err) {}
}
