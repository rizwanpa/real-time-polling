import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import MainApp from "./components/MainApp";

function App() {
  return (
    <Provider store={store}>
      <MainApp></MainApp>
    </Provider>
  );
}

export default App;
