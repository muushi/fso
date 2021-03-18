import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filteredPersons, setFilteredPersons ] = useState([])
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

  const hook = () => {
    axios.get('http://localhost:3001/persons').then(resp => {
      setPersons(resp.data)
      setFilteredPersons(resp.data)})
  }

  useEffect(hook, [])

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