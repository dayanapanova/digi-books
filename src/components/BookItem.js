import { Typography, Grid } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import formatDate from '../utils/formatDate';

import ArrowIcon from '../svg/ArrowIcon';

const Title = styled(Typography)`
  cursor: pointer;
`;

const BookItem = styled('div')(({ theme }) => `
  position: relative;
  box-shadow: 0 3px 6px #00000017;
  overflow: hidden;
  border-radius: 10px;
  text-align: center;

  ${theme.breakpoints.up('sm')} {
    display: flex;
    align-items: center;
    height: 100%;
    text-align: left;
  }
`);

const Image = styled('div')(({ theme }) => `
  width: 130px;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  margin: 0 auto 30px auto;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  ${theme.breakpoints.up('sm')} {
    margin: 0;
  }
`);

const Content = styled('div')(({ theme }) => `
  width: 100%;
  padding: 20px 20px 55px 20px;

  ${theme.breakpoints.up('sm')} {
    width: calc(100% - 190px);
    padding: 0 40px 0 20px;
  }
`);

const MoreButton = styled('div')(({ theme }) => `
  position: absolute;
  width: 100%;
  height: 34px;
  bottom: 0;
  background-color: ${theme.palette.primary.main};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${theme.breakpoints.up('sm')} {
    right: 0;
    top: 0;
    bottom: auto;
    width: 34px;
    height: 100%;
  }

  svg {
    width: 24px;
    height: 24px;
    display: block;
  }
`);

const BookItemComponent = ({ onDetailClick, name, image, author, genre, createOn, lastUpdateOn }) => {
  const theme = useTheme();
  const hasCreatedDate = Boolean(createOn);
  const hasUpdatedDate = Boolean(lastUpdateOn);
  return (
    <BookItem onClick={onDetailClick}>
      <Image>
        <img src={image} alt={name} />
      </Image>
      <Content>
        <Title mb={1} variant='h6'>{name}</Title>
        <Typography mb={1} variant='body2' color={theme.palette.primary.main} fontWeight={600}>{author}</Typography>
        <Typography mb={1} variant='body2'>Genre: <strong>{genre}</strong></Typography>
        <Grid container spacing={2}>
          {hasCreatedDate && (
            <Grid item xs={12} sm={6}>
              <Typography variant='body2'>Created: <strong>{formatDate(new Date(createOn))}</strong></Typography>
            </Grid>
          )}
          {hasUpdatedDate && (
            <Grid item xs={12} sm={6}>
              <Typography variant='body2'>Updated: <strong>{formatDate(new Date(lastUpdateOn))}</strong></Typography>
            </Grid>
          )}
        </Grid>
      </Content>
      <MoreButton onClick={onDetailClick}>
        <ArrowIcon />
      </MoreButton>
    </BookItem>
  );
}

export default BookItemComponent;
