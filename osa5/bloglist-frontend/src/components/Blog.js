/* eslint no-console: ["error", { allow: ["log"] }] */

import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { like, remove } from '../services/blogs'

import { DumbBlog } from './DumbBlog'

const Blog = ({ blog, removeBlogFromState, userIsOwner }) => {

  const [visibility, setVisibility] = useState(false)
  const [likes, setLikes] = useState(blog.likes)  

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const makeTheLike = async (e, id, likedBlog) => {
    e.stopPropagation()
    const barg = await like(id, likedBlog)
    setLikes(likes + 1)
    console.log(barg)
  } 
  const removeBlog = async (id) => {
    if(window.confirm(`Removing "${blog.title}" by ${blog.author}`)) {
      remove(id)
      removeBlogFromState(id)
    }
  }
  console.log(userIsOwner)

  return <DumbBlog removeBlog={removeBlog} blogStyle={blogStyle} 
    makeTheLike={makeTheLike} blog={blog} setVisibility={(bool) => setVisibility(bool)} 
    userIsOwner={userIsOwner} likes={likes} visibility={visibility}
  /> 
}

Blog.propTypes = {
  blog: PropTypes.object, 
  removeBlogFromState: PropTypes.func, 
  userIsOwner: PropTypes.bool,
}
  
export {Blog}