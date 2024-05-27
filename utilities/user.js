import { store } from '../redux/store'
export const getLoggedinUserEmail = () => {
  //   debugger
  const authData = store.getState().AuthReducer
  if (authData.user) {
    return authData.user.email
  } else if (authData.userAuth) {
    return authData.userAuth.username
  } else {
    return ''
  }
}
export const getMentorData = (userName) => {
  const { title, mentors } = store.getState().MentorHeaderReducer
  if(!mentors) return null
  const mentor = mentors.find((i) => i.username === userName)
  return mentor ? { ...mentor } : null
}

export const getMentorDataOnName = (userName) => {
  const { title, mentors } = store.getState().MentorHeaderReducer
  if(!mentors) return null
  const mentor = mentors.find((i) => (i.about_yourself.first_name + ' ' + i.about_yourself.last_name) === userName)
  return mentor ? { ...mentor } : null
}
