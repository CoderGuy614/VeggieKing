import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Container from "@material-ui/core/Container";

export class Success extends Component {
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

export default Success;
