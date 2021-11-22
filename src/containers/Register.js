import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout, { AuthLink } from '../layouts/AuthLayout';
import Form from '../components/Form';
import { signUp } from '../store/AuthenticationSlice';

export const validations = Yup.object().shape({
    username: Yup.string().required(),
    passwordFirst: Yup.string()
        .required().min(8).max(250)
        .label('Password'),
    password: Yup.string()
        .oneOf([Yup.ref('passwordFirst'), null], 'Passwords not match')
        .required()
        .label('Repeat password'),
});

const RegisterContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit, watch, formState: { errors } } = useForm({
            resolver: yupResolver(validations)
        });

    const usernameValue = watch('username');
    const passwordValue = watch('password');
    const canSubmit = Boolean(usernameValue) && Boolean(passwordValue);

    const registerIsLoading = useSelector(({ authenticationState: { registerIsLoading } }) => registerIsLoading);

    const onSubmit = ({ username, password }) => dispatch(signUp({ username, password }, navigate));

    return (
        <AuthLayout
            title='WELCOME TO THE BEST BOOK DATABASE!'
            subtitle='CREATE YOUR PROFILE'
        >
            <Form
                fields={[
                    {
                        name: 'username',
                        label: 'Username',
                    },
                    {
                        name: 'passwordFirst',
                        label: 'Password',
                        type: 'password',
                    },
                    {
                        name: 'password',
                        label: 'Repeat password',
                        type: 'password',
                    }
                ]}
                buttonText='Sign Up'
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                isLoading={registerIsLoading}
                canSubmit={canSubmit}
            />
            <Box textAlign='center' mt={4}>
                <Typography>You have an account? <AuthLink onClick={() => navigate('/login')}>LOG IN HERE</AuthLink></Typography>
            </Box>
        </AuthLayout>
    );
}

export default RegisterContainer;
