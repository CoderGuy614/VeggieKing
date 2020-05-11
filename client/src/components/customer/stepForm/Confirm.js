import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { List, ListItem } from "material-ui/List";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ConfirmTable from "./ConfirmTable";
import Grid from "@material-ui/core/Grid";
import RaisedButton from "material-ui/RaisedButton";

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
            {/* <List>
              {this.props.data
                .filter((obj) => obj.qty > 0)
                .map((el) => (
                  <ListItem>
                    {el.name} {el.qty} {el.pricePer} {el.total}
                  </ListItem>
                ))}
            </List> */}
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
