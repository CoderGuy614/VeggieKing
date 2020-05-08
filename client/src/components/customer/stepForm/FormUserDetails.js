import React, { Component, Fragment } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
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
        <Fragment>
          <TextField
            onChange={handleChange("firstName")}
            hintText="Enter Your First Name"
            floatingLabelText="First Name"
            defaultValue={values.firstName}
          />
          <br />
          <TextField
            onChange={handleChange("lastName")}
            hintText="Enter Your Last Name"
            floatingLabelText="Last Name"
            defaultValue={values.lastName}
          />
          <br />
          <TextField
            onChange={handleChange("email")}
            hintText="Enter Your email address"
            floatingLabelText="email"
            defaultValue={values.email}
          />
          <br />
          <RaisedButton
            onClick={this.continue}
            label="Continue"
            primary={true}
            style={styles.button}
          />
        </Fragment>
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
