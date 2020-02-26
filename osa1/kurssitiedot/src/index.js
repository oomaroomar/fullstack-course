import React from 'react'
import ReactDOM from 'react-dom'

import Content from './components/Content'
import Header from './components/Header'
import Total from './components/Total'

const App = () => {
    const course = {
        name: 'Half stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                excercises: 10,
            },
            {
                name: 'Using props to pass data',
                excercises: 7
            },
            {
                name: 'State of a component',
                excercises: 14
            }
        ]
    }

  return (
    <div>
      <Header
        course={course}
       />
      <Content 
        parts={course.parts}
      />
      <Total 
        parts={course.parts}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))