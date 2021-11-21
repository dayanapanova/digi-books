import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import httpClient from '../api/httpClient';

const localStorageToken = localStorage.getItem('token') ?? '';

const initialState = {
    isAuthenticated: Boolean(localStorageToken),
    token: localStorageToken,
    loginIsLoading: false,
    registerIsLoading: false,
};

export const AuthenticationSlice = createSlice({
    name: 'Authentication',
    initialState,
    reducers: {
        loginRequesting: (state) => {
            state.loginIsLoading = true;
        },
        loginSuccess: (state, { payload }) => {
            const token = payload?.data?.token;
            localStorage.setItem('token', token);
            state.isAuthenticated = true;
            state.loginIsLoading = false;
            toast.success('You have been logged in successfully!');
        },
        loginError: (state) => {
            state.loginIsLoading = false;
        },
        registerRequesting: (state) => {
            state.registerIsLoading = true;
        },
        registerSuccess: (state, { payload }) => {
            state.registerIsLoading = false;

            const successMessage = payload?.data?.message;

            if (successMessage) {
                toast.success(successMessage);
            }
        },
        registerError: (state) => {
            state.registerIsLoading = false;
        },
        logoutSuccess: (state, { payload }) => {
            state.isAuthenticated = false;
            state.token = '';
            localStorage.removeItem('token');

            const successMessage = payload?.data?.message;

            if (successMessage) {
                toast.success(successMessage);
            }
        }
    }
});

export const {
    loginRequesting,
    loginSuccess,
    loginError,
    registerRequesting,
    registerSuccess,
    registerError,
    logoutSuccess,
} = AuthenticationSlice.actions;

export const signIn = (data) => async (dispatch) => {
    dispatch(loginRequesting());
    httpClient.post('/user/login', data).then(
        (response) => dispatch(loginSuccess(response)),
        (error) => dispatch(loginError(error)),
    )
};

export const signUp = (data, navigate) => async (dispatch) => {
    dispatch(registerRequesting());
    httpClient.post('/user/register', data).then(
        (response) => {
            dispatch(registerSuccess(response));
            if (navigate) {
                navigate('/login');
            }
        },
        (error) => dispatch(registerError(error)),
    )
};

export const logout = (data) => async (dispatch) => {
    httpClient.post('/user/logout', data).then(
        (response) => dispatch(logoutSuccess(response)),
    )
};


export default AuthenticationSlice.reducer;
