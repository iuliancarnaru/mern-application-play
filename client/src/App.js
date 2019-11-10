import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// bootstrap
import { Container } from "reactstrap";

// redux
import { Provider } from "react-redux";
import store from "./redux/store";

// components
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
