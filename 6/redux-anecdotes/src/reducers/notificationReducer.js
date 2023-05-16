import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotificationNew(state, action) {
      return `Added '${action.payload}'`
    },
    addNotificationVote(state, action) {
      return `you voted '${action.payload}'`
    },
    removeNotification(state, action) {
      return ''
    }
  },
})

export const {addNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer