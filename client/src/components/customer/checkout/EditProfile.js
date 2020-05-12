import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import Container from "@material-ui/core/Container";
import RaisedButton from "material-ui/RaisedButton";

export class EditProfile extends Component {
  render() {
    const { values, handleChange, handleSubmit } = this.props;
    return (
      <MuiThemeProvider>
        <Container>
          <TextField
            onChange={handleChange("location")}
            hintText="Enter Your Location"
            floatingLabelText="location"
            defaultValue={values.location}
          />
          <TextField
            onChange={handleChange("phone")}
            hintText="Enter Your Phone Number"
            floatingLabelText="phone"
            defaultValue={values.phone}
          />
          <TextField
            onChange={handleChange("deliveryNotes")}
            hintText="Enter an Optional Delivery Instruction"
            floatingLabelText="Delivery Special Instruction"
            defaultValue={values.deliveryNotes}
          />
          <RaisedButton
            onClick={handleSubmit}
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
export default EditProfile;
