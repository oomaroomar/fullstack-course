import React from 'react'
import PropTypes from 'prop-types'

const CreateAccount = ({accountName, handleNameChange, accountPassword, handlePasswordChange, createAccount}) => <form>

  <h2>create account</h2>
  <div>
    username <input value={accountName} onChange={handleNameChange} type="text" />
  </div>
  <div>
    password <input value={accountPassword} onChange={handlePasswordChange} type="password"/>
  </div>
  <div>
    <button onClick={createAccount} >Create Account</button>
  </div>

</form>

CreateAccount.propTypes = {
  accountName: PropTypes.string,
  handleNameChange: PropTypes.func,
  accountPassword: PropTypes.string,
  handlePasswordChange: PropTypes.func,
  createAccount: PropTypes.func
}

export { CreateAccount }