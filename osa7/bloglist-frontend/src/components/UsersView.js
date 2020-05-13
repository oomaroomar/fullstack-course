/* eslint no-console: ["error", { allow: ["log"] }] */

import React from 'react'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

import ListGroup from 'react-bootstrap/ListGroup'

const UsersView = ({ route }) => {

  const { users } = useSelector(state => state)

  return <div style={{ display: 'flex' }}>
    <ListGroup>
      <h3>Users</h3>
      {users.map(user => {
        console.log(user)
        return <ListGroup.Item onClick={() => route(`/user/${user.id}`)} key={user.id}>{user.username} </ListGroup.Item>
      })}
    </ListGroup>
    <ListGroup>
      <h3>blogs created</h3>
      {users.map(user => {
        return <ListGroup.Item key={user.id}> {user.blogs.length}</ListGroup.Item>
      })}
    </ListGroup>
  </div>

}

UsersView.propTypes = {
  route: PropTypes.func
}

export { UsersView }