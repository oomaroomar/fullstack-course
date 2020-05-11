import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({message = null, notifType}) => {
  if(message === null) return null

  return <div className={`${notifType}`} >
    {message}
  </div>
}

Notification.propTypes = {
  message: PropTypes.string,
  notifType: PropTypes.string
}

export { Notification }