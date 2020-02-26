import React from 'react'


export const SearchedCountry = ({searchedCountry, setFilterWord}) => {
    return <div>
        {searchedCountry.name} 
        <button onClick={() => setFilterWord(searchedCountry.name)}>details</button>
    </div> 
}