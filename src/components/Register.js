import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '../utils/validations';
import { useState } from 'react'

const theme = createTheme({

});

export default function LogIn() {
    const [disabled, setDisabled] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    })

    const onSubmit = (data) => {
        console.log('Submitted')
        console.log(data)
    }

    const FIELDS = [
        {
            name: 'email',
            componentProps: {
                margin: 'normal',
                fullWidth: true,
                label: 'Email address',
                size: 'small'
            }
        },
        {
            name: 'password',
            componentProps: {
                margin: 'normal',
                fullWidth: true,
                label: 'Password',
                size: 'small',
                type: 'password',
                autoComplete: 'current-password'
            }
        }

    ]

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        WELCOME BACK!
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        {FIELDS.map(({ name, componentProps }, index) => {
                            const error = errors?.name?.message;
                            const hasError = Boolean(error);
                            return (
                                <TextField
                                    key={`${name}-${index}`}
                                    {...componentProps}
                                    {...register(name)}
                                >

                                    {hasError && (
                                        <TextField
                                            helperText={error}
                                        />
                                    )}
                                </TextField>
                            )
                        })}

                        <Link href="#" variant="body2">
                            Forgot password
                        </Link>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        //disabled={setDisabled}
                        >
                            LOG IN
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"You don't have an account? SIGN UP HERE"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}