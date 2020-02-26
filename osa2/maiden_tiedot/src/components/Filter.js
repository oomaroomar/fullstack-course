import React from 'react'

export const Filter = ({filterWord, handleFilterChange}) => <div>
    find countries <input value={filterWord} onChange={handleFilterChange} />
</div>
