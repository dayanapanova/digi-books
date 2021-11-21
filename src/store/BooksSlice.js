import { createSlice } from '@reduxjs/toolkit';
import httpClient from '../api/httpClient';

const initialState = {
    booksList: [],
    booksIsLoading: false,
    singleBooksLoading: false,
    singleBook: {},
}

export const BooksSlice = createSlice({
    name: 'Books',
    initialState,
    reducers: {
        getBooksRequesting: (state) => {
            state.booksIsLoading = true;
        },
        getBooksSuccess: (state, { payload }) => {
            state.booksList = payload?.data;
            state.booksIsLoading = false;
        },
        getBooksError: (state) => {
            state.booksIsLoading = false;
        },
        searchBooksRequesting: (state) => {
            state.booksIsLoading = true;
        },
        searchBooksSuccess: (state, { payload }) => {
            state.booksList = payload?.data;
            state.booksIsLoading = false;
        },
        searchBooksError: (state) => {
            state.booksIsLoading = false;
        },
        getSingleBookRequesting: (state) => {
            state.singleBooksLoading = true;
        },
        getSingleBookSuccess: (state, { payload }) => {
            state.singleBook = payload?.data;
            state.singleBooksLoading = false;
        },
        getSingleBookError: (state) => {
            state.singleBooksLoading = false;
        },
    }
})

export const {
    getBooksRequesting,
    getBooksSuccess,
    getBooksError,
    searchBooksRequesting,
    searchBooksSuccess,
    searchBooksError,
    getSingleBookRequesting,
    getSingleBookSuccess,
    getSingleBookError,
} = BooksSlice.actions;

export const getBooks = () => async (dispatch) => {
    dispatch(getBooksRequesting());
    httpClient.get('/book').then(
        (response) => dispatch(getBooksSuccess(response)),
        (error) => dispatch(getBooksError(error)),
    );
};

export const searchBooks = (keyword) => async (dispatch) => {
    dispatch(searchBooksRequesting());
    httpClient.post('/book/search', { pattern: keyword }).then(
        (response) => dispatch(searchBooksSuccess(response)),
        (error) => dispatch(searchBooksError(error)),
    );
};

export const getSingleBook = (id) => async (dispatch) => {
    dispatch(getSingleBookRequesting());
    httpClient.get(`/book/${id}`).then(
        (response) => dispatch(getSingleBookSuccess(response)),
        (error) => dispatch(getSingleBookError(error)),
    );
};

export default BooksSlice.reducer
