import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contactService from './services/contact'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filteredPersons, setFilteredPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ query, setQuery ] = useState('')

  const setPerson = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    const duplicate = persons.find(person => person.name === newName)
    if (duplicate) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        contactService.update(duplicate.id, newPerson).then(res => {
        console.log(res)
        contactService.getAll().then(res => updatePersons(res))
        }
      )
    } else {
      contactService.create(newPerson).then(res => console.log(res))
      const newPersons = [...persons, newPerson]
      updatePersons(newPersons)
    }
  }
  const updatePersons = (newPersons) => {
    setPersons(newPersons)
    setFilteredPersons(newPersons.filter(
      person => person.name.toLowerCase().includes(query.toLowerCase())
    ))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleQuery = (event) => {
    setQuery(event.target.value)
    setFilteredPersons(persons.filter(
      person => person.name.toLowerCase().includes(event.target.value.toLowerCase())
    ))
  }
  const handleClick = (person) => {
    if (window.confirm(`Delete ${person.name} ?`))
    contactService.remove(person.id).then(res =>
      console.log(res)
    )
    const newPersons = persons.filter(p => p.id !== person.id)
    updatePersons(newPersons)
  }
  const hook = () => {
    contactService.getAll().then(res => updatePersons(res))
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={query} onChange={handleQuery} />
      <h2>add a new</h2>
      <PersonForm onSubmit={setPerson} name={newName} nameOnChange={handleNameChange} number={newNumber} numberOnChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleClick={handleClick} />
    </div>
  )
}

export default App;