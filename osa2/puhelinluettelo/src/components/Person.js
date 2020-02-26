import React from 'react'

export const Person = ({person, removeContact}) => <div>
    {`${person.name} ${person.number}`}
    <button onClick={() => removeContact(person)} >delete</button>
</div>