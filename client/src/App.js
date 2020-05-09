import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Customer from "./components/customer/Customer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import PrivateRoute from "./components/routing/PrivateRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/layout/Navbar";
import Admin from "./components/admin/Admin";

import "./App.css";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AuthState>
          <AlertState>
            <BrowserRouter>
              <Navbar />
              <Switch>
                <Route exact path="/customer" component={Customer} />
                <PrivateRoute exact path="/admin" component={Admin} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </BrowserRouter>
          </AlertState>
        </AuthState>
      </MuiThemeProvider>
    );
  }
}

export default App;
