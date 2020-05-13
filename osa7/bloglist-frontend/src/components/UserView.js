import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = () => {

  const { users } = useSelector(state => state)
  const { id } = useParams()
  const user = users.find(user => user.id === id)

  if (!user) {
    return null
  }

  return <div>
    <h2>{user.username}</h2>
    <p>added blogs</p>
    <ul>
      {user.blogs.map(blog => {
        return <li key={blog.id}>{blog.title}</li>
      })}
    </ul>
  </div>
}

export { UserView }