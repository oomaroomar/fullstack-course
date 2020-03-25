const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'HIDE':
      return null
    case 'SHOW':
      return action.payload
    default:
      return state
  }

}

export { notificationReducer }