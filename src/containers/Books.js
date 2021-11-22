import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import {
    TextField, Card, CardContent, Grid, Stack, Typography, Box, Skeleton
} from '@mui/material';
import DefaultLayout from '../layouts/Default';
import { getBooks, searchBooks } from '../store/BooksSlice';
import BookItem from '../components/BookItem';

const ItemLoader = styled('div')`
  position: relative;
  box-shadow: 0 3px 6px #00000017;
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 100%;
  border-radius: 10px;
  height: 140px;
  padding: 20px;
  display: flex;

  > div {
      &:first-child {
        width: 100px;
      }

      &:last-child {
        width: calc(100% - 100px);
      }
  }
`;

const Books = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isUpSm = useMediaQuery(theme.breakpoints.up('sm'));
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
            <Card>
                <CardContent>
                    <Stack
                        direction={isUpSm ? 'row' : 'column'}
                        alignItems='center'
                        mb={5}
                        spacing={3}
                    >
                        <Typography width={isUpSm ? 'auto' : '100%'} variant='h5'>All books</Typography>
                        <Box width={isUpSm ? 500 : '100%'}>
                            <TextField
                                size='small'
                                value={keyword}
                                label='Search'
                                onChange={(ev) => setKeyword(ev.currentTarget.value)}
                                margin='none'
                                fullWidth
                            />
                        </Box>
                    </Stack>
                    {!booksIsLoading ? (
                        <>
                            {hasBooks ? (
                                <Grid container spacing={6}>
                                    {booksList?.map(({ _id, name, author, image, genre, createOn, lastUpdateOn }) => (
                                        <Grid item xs={12} md={6} key={_id}>
                                            <BookItem
                                                {...{
                                                    name,
                                                    author,
                                                    image,
                                                    createOn,
                                                    lastUpdateOn,
                                                }}
                                                onDetailClick={() => navigate(`/books/${_id}`)}
                                                genre={genre?.name}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Box mt={5} mb={3} textAlign='center'>
                                    {Boolean(debounceKeyword) ? (
                                        <Typography variant='body1'>
                                            Search books by <strong>{debounceKeyword}</strong> keyword not found
                                        </Typography>
                                    ) : (
                                        <Typography variant='body1'>Books not found</Typography>
                                    )}
                                </Box>
                            )}
                        </>
                    ) : (
                        <Grid container spacing={6}>
                            {[...new Array(10)]?.map((_, index) => (
                                <Grid item xs={12} md={6} key={`books-loader-${index}`}>
                                    <ItemLoader>
                                        <div>
                                            <Skeleton variant='rectangular' width={80} height={80} />
                                        </div>
                                        <div>
                                            <Skeleton variant='text' />
                                            <Skeleton variant='text' />
                                            <Skeleton variant='text' />
                                            <Skeleton variant='text' />
                                        </div>
                                    </ItemLoader>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </CardContent>
            </Card>
        </DefaultLayout>
    );
}

export default Books;
