import { configureStore } from '@reduxjs/toolkit'
import { AuthSlice } from './auth/authSlice'
import { journalSlice } from './journal'

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    journal: journalSlice.reducer
  },
})