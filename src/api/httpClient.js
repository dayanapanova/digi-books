import axios from 'axios';
import { toast } from 'react-toastify';

const httpClient = axios.create({ baseURL: process.env.REACT_APP_API_URL });

httpClient.interceptors.request.use(async (config) => {
    const tokenStorage = localStorage.getItem('token') ?? '';

    config.headers = { ...(tokenStorage && { Authorization: `Bearer ${tokenStorage}` }) };

    return config;
},
    (error) => {
        Promise.reject(error);
    });

httpClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    const errorMessage = error?.response?.data?.error;
    if (errorMessage && typeof errorMessage === 'string') {
        toast.error(errorMessage);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default httpClient;
