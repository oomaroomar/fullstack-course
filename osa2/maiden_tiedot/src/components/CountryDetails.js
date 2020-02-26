import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const CountryDetails = ({country}) => {

    const [countryWeather, setCountryWeather] = useState({
        temperature: 0,
        wind: {
            speed: 0,
            dir: ''
        },
        weatherIcon: ''
      })

    useEffect(() => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=1c01fe7a95278d312037b58064c9223f&query=${country.capital}`)
          .then(({data}) => {
              setCountryWeather({
                temperature: data.current.temperature,
                wind: {
                    speed: data.current.wind_speed,
                    dir: data.current.wind_dir
                },
                weatherIcon: data.current.weather_icons[0]
              })
          })
    }, [country.capital])

    return <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
            {country.languages.map(language => <li key={`${country.name} ${language.name}`} >{language.name}</li>)}
        </ul>
        <img src={country.flag} alt={`${country.name}'s flag`} height="58"  />
        <p><b>temperature: </b>{countryWeather.temperature} </p>
        <img src={countryWeather.weatherIcon} alt="missing icon"/>
        <p><b>wind: </b>{`${countryWeather.wind.speed} ${countryWeather.wind.dir}`}</p>
    </div>
}