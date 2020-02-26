import React, {useState, useEffect} from 'react'
import axios from 'axios'

import {CountryList} from './components/CountryList'
import {Filter} from './components/Filter'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filterWord, setFilterWord] = useState('')

  useEffect(() => {
    axios
     .get('https://restcountries.eu/rest/v2/all')
     .then(({data}) => setCountries(data))
  },[])

  const handleFilterChange = (e) => {
    e.preventDefault()
    setFilterWord(e.target.value)
  }

  const handleSearch = (searchTerm) => {
    if(searchTerm.toLowerCase().includes(filterWord.toLowerCase())) return true 
    return false
  }

  return(
    <div>
      <Filter
        filterWord={filterWord}
        handleFilterChange={handleFilterChange}
      />
      <CountryList
        countries={countries}
        handleSearch={handleSearch}
        setFilterWord={setFilterWord}
      />
    </div>
  )
}

export default App;
