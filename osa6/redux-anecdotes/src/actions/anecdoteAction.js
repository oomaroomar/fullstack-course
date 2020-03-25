import { getAll, createNew, vote } from '../services/anecdote'

const voteAction = (anecdoteObject) => {
  return async dispatch => {
    console.log('vote action being called')
    const updatedAnecdote = await vote(anecdoteObject)
    console.log('Server updated anecdote: ', updatedAnecdote)
    console.log('Anecdote given to redux: ', anecdoteObject)
    dispatch({
      type: 'VOTE',
      payload: anecdoteObject
    })
  }
}

const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await createNew(anecdote)
    dispatch({
      type: 'CREATE',
      payload: newAnecdote
    })
  }
}

const sortAnecdotes = () => {
  console.log('sort action being called')
  return {
    type: 'SORT'
  }
}

const initializeAnecdotes = (initialState) => {
  return async dispatch => {
    const initialState = await getAll()
    dispatch({
      type: 'INIT',
      payload: initialState
    })
  }
}

export { voteAction, createAnecdote, sortAnecdotes, initializeAnecdotes }