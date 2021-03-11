import React from 'react';

const PersonForm = ({ onSubmit, name, nameOnChange, number, numberOnChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={nameOnChange} />
        number: <input value={number} onChange={numberOnChange} />
      </div>
      <div>debug: {name}</div>
      <div>debug: {number}</div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm