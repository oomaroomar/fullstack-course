import React from 'react';


export default ({parts}) => {

    return parts.map((part, i) => <p key={i}>
        {part.name} {part.exercises}
    </p>)
}