import React from 'react'
import PropTypes from 'prop-types'

import Alert from 'react-bootstrap/Alert'

const Notification = ({ message = null, notifType }) => {
  if (message === null) return null

  return <Alert variant={notifType} >
    {message}
  </Alert>
}

Notification.propTypes = {
  message: PropTypes.string,
  notifType: PropTypes.string
}

export { Notification }