import React from 'react';

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

export default Notification