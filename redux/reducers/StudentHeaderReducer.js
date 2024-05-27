import ACTION_KEYS from '../../constants/action-keys'
import { HYDRATE } from 'next-redux-wrapper'
const initialState = {
  title: '',
  students: [],
  currentStudent: null,
  currentStudentPurchases: [],
}

const StudentHeaderReducer = (state = initialState, action) => {
  const { type, payload } = action
  console.log('action', action, type)

  switch (type) {
    case HYDRATE:
      return {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      }
    case ACTION_KEYS.STUDENT_HEADING:
      return {
        ...state,
        title: payload,
      }
    case ACTION_KEYS.SET_STUDENTS:
      return {
        ...state,
        students: [...payload],
      }
    case ACTION_KEYS.SET_STUDENT_PURCHASES:
      return {
        ...state,
        currentStudent: payload.id,
        currentStudentPurchases: [...payload.data],
      }
    // case
    default:
      return state
  }
}

export default StudentHeaderReducer
