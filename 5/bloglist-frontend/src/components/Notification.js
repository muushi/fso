import React from 'react'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const Notification = () => {
  const [notification] = useContext(NotificationContext)
  if (notification.message === '') return null

  return (
    <div className={notification.class}>
      {notification.message}
    </div>
  )
}

export default Notification