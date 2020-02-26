import React from 'react'
import PropTypes from 'prop-types'

const BlogScreen = ({ name, logout, content }) => <div className='blogscreen'>
  <h2>blogs</h2>
  <div>{name} logged in <button onClick={logout}>logout</button></div>
  <br/>
  {content}
</div>

BlogScreen.propTypes = {
  name: PropTypes.string, 
  logout: PropTypes.func,
  content: PropTypes.object 
}

export { BlogScreen }