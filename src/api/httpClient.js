import axios from 'axios';

const httpClient = axios.create({ baseURL: process.env.REACT_APP_API_URL });

httpClient.interceptors.request.use(async (config) => {
    const tokenStorage = localStorage.getItem('token') ?? '';

    config.headers = { ...(tokenStorage && { Authorization: `Bearer ${tokenStorage}` }) };

    return config;
},
    (error) => {
        Promise.reject(error);
    });

export default httpClient;
