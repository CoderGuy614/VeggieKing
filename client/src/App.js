import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Customer from "./components/customer/Customer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layout/Alerts";
import PrivateRoute from "./components/routing/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/layout/Navbar";
import Admin from "./components/admin/Admin";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AuthState>
          <AlertState>
            <BrowserRouter>
              <Navbar />
              <Alerts />
              <Switch>
                <Route exact path="/" component={Customer} />
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
