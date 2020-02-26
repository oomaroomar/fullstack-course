import React from 'react'

export default ({newName, handleNameChange, newNumber, handleNumberChange, submitContact}) => <form>
    <h2>add a new</h2>
    <div>
        name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button onClick={submitContact} type="submit">add</button>
    </div>
</form>