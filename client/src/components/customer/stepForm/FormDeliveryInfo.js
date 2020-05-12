import React, { Component, Fragment } from "react";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import Container from "@material-ui/core/Container";
import RaisedButton from "material-ui/RaisedButton";

export class FormDeliveryInfo extends Component {
  continue = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { location, message, phone } = this.props.values;
      const res = await axios.post(
        "/api/profile",
        { location, message, phone },
        config
      );
      if (res) {
        this.props.nextStep();
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => console.log(error.msg));
      }
    }
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <Container>
          <TextField
            onChange={handleChange("location")}
            hintText="Enter Your location"
            floatingLabelText="location"
            defaultValue={values.location}
          />

          <TextField
            onChange={handleChange("phone")}
            hintText="Enter Your phone"
            floatingLabelText="phone"
            defaultValue={values.phone}
          />

          <TextField
            onChange={handleChange("message")}
            hintText="Enter Your message"
            floatingLabelText="message"
            defaultValue={values.message}
          />

          <RaisedButton
            onClick={this.continue}
            label="Continue"
            primary={true}
            style={styles.button}
          />
          {/* <RaisedButton
            onClick={this.back}
            label="Back"
            primary={false}
            style={styles.button}
          /> */}
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

export default FormDeliveryInfo;