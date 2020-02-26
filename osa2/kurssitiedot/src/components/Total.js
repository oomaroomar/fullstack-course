import React from 'react';

export default ({parts}) => {

    let totalExercises = parts.reduce((acc, current) => {
        return acc + current.exercises
    }, 0)

    return <b>Number of exercises {totalExercises}</b>
}
