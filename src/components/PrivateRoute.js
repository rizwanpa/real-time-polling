import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ component: Component, ...rest }) => {
    let accessToken = sessionStorage.getItem("accessToken");
    return(
    <Route {...rest} render={(props) => (
        (accessToken)
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )}

  export default PrivateRoute;