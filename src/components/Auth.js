import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import MainApp from "./MainApp";

class Auth extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={MainApp} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default Auth;
