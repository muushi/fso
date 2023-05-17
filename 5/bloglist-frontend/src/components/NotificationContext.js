import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'ERROR':
    return { message: action.payload, class: 'error' }
  case 'INFO':
    return { message: action.payload, class: 'info' }
  case 'CLEAR':
    return { message: null, class: null }
  default:
    return state
  }
}

export const ContextWrapper = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, { message: null, class: null })
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

const NotificationContext = createContext()

export default NotificationContext