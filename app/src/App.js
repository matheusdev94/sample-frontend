import "./App.css";
// import { Components } from "./Components/Components";
import { Components } from "./Components";
import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Components />
      </div>
    </Provider>
  );
}

export default App;
