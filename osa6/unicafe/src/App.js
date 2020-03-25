import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addRating } from './actions/ContentActions'

import Header from './components/Header'
import Buttons from './components/Buttons'
import Statistics from './components/Statisticss'

const App = () => {

  const dispatch = useDispatch()
  const ratings = useSelector(state => state)
  console.log(ratings)
  return (
    <div >
      <Header />
      <Buttons setGood={() => dispatch(addRating('GOOD'))} setBad={() => dispatch(addRating('BAD'))}
        setNeutral={() => dispatch(addRating('OK'))} />
      <Statistics goodCount={ratings.good} badCount={ratings.bad} neutralCount={ratings.ok} />
    </div>
  )
}

export default App