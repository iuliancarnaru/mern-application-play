import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// redux
import { Provider } from "react-redux";
import store from "./redux/store";

//bootstrap
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <ShoppingList />
      </div>
    </Provider>
  );
}

export default App;
