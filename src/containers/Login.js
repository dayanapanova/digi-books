import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Box, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from '../layouts/AuthLayout';
import Form from '../components/Form';
import { signIn } from '../store/AuthenticationSlice';

export const validations = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string()
        .required().min(8).max(250)
        .label('Password'),
});

const LoginContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validations)
    });

    const {
        loginIsLoading,
        isAuthenticated,
    } = useSelector(({ authenticationState }) => authenticationState);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const onSubmit = ({ username, password }) => dispatch(signIn({ username, password }));

    return (
        <AuthLayout title='WELCOME BACK!'>
            <Form
                fields={[
                    {
                        name: 'username',
                        label: 'Username',
                    },
                    {
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
            />
            <Box textAlign='center' mt={4}>
                <Typography>You don’t have an account? <Link onClick={() => navigate('/register')}>SIGN UP HERE</Link></Typography>
            </Box>
        </AuthLayout>
    );
}

export default LoginContainer;
