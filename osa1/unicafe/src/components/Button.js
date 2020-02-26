import React from 'react'

export default ({text, setter}) => <button onClick={setter}>
    {text}
</button>