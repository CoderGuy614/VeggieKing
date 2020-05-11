import React, { Component, useContext } from "react";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AuthContext from "../../../context/auth/authContext";
import { List, ListItem } from "material-ui/List";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ConfirmTable from "./ConfirmTable";
import Grid from "@material-ui/core/Grid";
import RaisedButton from "material-ui/RaisedButton";

export class Confirm extends Component {
  static contextType = AuthContext;
  state = this.props.values;

  continue = async (e) => {
    e.preventDefault();
    const { user } = this.context;
    if (user) {
      const { location, message, phone } = this.state;
      const orderData = {};
      orderData.user = user;
      orderData.location = location;
      orderData.message = message;
      orderData.phone = phone;
      orderData.data = this.props.data;
      orderData.name = user.name;
      orderData.email = user.email;
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
    }
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const {
      values: { name, email, location, phone, message },
    } = this.props;
    const { user } = this.context;
    return (
      <MuiThemeProvider>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Container>
              <Typography variant="h5">Delivery Info</Typography>
              <List>
                <ListItem primaryText="Name" secondaryText={user.name} />
                <ListItem primaryText="Email" secondaryText={user.email} />
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
