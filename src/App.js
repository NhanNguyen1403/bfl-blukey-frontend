import React from "react";
import {Provider} from "react-redux";
import store from "./redux/store"

import './App.scss';
import Login from "./pages/Login/Login";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Login />
      </div>
    </Provider>
  );
}

export default App;
