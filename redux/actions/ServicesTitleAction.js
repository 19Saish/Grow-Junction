import ACTION_KEYS from '../../constants/action-keys'
export const setServicesTitle = (dispatch, title) => {
  try {
    dispatch({ type: ACTION_KEYS.SERVICES_HEADING, payload: title })
  } catch (err) {}
}
