import { create, getAll } from '../services/blogs'
import { runNotification } from './notification'

const addBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await create(blog)
      dispatch({
        type: 'ADD_BLOG',
        payload: newBlog
      })
    } catch (err) {
      dispatch(runNotification(err.message, 'error'))
    }
  }
}

const removeBlog = id => {
  return {
    type: 'REMOVE_BLOG',
    payload: id
  }
}

const initBlogs = () => {
  return async dispatch => {
    const blogs = await getAll()
    dispatch({
      type: 'INIT_BLOGS',
      payload: blogs
    })
  }
}

export { addBlog, initBlogs, removeBlog }