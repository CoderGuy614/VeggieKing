import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserForm } from "./components/stepForm/UserForm";
import Products from "./components/Products";
import Navbar from "./components/Navbar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/checkout" component={UserForm} />
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
