import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { like, remove } from '../services/blogs'

const BlogView = ({ removeBlogFromState, route }) => {

  const { blogs, user } = useSelector(state => state)
  const { id } = useParams()
  const blog = blogs.find(b => b.id === id)

  const [likes, setLikes] = useState(blog.likes)

  const handleLike = async e => {
    e.preventDefault()
    like(id, { likes: likes + 1 })
    setLikes(likes + 1)
  }

  const handleRemove = e => {
    e.preventDefault()
    if (window.confirm(`Removing "${blog.title}" by ${blog.author}`)) {
      remove(id)
      removeBlogFromState(id)
      route('/')
    }
  }

  return <div>
    <h2>{blog.title}</h2>
    <div>
      <p>{blog.url}</p>
      <div style={{ display: 'flex' }}>
        <p>{likes} likes</p>
        <button onClick={handleLike}>like</button>
      </div>
      <p>added by {blog.user.username}</p>
      {user.username === blog.user.username
        ? <button onClick={handleRemove}  >Delete</button>
        : null
      }
    </div>
  </div>
}

BlogView.propTypes = {
  removeBlogFromState: PropTypes.func,
}

export { BlogView }