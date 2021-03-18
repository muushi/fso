import React from 'react'

const Weather = ({ weather }) => {
    <>
      {weather && (
        <div>
          <h3>Weather in {weather?.location.name}</h3>
          <p><span style={{fontWeight: 'bold'}}>temperature: </span>{weather?.current.temperature} Celsius</p>
          <img style={{maxWidth: '200px'}} src={weather?.current.weather_icons[0]} alt="weather icon" />
          <p><span style={{fontWeight: 'bold'}}>wind: </span>{weather?.current.wind_speed} mph direction {weather?.current.wind_dir}</p>
        </div>
      )}
      </>
}

export default Weather