let timeoutID

const setNotification = (message, time = 5000) => {
  return dispatch => {
    dispatch({
      type: 'SHOW',
      payload: message
    })
    if (!timeoutID) {
      timeoutID = setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, time)
    } else {
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, time)
    }
  }
}

export { setNotification }