import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserForm } from "./components/customer/stepForm/UserForm";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Navbar from "./components/layout/Navbar";
import Admin from "./components/admin/Admin";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Fragment>
          <BrowserRouter>
            <Navbar />
            <Switch>
              <Route exact path="/checkout" component={UserForm} />
              <Route exact path="/" component={Admin} />
            </Switch>
          </BrowserRouter>
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
