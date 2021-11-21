import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { TextField } from '@mui/material';
import DefaultLayout from '../layouts/Default';
import { getBooks, searchBooks } from '../store/BooksSlice';

const Books = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [debounceKeyword] = useDebounce(keyword, 1000);

    const {
        booksList,
        booksIsLoading,
    } = useSelector(({ booksState }) => booksState);

    const hasBooks = Boolean(booksList?.length && !booksIsLoading);

    useEffect(() => {
        if (debounceKeyword) {
            dispatch(searchBooks(debounceKeyword));
        } else {
            dispatch(getBooks());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceKeyword]);

    return (
        <DefaultLayout>
            <TextField
                size='small'
                value={keyword}
                label='Search books'
                onChange={(ev) => setKeyword(ev.currentTarget.value)}
            />
            {!booksIsLoading ? (
                <div>
                    {hasBooks ? (
                        booksList?.map(({ _id, name }) => (
                            <div key={_id} onClick={() => navigate(`/books/${_id}`)}>
                                <h1>{name}</h1>
                            </div>
                        ))
                    ) : (
                        Boolean(debounceKeyword) ? (
                            <p>Search books by <strong>{debounceKeyword}</strong> keyword not found</p>
                        ) : (
                            <p>Books not found</p>
                        )
                    )}
                </div>
            ) : (
                <div>Loading</div>
            )}
        </DefaultLayout>
    );
}

export default Books;
