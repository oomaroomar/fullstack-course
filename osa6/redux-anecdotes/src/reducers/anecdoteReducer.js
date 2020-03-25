//import { act } from "react-dom/test-utils"

const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      return state.map(a => a.id === action.payload.id ? { ...a, votes: a.votes + 1 } : a)
    case 'CREATE':
      return [...state, action.payload]
    case 'INIT':
      console.log('initializing anecdotes state')
      return action.payload
    default:
      return state
  }
}

export { anecdoteReducer }