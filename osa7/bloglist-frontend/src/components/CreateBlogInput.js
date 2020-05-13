import React from 'react'
import PropTypes from 'prop-types'

import Form from 'react-bootstrap/Form'

const CreateBlogInput = ({ handler, value, text }) => <Form.Group>
  {text} <Form.Control onChange={handler} value={value} type="text" />
</Form.Group>

CreateBlogInput.propTypes = {
  handler: PropTypes.func,
  value: PropTypes.string,
  text: PropTypes.string
}

export default CreateBlogInput