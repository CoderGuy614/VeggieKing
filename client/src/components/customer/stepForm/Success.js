import React, { Component, Fragment } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";

export class Confirm extends Component {
  continue = (e) => {
    e.preventDefault();
    //PROCESS FORM HERE
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    return (
      <MuiThemeProvider>
        <Fragment>
          <h1>Thank you for your submission</h1>
          <p className="">You will get an email with further instructions</p>
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
