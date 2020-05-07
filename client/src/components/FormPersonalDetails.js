import React, { Component, Fragment } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export class FormPersonalDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <Fragment>
          <AppBar title="Enter Personal Details" />
          <TextField
            onChange={handleChange("occupation")}
            hintText="Enter Your occupation"
            floatingLabelText="Occupation"
            defaultValue={values.occupation}
          />
          <br />
          <TextField
            onChange={handleChange("city")}
            hintText="Enter Your city"
            floatingLabelText="City"
            defaultValue={values.city}
          />
          <br />
          <TextField
            onChange={handleChange("bio")}
            hintText="Enter Your Bio"
            floatingLabelText="Bio"
            defaultValue={values.bio}
          />
          <br />
          <RaisedButton
            onClick={this.continue}
            label="Continue"
            primary={true}
            style={styles.button}
          />
          <RaisedButton
            onClick={this.back}
            label="Back"
            primary={false}
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

export default FormPersonalDetails;
