import { configureStore } from '@reduxjs/toolkit'
import AuthenticationReducer from './AuthenticationSlice'

export const store = configureStore({
    reducer: {
        authentication: AuthenticationReducer
    },
})