import React from 'react'
import Country from './Country'

const Results = ({ handleClick, results, weather }) => {
  return (
    <div>
      {
        results.length > 1
          ? results.map((result, i) => <div key={i}>{result.name}<button onClick={() => handleClick(result.name)}>show</button></div>)
          : <Country country={results[0]} weather={weather} /> }
    </div>
  )
}

export default Results