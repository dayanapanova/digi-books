import React from 'react';
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import { store } from './store/index';
import App from './App';

toast.configure({ autoClose: 4000 });

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ReduxProvider store={store}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </ThemeProvider>,
  document.getElementById('root')
);


reportWebVitals();
