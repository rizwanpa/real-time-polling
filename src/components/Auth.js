import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import MainApp from "./MainApp";
import PrivateRoute from './PrivateRoute';
import Index from './submitpolls/Index';
import Thanks from './submitpolls/Thanks';

class Auth extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/submit-poll/:uuid?" component={Index}
          />
          <Route
            path="/thanks" component={Thanks}
          />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={MainApp} />
        </Switch>
      </Router>
    );
  }
}

export default Auth;
