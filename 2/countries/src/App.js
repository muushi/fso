import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Results from './components/Results'

const App = () => {
  const [ query, setQuery ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ results, setResults ] = useState([])
  const [ weather, setWeather ] = useState([])
  const handleQuery = (event) => {
    setQuery(event.target.value)
    searchCountries(event.target.value)
  }

  const searchCountries = (query) => {
    const res = countries.filter(country => country.name.toLowerCase().includes(query.toLowerCase()))
    console.log(res);
    setResults(res)
  }

  const handleClick = (country) => {
    setQuery(country)
    searchCountries(country)
  }

  const countryDataHook = () => {
    axios.get(`https://restcountries.eu/rest/v2/all`).then(resp => {
      setCountries(resp.data)
    })
  }

  const weatherDataHook = () => {
    const API_KEY = process.env.REACT_APP_API_KEY
    const BASE_URL = 'http://api.weatherstack.com/current'
    if (results.length === 1) {
      const capital = results.map(c => c.capital)
      if (capital[0]) {
        axios.get(`${BASE_URL}?access_key=${API_KEY}&query=${capital[0]}`).then(resp => {
          console.log(resp)
          setWeather(resp.data)
        })
      }
    }
  }

  useEffect(countryDataHook, [])
  useEffect(weatherDataHook, [results])

  return (
    <div>
      find countries <input value={query} onChange={handleQuery} />
      <br />
      {results.length > 10
        ? 'Too many matches, specify another filter'
        : results.length === 0
          ? ''
          : <Results handleClick={handleClick} results={results} weather={weather} />
      }
    </div>
  )
}

export default App;