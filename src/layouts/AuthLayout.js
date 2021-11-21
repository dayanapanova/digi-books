import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import LogoSVG from '../svg/LogoSVG';
import authBackgroundPNG from '../assets/authBackground.png';

const Layout = styled('div')`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const Content = styled('div')`
  padding: 100px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const Background = styled('div')`
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const AuthLayout = ({ title, subtitle, children }) => (
    <Layout>
        <Grid container spacing={1}>
            <Grid item md={5}>
                <Content>
                    <div>
                        <Box textAlign='center'>
                            <Box mb={3}>
                                <LogoSVG />
                            </Box>
                            <Box mb={3}>
                                <Typography component="h1" variant="h6">
                                    {title}
                                </Typography>
                                {Boolean(subtitle) && (
                                    <Typography component="h1" variant="subtitle1">
                                        {subtitle}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                        {children}
                    </div>
                </Content>
            </Grid>
            <Grid item md={7}>
                <Background>
                    <img src={authBackgroundPNG} alt={title} />
                </Background>
            </Grid>
        </Grid>
    </Layout>
);

export default AuthLayout;
