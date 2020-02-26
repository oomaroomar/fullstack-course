import React from 'react'
import PropTypes from 'prop-types'

const Login = ({loginName, handleNameChange, loginPassword, handlePasswordChange, login}) => <form>

  <h2>log in to application</h2>
  <div>
    username <input value={loginName} onChange={handleNameChange} type="text" />
  </div>
  <div>
    password <input value={loginPassword} onChange={handlePasswordChange} type="password"/>
  </div>
  <div>
    <button onClick={login} >login</button>
  </div>

</form>

Login.propTypes = {
  loginName: PropTypes.string,
  handleNameChange: PropTypes.func,
  loginPassword: PropTypes.string,
  handlePasswordChange: PropTypes.func,
  login: PropTypes.func
}

export { Login }