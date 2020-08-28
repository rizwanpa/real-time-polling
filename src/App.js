import React from "react";
import { Provider } from "react-redux";
import store, { history } from "./store";
import "./App.css";
import MainApp from "./components/MainApp";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainApp></MainApp>
      </div>
    </Provider>
  );
}

export default App;
