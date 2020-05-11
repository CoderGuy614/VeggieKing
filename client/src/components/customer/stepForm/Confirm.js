import React, { Component } from "react";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { List, ListItem } from "material-ui/List";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ConfirmTable from "./ConfirmTable";
import Grid from "@material-ui/core/Grid";
import RaisedButton from "material-ui/RaisedButton";

export class Confirm extends Component {
  state = this.props.values;

  continue = async (e) => {
    e.preventDefault();

    let orderData = {};
    orderData.name = this.state.firstName;
    orderData.email = this.state.email;
    orderData.phone = this.state.phone;
    orderData.location = this.state.location;
    orderData.message = this.state.message;
    orderData.data = this.props.data;
    console.log(orderData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/orders", orderData, config);
    try {
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const {
      values: { firstName, lastName, email, location, phone, message },
    } = this.props;
    return (
      <MuiThemeProvider>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Container>
              <Typography variant="h5">Delivery Info</Typography>
              <List>
                <ListItem primaryText="First Name" secondaryText={firstName} />
                <ListItem primaryText="Last Name" secondaryText={lastName} />
                <ListItem primaryText="Email" secondaryText={email} />
                <ListItem primaryText="Location" secondaryText={location} />
                <ListItem primaryText="Phone" secondaryText={phone} />
                <ListItem primaryText="Message" secondaryText={message} />
              </List>

              <RaisedButton
                onClick={this.continue}
                label="Confirm and Submit"
                primary={true}
                style={styles.button}
              />
              <RaisedButton
                onClick={this.back}
                label="Back"
                primary={false}
                style={styles.button}
              />
            </Container>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5">Your Order Details:</Typography>
            <ConfirmTable data={this.props.data} />
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15,
  },
};

export default Confirm;
