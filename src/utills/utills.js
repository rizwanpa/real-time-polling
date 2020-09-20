import React from 'react';
import axios from 'axios';
import { getState } from 'redux-localstore';
import { push } from 'connected-react-router'
import _ from 'lodash';
import store from './../store';

export function login(url, params){
  let response = {
    data: {},
    error: {},
    errorCode: 0
  }
  return axios
  .post(url, params)
  .then(response=>{
    console.log('utils resposne');
    axios.defaults.headers.common['Authorization'] = response.data.accessToken;
    return response;
  })
  .catch(err=>{
    response.data = {};
      response.error = err;
      response.errorCode = 1;
      if (!_.isUndefined(err.response) && err.response.status === 401) {
        //store.dispatch(setSessionExpired(true));
        store.dispatch(push('/login'));
      }
      return (response);
  })
}

export function postData(url, params) {
  let accessToken = sessionStorage.getItem("accessToken");
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  let response = {
    data: {},
    error: {},
    errorCode: 0
  }
  return axios
    .post(url, params)
    .then((response) => {      
      return (response);
    })
    .catch((err) => {
      response.data = {};
      response.error = err;
      response.errorCode = 1;
      if (!_.isUndefined(err.response) && err.response.status === 401) {
        store.dispatch(push('/login'));
      }
      return (response);
    });
}

export function deleteData(url, params) {
  let accessToken = sessionStorage.getItem("accessToken");
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  let response = {
    data: {},
    error: {},
    errorCode: 0
  }
  return axios
    .delete(url,params)
    .then((response) => {      
      return (response);
    })
    .catch((err) => {
      response.data = {};
      response.error = err;
      response.errorCode = 1;
      if (!_.isUndefined(err.response) && err.response.status === 401) {
        //store.dispatch(setSessionExpired(true));
        store.dispatch(push('/login'));
      }
      return (response);
    });
}

export function getData(url) {
  axios.defaults.headers.common['Authorization'] = getState().user.jwt;
  let response = {
    data: {},
    error: {},
    errorCode: 0
  }

  return axios
    .get(`${url}`)
    .then(function (response) {
      return (response);
    })
    .catch((err) => {
      response.data = {};
      response.error = err;
      response.errorCode = 1;
      if (!_.isNil(err && err.response) && err.response.status === 401) {
        store.dispatch(push('/login'));
      }
      return (response);
    });
}
/* 
export function getData(url) {
  // store.dispatch(setLoadingState(true));
  axios.defaults.headers.common['Authorization'] = getState().user.jwt;
  let response = {
    data: {},
    error: {},
    errorCode: 0
  }

  return axios
    .get(`${url}`)
    .then(function (result) {
      //store.dispatch(setLoadingState(false));
      store.dispatch(prolongSession(result.config.headers.Authorization));
      // return (result.data||{}).response;
      response.data = result.data;
      response.errorCode = 0;
      response.error = {};
      if (!_.isNil(result.data.status) && result.data.status === 'SUBMITTED') {
        let notyData = {
          message: 'Submitted',
          description: 'Selected file is already submitted'
        }
        openNotificationWithIcon('info', notyData);
      }
      return (response);
    })
    .catch((err) => {
      response.data = {};
      response.error = err;
      response.errorCode = 1;
      if (!_.isNil(err && err.response) && err.response.status !== 401) {
        let notyData = {
          message: 'Error!',
          description: (
            <div>
              <p className='noti-des'>{!_.isNil(err.message) ? err.message : 'Request failed'}</p>
            </div>
          )
        }
        openNotificationWithIcon('error', notyData);
      }
      if (!_.isNil(err && err.response) && err.response.status === 401) {
        store.dispatch(setSessionExpired(true));
        store.dispatch(push('/login'));
      }
      return (response);
    });
}

export function submitFSLRecord(url, params) {
  let response = {
    data: {},
    error: {},
    errorCode: 0
  }
  return axios
    .put(url, params)
    .then((result) => {
      response.data = result.data;
      response.errorCode = 0;
      response.error = {};
      let notyData = {
        message: 'Updated',
        description: 'Selected records are updated successfully'
      }
      openNotificationWithIcon('success', notyData);
      return (response);
    })
    .catch((err) => {
      response.data = {};
      response.error = err;
      response.errorCode = 1;
      if (!_.isNil(err && err.response) && err.response.status !== 401) {
        let notyData = {
          message: 'Error!',
          description: (
            <div>
              <p className='noti-des'>{!_.isNil(err.message) ? err.message : 'Request failed'}</p>
            </div>
          )
        }
        openNotificationWithIcon('error', notyData);
      }
      if (!_.isUndefined(err.response) && err.response.status === 401) {
        store.dispatch(setSessionExpired(true));
        store.dispatch(push('/login'));
      }
      return (response);
    });
} */