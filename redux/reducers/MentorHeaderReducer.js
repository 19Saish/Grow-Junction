import ACTION_KEYS from '../../constants/action-keys'
import { HYDRATE } from 'next-redux-wrapper'
const initialState = {
  title: '',
  mentors: [
    // {
    //   about_yourself: {
    //     grow_junction_url: '',
    //     first_name: '',
    //     last_name: '',
    //     short_description: '',
    //     about_yourself: '',
    //   },
    //   username: '',
    //   social: {
    //     linkedin_url: '',
    //     facebook_url: '',
    //     instagram_url: '',
    //     personal_web_url: '',
    //     other_url: '',
    //   },
    //   currency: '',
    //   time_zone: '',
    //   contact_info: {
    //     email: '',
    //     mobile: '',
    //     whatsapp: '',
    //   },
    //   education: {
    //     degree: '',
    //     college_university: '',
    //     course: '',
    //     graduation_year: 0,
    //   },
    //   professional_info: {
    //     occupation: '',
    //     organization: '',
    //     location: '',
    //     position: '',
    //     experience: {
    //       years: '',
    //       months: '',
    //     },
    //   },
    //   profile_image: '',
    //   domain_id: [''],
    //   whatsapp_number: '',
    //   url: '',
    //   mentor_service_id: [''],
    // },
  ],
  currentMentor: null,
  currentMentorSales: [],
}

const MentorHeaderReducer = (state = initialState, action) => {
  const { type, payload } = action
  console.log('action', action, type)

  switch (type) {
    case HYDRATE:
      return {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      }
    case ACTION_KEYS.MENTOR_HEADING:
      return {
        ...state,
        title: payload,
      }
    case ACTION_KEYS.SET_MENTORS:
      debugger
      return {
        ...state,
        mentors: [...payload],
      }
    // case
    case ACTION_KEYS.SET_MENTOR_SALES:
      return {
        ...state,
        currentMentor: payload.id,
        currentMentorSales: [...payload.data],
      }
    default:
      return state
  }
}

export default MentorHeaderReducer
