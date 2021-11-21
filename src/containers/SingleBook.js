import React, { useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import DefaultLayout from '../layouts/Default';
import { getSingleBook } from '../store/BooksSlice';

const SingleBook = () => {
    let { bookID } = useParams();
    const dispatch = useDispatch();

    const {
        singleBook,
        singleBooksLoading,
    } = useSelector(({ booksState }) => booksState);

    const bookNotFound = !singleBooksLoading && _.isEmpty(singleBook);

    useEffect(() => {
        dispatch(getSingleBook(bookID));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookID]);

    const bookName = singleBook?.name;

    return (
        <DefaultLayout>
            {!singleBooksLoading ? (
                <div>
                    <h1>{bookName}</h1>
                    <img src={singleBook?.image} alt={bookName} />
                </div>
            ) : (
                <p>Loading</p>
            )}
            {bookNotFound && (
                <div>
                    <h1>404</h1>
                    <p>Book not found</p>
                </div>
            )}
        </DefaultLayout>
    );
}

export default SingleBook;
