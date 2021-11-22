import React, { useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LogoSVG from '../svg/LogoSVG';
import authBackgroundPNG from '../assets/authBackground.png';

const Layout = styled('div')`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const Logo = styled(LogoSVG)(({ theme }) => `
  width: 180px;
  margin: 0 auto;
  display: block;
  margin: 20px auto 80px auto;

  ${theme.breakpoints.up('sm')} {
    width: 300px;
    margin: 0 auto 20px auto;
  }
`);

const Content = styled('div')(({ theme }) => `
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 3;
  padding: 20px;

  ${theme.breakpoints.up('sm')} {
    padding: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`);

const ContentMobile = styled('div')`
  position: relative;
  z-index: 3;
  padding: 40px 20px;
  background: rgb(255 255 255 / 85%);
  border-radius: 8px;
  text-align: center;
`;

const Background = styled('div')(({ theme }) => `
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  ${theme.breakpoints.up('sm')} {
    position: relative;
  }
`);

export const AuthLink = styled('span')(({ theme }) => `
  color: ${theme.palette.primary.main};
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
`);

const AuthLayout = ({ title, subtitle, children }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isUpSm = useMediaQuery(theme.breakpoints.up('sm'));

    const { isAuthenticated } = useSelector(({ authenticationState }) => authenticationState);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return (
        <Layout>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={5}>
                    <Content>
                        {isUpSm ? (
                            <Box textAlign='center'>
                                <Box mb={3}>
                                    <Logo />
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
                                {children}
                            </Box>
                        ) : (
                            <div>
                                <Logo />
                                <ContentMobile>
                                    <div>
                                        <Typography component="h1" variant="h6">
                                            {title}
                                        </Typography>
                                        {Boolean(subtitle) && (
                                            <Typography component="h1" variant="subtitle1">
                                                {subtitle}
                                            </Typography>
                                        )}
                                    </div>
                                    {children}
                                </ContentMobile>
                            </div>
                        )}
                    </Content>
                </Grid>
                {isUpSm && (
                    <Grid item sm={6} md={7}>
                        <Background>
                            <img src={authBackgroundPNG} alt={title} />
                        </Background>
                    </Grid>
                )}
            </Grid>
            {!isUpSm && (
                <Background>
                    <img src={authBackgroundPNG} alt={title} />
                </Background>
            )}
        </Layout>
    );
}

export default AuthLayout;
