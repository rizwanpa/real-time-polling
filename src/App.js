import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Auth from "./components/Auth";

function App() {
  return (
    <Provider store={store}>
      <Auth></Auth>
    </Provider>
  );
}

export default App;
