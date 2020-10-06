import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'
import {API_SERVER} from './constants/appConfig';
//We import our QR code loader
import { applyPolyfills, defineCustomElements }
  from '@deckdeckgo/qrcode/dist/loader';

axios.defaults.baseURL = API_SERVER;

axios.interceptors.request.use(request => {
  // Edit request config
  return request;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  // Edit response config
  return response;
}, error => {
  if(error.response.status === 401 || error.response.status === 403){
    sessionStorage.removeItem('accessToken');
    window.location = "/login";
  }
  return Promise.reject(error);
});

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
// We load our component
applyPolyfills().then(() => {
  defineCustomElements(window);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
