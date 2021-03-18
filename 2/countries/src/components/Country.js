import React from 'react'
import Weather from './Weather'

const Country = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      <br />
      <img style={{maxWidth: '200px'}}src={country.flag} alt="flag"/>
      <br />
      <Weather weather={weather} />
    </div>
  )
}

export default Country