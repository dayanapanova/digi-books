import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout, { AuthLink } from '../layouts/AuthLayout';
import Form from '../components/Form';
import { signIn } from '../store/AuthenticationSlice';
import PasswordInput from '../components/PasswordInput';

export const validations = Yup.object().shape({
    username: Yup.string().min(4).required(),
    password: Yup.string()
        .required().min(8).max(250)
        .label('Password'),
});

const LoginContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validations)
    });

    const usernameValue = watch('username');
    const passwordValue = watch('password');
    const canSubmit = Boolean(usernameValue) && Boolean(passwordValue);

    const loginIsLoading = useSelector(({ authenticationState: { loginIsLoading } }) => loginIsLoading);

    const onSubmit = ({ username, password }) => dispatch(signIn({ username, password }));

    return (
        <AuthLayout title='WELCOME BACK!'>
            <Form
                fields={[
                    {
                        field: TextField,
                        name: 'username',
                        label: 'Username',
                    },
                    {
                        field: PasswordInput,
                        name: 'password',
                        label: 'Password',
                        type: 'password',
                    }
                ]}
                buttonText='Login'
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                isLoading={loginIsLoading}
                buttonColor='secondary'
                canSubmit={canSubmit}
            />
            <Box textAlign='center' mt={4}>
                <Typography>You don’t have an account? <AuthLink onClick={() => navigate('/register')}>SIGN UP HERE</AuthLink></Typography>
            </Box>
        </AuthLayout>
    );
}

export default LoginContainer;
