import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { ConnectedRouter} from 'connected-react-router';
import store, { history } from "./store";
import "./App.css";
import MainApp from "./components/MainApp";

function App() {
  return (
    <Provider store={store}>
    <ConnectedRouter history={history}>
    <Switch>
      <Route exact path='/' component={MainApp} />
      <Route exact path='/home' component={MainApp} />
      <Route exact path='/create-poll' component={MainApp} />
      <Route exact path='/list-poll' component={MainApp} />
    </Switch>
    </ConnectedRouter>
    </Provider>
  );
}

export default App;
