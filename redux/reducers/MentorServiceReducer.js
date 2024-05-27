import ACTION_KEYS from '../../constants/action-keys'
const initialState = {
  oneOnOne: [],
  workshop: [],
  courses: [],
  textQuery: [],
  packages: [],
}
const MentorServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_KEYS.ONE_ON_ONE:
      debugger
      const foundOneOnOne = state.oneOnOne.find(
        (item) => item.username === action.username,
      )
      if (foundOneOnOne) {
        foundOneOnOne.services = action.payload
        return { ...state }
      } else {
        return {
          ...state,
          oneOnOne: [
            ...state.oneOnOne,
            { username: action.username, services: action.payload },
          ],
        }
      }
    case ACTION_KEYS.WORKSHOP:
      const foundWorkshop = state.workshop.find(
        (item) => item.username === action.username,
      )
      if (foundWorkshop) {
        foundWorkshop.services = action.payload
        return { ...state }
      } else {
        return {
          ...state,
          workshop: [
            ...state.workshop,
            { username: action.username, services: action.payload },
          ],
        }
      }

    case ACTION_KEYS.COURSES:
      const foundCourses = state.courses.find(
        (item) => item.username === action.username,
      )
      if (foundCourses) {
        foundCourses.services = action.payload
        return { ...state }
      } else {
        return {
          ...state,
          courses: [
            ...state.courses,
            { username: action.username, services: action.payload },
          ],
        }
      }

    case ACTION_KEYS.TEXT_QUERY:
      const foundTextQuery = state.textQuery.find(
        (item) => item.username === action.username,
      )
      if (foundTextQuery) {
        foundTextQuery.services = action.payload
        return { ...state }
      } else {
        return {
          ...state,
          textQuery: [
            ...state.textQuery,
            { username: action.username, services: action.payload },
          ],
        }
      }
    case ACTION_KEYS.PACKAGES:
      const foundPackages = state.packages.find(
        (item) => item.username === action.username,
      )
      if (foundPackages) {
        foundPackages.services = action.payload
        return { ...state }
      } else {
        return {
          ...state,
          packages: [
            ...state.packages,
            { username: action.username, services: action.payload },
          ],
        }
      }
    default:
      return state
  }
}
export default MentorServiceReducer
