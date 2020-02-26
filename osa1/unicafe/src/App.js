import React, {useState} from 'react';

import Header from './components/Header'
import Buttons from './components/Buttons'
import Statistics from './components/Statisticss'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  return (
    <div >
      <Header />
      <Buttons setGood={() => setGood(good + 1)} setBad={() => setBad(bad + 1)} setNeutral={() => setNeutral(neutral + 1)} />
      <Statistics goodCount={good} badCount={bad} neutralCount={neutral} />
    </div>
  )
}

export default App;
