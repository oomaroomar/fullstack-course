import React, { useState, useEffect } from 'react'

import AddPersonForm from './components/AddPersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import {Notification} from './components/Notification'
import {getAll, create, remove, update} from './services/persons'

import './index.css'

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')
  const [notif, setNotif] = useState({type: null, message: null})

  useEffect(() => {
    getAll()
    .then(initialPersons => setPersons(initialPersons))
    console.log('effect used')
  }, [])

  const submitContact = (e) => {
    e.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    const found = persons.find(person => person.name === newName)
    if(found) {
      if(window.confirm(`${found.name} is already added to phonebook, replace the old number with a new one?`)){
        updateContact(found.id, personObject)
        notifSetter('success', `${found.name} updated`)
        return
      }
      return
    }
    
    create(personObject)
      .then(newPerson => {
        setPersons([...persons, newPerson])
        notifSetter('success', `${newPerson.name} added`)
      })
      .catch(err => {
        console.log(err.response.data)
        notifSetter('error', `${err.response.data.error}`)
      })
  }

  const removeContact = (contactToRemove) => {
    if(window.confirm(`Delete ${contactToRemove.name}?`)) {
      remove(contactToRemove.id)
        .then(
          setPersons(persons.filter(person => person.id !== contactToRemove.id))
        )
      notifSetter('success',`${contactToRemove.name} has been deleted`)
    }
  }

  const updateContact = (id, newContactVersion) => {
    console.log(id)
    console.log(newContactVersion)
    console.log(persons)
    update(id, newContactVersion)
      .then(updatedContact => {
        setPersons(persons.map(person => person.id !== id ? person : updatedContact))
      }).catch(err => {
        notifSetter('error', `Information of ${newContactVersion.name} has already been removed from the server`)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const notifSetter = (type, message) => {
    setNotif({type, message})
    setTimeout(() => {
      setNotif({type: null, message: null})
    }, 5000);
  }

  const handleNameChange = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    e.preventDefault()
    setNewNumber(e.target.value)
  }
  const handleFilterChange = (e) => {
    e.preventDefault()
    setFilterWord(e.target.value)
  }
  const handleSearch = (searchTerm) => {
    if(searchTerm.toLowerCase().includes(filterWord.toLowerCase())) return true 
    return false
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif.message} notifType={notif.type} />
      <Filter
        filterWord={filterWord}
        handleFilterChange={handleFilterChange}
      />
      <AddPersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        submitContact={submitContact}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        handleSearch={handleSearch}
        removeContact={removeContact}
      />
    </div>
  )

}

export default App