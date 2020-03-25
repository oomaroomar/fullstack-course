import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { voteAction, initializeAnecdotes } from '../actions/anecdoteAction'
import { setNotification } from '../actions/notificationAction'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filterString = useSelector(state => state.filter)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const vote = (anecdote) => {
    dispatch(voteAction(anecdote))
    dispatch(setNotification(`you voted for '${anecdote.content}'`, 4000))
  }

  const sortedAnecdotes = (thaList) => {
    return thaList.concat().sort((a, b) => b.votes - a.votes)
  }

  return (<div>
    {sortedAnecdotes(anecdotes).filter(({ content }) => content.toLowerCase().includes(filterString.toLowerCase())).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
  </div>)
}

export default AnecdoteList