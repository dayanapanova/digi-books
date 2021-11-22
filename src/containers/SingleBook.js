import React, { useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useParams } from 'react-router-dom';
import { Grid, Card, Typography, Box } from '@mui/material';
import DefaultLayout from '../layouts/Default';
import { getSingleBook } from '../store/BooksSlice';
import formatDate from '../utils/formatDate';

const Title = styled('div')(({ theme }) => `
  width: 100%;
  background: ${theme.palette.secondary.main};
  color: #fff;
  border-radius: 5px;
`);

const Image = styled('div')`
  position: relative;
  box-shadow: 0 5px 15px #00347026;
  background-color: #fff;

  img {
    width: 100%;
    display: block;
  }
`;

const SingleBook = () => {
    const theme = useTheme();
    const isUpSm = useMediaQuery(theme.breakpoints.up('sm'));
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
    const hasCreatedDate = Boolean(singleBook?.createOn);
    const hasUpdatedDate = Boolean(singleBook?.lastUpdateOn);

    return (
        <DefaultLayout>
            {!singleBooksLoading ? (
                <Grid container alignItems='center' justifyContent='center'>
                    <Grid item xs={8} sm={3} md={4}>
                        <Image>
                            <img src={singleBook?.image} alt={bookName} />
                        </Image>
                    </Grid>
                    <Grid item xs={12} sm={9} md={8}>
                        <Card>
                            <Title>
                                <Box p={isUpSm ? 3 : 2}>
                                    <Typography variant='h4'>{bookName}</Typography>
                                </Box>
                            </Title>

                            <Box p={isUpSm ? 3 : 2}>
                                <Typography
                                    mb={3}
                                    color={theme.palette.primary.main}
                                    variant='body1'
                                    fontWeight={600}
                                >
                                    {singleBook?.author}
                                </Typography>

                                {hasCreatedDate && (
                                    <Typography
                                        mb={3}
                                        variant='body1'
                                    >
                                        Created on: <strong>{formatDate(new Date(singleBook?.createOn))}</strong>
                                    </Typography>
                                )}

                                {hasUpdatedDate && (
                                    <Typography
                                        mb={3}
                                        variant='body1'
                                    >
                                        Updated on: <strong>{formatDate(new Date(singleBook?.lastUpdateOn))}</strong>
                                    </Typography>
                                )}

                                <Typography fontWeight={600} mb={2}>Short description</Typography>

                                <Typography variant='body2'>
                                    Harry Potter and the Goblet of Fire is a fantasy novel written by British author J. K. Rowling and the fourth novel in the Harry Potter series. It follows Harry Potter, a wizard in his fourth year at Hogwarts School of Witchcraft and Wizardry, and the mystery surrounding the entry of Harry’s name into the Triwizard Tournament, in which he is forced to compete. The book was published in the United Kingdom by Bloomsbury and in the United States by Scholastic. In both countries, the release date was 8 July 2000. This was the first time a book in the series was published in both countries at the same time. The novel won a Hugo Award, the only Harry Potter novel to do so, in 2001. The book was adapted into a film, released worldwide on 18 November 2005, and a video game by Electronic Arts.
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
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
