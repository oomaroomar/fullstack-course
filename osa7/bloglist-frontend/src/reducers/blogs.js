const blogs = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.payload
    case 'ADD_BLOG':
      return [...state, action.payload]
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.payload)
    default:
      return state
  }

}

export { blogs }