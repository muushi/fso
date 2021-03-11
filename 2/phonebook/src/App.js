import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ filteredPersons, setFilteredPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ query, setQuery ] = useState('')

  const setPerson = (event) => {
    event.preventDefault()
    const duplicate = persons.find(person => person.name === newName)
    if (duplicate) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPersons = [...persons, {name: newName, number: newNumber}]
      setPersons(newPersons)
      setFilteredPersons(newPersons.filter(
        person => person.name.toLowerCase().includes(query.toLowerCase())
      ))
    }
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={query} onChange={handleQuery} />
      <h2>add a new</h2>
      <PersonForm onSubmit={setPerson} name={newName} nameOnChange={handleNameChange} number={newNumber} numberOnChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App;