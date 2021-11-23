import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },
    palette: {
        primary: {
            main: '#1076B5',
        },
        secondary: {
            main: '#08C642',
        },
        background: {
            default: '#FAFAFA',
        },
    },
    components: {
        MuiContainer: { defaultProps: { maxWidth: 'xl' } },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 5px 15px #00347026',
                    borderRadius: 5,
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                },
                containedPrimary: {
                    color: '#fff',
                    '&.Mui-disabled': {
                        background: '#1076B5',
                        color: '#fff',
                        opacity: 0.5,
                    },
                },
                containedSecondary: {
                    color: '#fff',
                    '&.Mui-disabled': {
                        background: '#08C642',
                        color: '#fff',
                        opacity: 0.5,
                    },
                },
            }
        },
        MuiTypography: {
            styleOverrides: {
                body1: {
                    fontSize: 18,
                },
                body2: {
                    fontSize: 16,
                },
                h1: {
                    fontWeight: 700,
                },
                h4: {
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    fontSize: 22,
                },
                h5: {
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    fontSize: 20,
                },
                h6: {
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    fontSize: 18,
                }
            }
        }
    }
});

export default theme;
