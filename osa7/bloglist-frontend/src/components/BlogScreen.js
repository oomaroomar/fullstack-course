import React from 'react'
import PropTypes from 'prop-types'

const BlogScreen = ({ content }) => <div className='blogscreen'>
  <h2>blogs</h2>
  {content}
</div>

BlogScreen.propTypes = {
  name: PropTypes.string,
  logout: PropTypes.func,
  content: PropTypes.object
}

export { BlogScreen }