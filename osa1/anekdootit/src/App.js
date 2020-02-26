import React, { useState } from 'react'

import {anecdotes} from './Anecdotes'

const App = () => {
    
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
    
    const vote = (indexToVote) => {
        console.log(indexToVote)
        setPoints(prevState => prevState.map((e,i) => i === indexToVote ? e+1 : e))
    }

    const findIndexOfMax = (list) => {
        let max = 0
        let indexOfMax
        list.forEach((e,i) => {
            if(e > max){
                max = e
                indexOfMax = i
            }
        })
        return [indexOfMax, max]
    }

    return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>
        {anecdotes[selected]} <br/>
        has {points[selected]} votes
      </p>
      <button onClick={() => setSelected(Math.floor(Math.random()*anecdotes.length))} >next anecdote</button>
      <button onClick={() => vote(selected)} >vote</button>
      <h2>Anecdote with most votes</h2>
      <p>
      {anecdotes[findIndexOfMax(points)[0]]} <br/>
      has {findIndexOfMax(points)[1]} votes
      </p>
    </div>
    )
}



export default App