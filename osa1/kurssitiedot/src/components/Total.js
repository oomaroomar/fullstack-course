import React from 'react';

export default ({parts}) => {
    let excercises = 0
    parts.forEach(item => {
        excercises += item.excercises
    })
    
    return <p>Number of exercises {excercises}</p>
}
