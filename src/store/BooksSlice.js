import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    books: []
}

export const BooksSlice = createSlice({
    name: 'Books',
    initialState,
    reducers: {
        getBooks: (state) => {

        },
    }
})

export const { getBooks } = BooksSlice.actions

export default BooksSlice.reducer