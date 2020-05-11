import React, { Component, Fragment } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import RaisedButton from "material-ui/RaisedButton";

export class FormUserDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <Typography variant="h5">
          {" "}
          Please Enter your delivery information to complete your order.
        </Typography>
        <Typography variant="body">
          {" "}
          <em>A confirmation email will be sent to your email address. </em>
        </Typography>
        <Container>
          <TextField
            onChange={handleChange("firstName")}
            hintText="Enter Your First Name"
            floatingLabelText="First Name"
            defaultValue={values.firstName}
          />

          <TextField
            onChange={handleChange("lastName")}
            hintText="Enter Your Last Name"
            floatingLabelText="Last Name"
            defaultValue={values.lastName}
          />

          <TextField
            onChange={handleChange("email")}
            hintText="Enter Your email address"
            floatingLabelText="email"
            defaultValue={values.email}
          />

          <RaisedButton
            onClick={this.continue}
            label="Continue"
            primary={true}
            style={styles.button}
          />
        </Container>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15,
  },
};

export default FormUserDetails;
