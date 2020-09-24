import jwt from 'jwt-decode';
import {login} from './../utills/utills';
import {API_SERVER} from './../constants/appConfig';
/* 
action type
*/
export const SET_SESSION = 'SET_SESSION';
export const SET_SESSION_EXPIRED = 'SET_SESSION_EXPIRED';
export const RESET_SECURITY = 'RESET_SECURITY';
export const PROLONG_SESSION = 'PROLONG_SESSION';

/* 
action creators
*/

export const setSecurityAction = data =>{
    return { type: SET_SESSION, data}
}
export const setSessionExpiredAction = data =>{
    return { type: SET_SESSION_EXPIRED, data}
}
export const resetSecurityAction = () =>{
    return { type: RESET_SECURITY}
}
export const prolongSessionAction = (data) =>{
    return { type: PROLONG_SESSION, data}
}

export const setSecurity = (data) => {
    return async (dispatch) => {
        //API call
        let userDetails = await login(`/login`,data);
        let accessToken = (userDetails !== undefined && userDetails.data !==  undefined && userDetails.data.accessToken !==  undefined ) ? userDetails.data.accessToken : '';
        
        sessionStorage.setItem('accessToken', accessToken);
        let user = accessToken !== '' ? jwt(accessToken): {};
        console.log('setSecurity user Action--->',user);
        dispatch(setSecurityAction(user));
    }
}

export const prolongSession = (data) => {
    return (dispatch) => {
        //API call
        const user = {id:1234,name:'admin',email:'admin@example.com', jwt: 'dbnHKWfkhgFXAshcCs5AZ7HUe0dAzDg5DtZZIgn0ZzIUP8CL4h',role:['admin']}
        dispatch(prolongSessionAction(user));
    }
}