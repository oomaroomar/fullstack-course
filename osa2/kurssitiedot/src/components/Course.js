import React from 'react'

import Content from './Content'
import Header from './Header'
import Total from './Total'

export default ({courses}) => courses.map((course, i) => {
    return <div key={`course${i}`}>
        <Header
            name={course.name}
        />
        <Content 
            parts={course.parts}
        />
        <Total 
            parts={course.parts}
        />
    </div>
}) 