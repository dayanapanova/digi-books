import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    token: '',
}

export const AuthenticationSlice = createSlice({
    name: 'Authentication',
    initialState,
    reducers: {
        registerSuccess: (state) => {

        },
        loginSuccess: (state) => {

        },
        logoutSuccess: (state) => {

        }
    }
})

export const { registerSuccess, loginSuccess, logoutSuccess } = AuthenticationSlice.actions

export default AuthenticationSlice.reducer