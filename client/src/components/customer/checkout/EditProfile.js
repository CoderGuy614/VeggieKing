import React, { Component } from "react";
import TextField from "material-ui/TextField";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export class EditProfile extends Component {
  render() {
    const {
      values,
      handleChange,
      handleSubmitProfile,
      handleCancelEditProfile,
    } = this.props;
    return (
      <Paper>
        <Container>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange("location")}
                hintText="Enter Your Location"
                floatingLabelText="location"
                defaultValue={values.location}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange("phone")}
                hintText="Enter Your Phone Number"
                floatingLabelText="phone"
                defaultValue={values.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange("deliveryNotes")}
                hintText="Enter an Optional Delivery Instruction"
                floatingLabelText="Delivery Special Instruction"
                defaultValue={values.deliveryNotes}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ margin: "10px" }}
                onClick={handleSubmitProfile}
                variant="contained"
                color="primary"
              >
                Continue
              </Button>
              <Button
                style={{ margin: "10px" }}
                onClick={handleCancelEditProfile}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    );
  }
}

export default EditProfile;
