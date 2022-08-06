import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, errClass }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={errClass}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  errClass: PropTypes.string.isRequired
}

export default Notification