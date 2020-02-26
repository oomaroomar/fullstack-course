import React from 'react'

import {CountryDetails} from './CountryDetails'
import {SearchedCountry} from './SearchedCountry'

export const CountryList = ({countries, handleSearch, setFilterWord}) => {

    const searchedCountries = countries.filter(country => handleSearch(country.name))

    if(searchedCountries.length === 1) return <CountryDetails country={searchedCountries[0]} />

    if(searchedCountries.length < 11) return searchedCountries.map(searchedCountry => <SearchedCountry setFilterWord={setFilterWord} key={searchedCountry.name} searchedCountry={searchedCountry} />)

    return <p>Too many matches, specify another filter</p>
}