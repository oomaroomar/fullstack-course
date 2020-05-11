const notification = (state = { success: null, message: null }, action) => {
  switch (action.type) {
    case 'HIDE':
      return { ...state, message: null }
    case 'SHOW':
      return action.payload
    default:
      return state
  }
}

export { notification }