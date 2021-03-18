import React from 'react'

const Persons = ({ persons, handleClick }) => <div>{persons.map(person => <p key={person.name}>{person.name} {person.number}<button onClick={() => handleClick(person)}>delete</button></p>)}</div>

export default Persons