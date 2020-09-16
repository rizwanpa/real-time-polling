import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import MainApp from "./MainApp";

class Auth extends Component {
  state = {};
  render() {
    console.log("inside Auth props", this.props);
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/" component={MainApp} />
        </Switch>
      </Router>
    );
  }
}

export default Auth;