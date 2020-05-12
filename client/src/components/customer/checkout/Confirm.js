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

  componentDidMount() {
    if (this.props.profile) {
      this.setState({ profile: this.props.profile });
    }
    this.setState({ data: this.props.data });
  }

  continue = (e) => {
    console.log("CONTINUE");
  };

  render() {
    const { user } = this.context;
    return (
      <MuiThemeProvider>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Container>
              <Typography variant="h5">Delivery Info</Typography>
              <List>
                <ListItem primaryText="Name" secondaryText={""} />
                <ListItem primaryText="Email" secondaryText={""} />
                <ListItem primaryText="Location" secondaryText={""} />
                <ListItem primaryText="Phone" secondaryText={""} />
                <ListItem primaryText="Message" secondaryText={""} />
              </List>

              <RaisedButton
                onClick={this.continue}
                label="Confirm and Submit"
                primary={true}
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
