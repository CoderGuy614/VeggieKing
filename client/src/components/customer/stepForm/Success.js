import React, { Component, Fragment } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Container from "@material-ui/core/Container";

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
        <Container>
          <h1>Thank you for your Order!</h1>
          <p className="">
            You will get an email confirmation and your delivery is on it's way!
          </p>
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
