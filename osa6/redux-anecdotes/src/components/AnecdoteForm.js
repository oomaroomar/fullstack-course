import React, { useState } from 'react'

import { createAnecdote } from '../actions/anecdoteAction'
import { connect } from 'react-redux'
import { setNotification } from '../actions/notificationAction'


const AnecdoteForm = (props) => {


  const [newAnecdote, setNewAnecdote] = useState('')

  const { createAnecdote, setNotification } = props

  const handleChange = e => {
    e.preventDefault()
    setNewAnecdote(e.target.value)
  }
  const handleSubmit = async e => {
    e.preventDefault()
    createAnecdote(newAnecdote)
    setNotification(`You created an anecdote saying '${newAnecdote}'`, 4000)
  }

  return (<div>
    <h2>create new</h2>
    <form>
      <div><input type='text' value={newAnecdote} onChange={handleChange} /></div>
      <button onClick={handleSubmit} >create</button>
    </form>
  </div>)
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const connectedForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default connectedForm