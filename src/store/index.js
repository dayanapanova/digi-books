import { configureStore } from '@reduxjs/toolkit'
import AuthenticationReducer from './AuthenticationSlice'
import BooksReducer from './BooksSlice'

export const store = configureStore({
    reducer: {
        authentication: AuthenticationReducer,
        books: BooksReducer
    },
})