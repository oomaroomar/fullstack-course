import React from 'react'
import PropTypes from 'prop-types'

const CreateBlogInput = ({ handler, value, text }) => <div>
  {text} <input onChange={handler} value={value} type="text"/>
</div>

CreateBlogInput.propTypes = {
  handler: PropTypes.func,
  value: PropTypes.string,
  text: PropTypes.string
}

export default CreateBlogInput