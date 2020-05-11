let timeoutID

const runNotification = (message, success, time = 4000) => {
  return dispatch => {
    dispatch({
      type: 'SHOW',
      payload: { message, success }
    })
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'HIDE'
      })
    }, time)
  }
}

export { runNotification }