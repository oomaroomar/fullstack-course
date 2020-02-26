import React from 'react'

import {Person} from './Person'

export default ({persons, handleSearch, removeContact}) => <div>
        {persons.filter(person => handleSearch(person.name)).map(person => <Person removeContact={removeContact} person={person} key={person.name}/>)}
</div>