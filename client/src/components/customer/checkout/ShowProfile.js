import React, { Component, useContext, Fragment } from "react";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AuthContext from "../../../context/auth/authContext";
import { List, ListItem } from "material-ui/List";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ConfirmTable from "./ConfirmTable";
import Grid from "@material-ui/core/Grid";
import RaisedButton from "material-ui/RaisedButton";
const ShowProfile = () => {
  return (
    <Fragment>
      <Typography variant="h5">Delivery Info</Typography>
      <List>
        <ListItem primaryText="Name" secondaryText={""} />
        <ListItem primaryText="Email" secondaryText={""} />
        <ListItem primaryText="Location" secondaryText={""} />
        <ListItem primaryText="Phone" secondaryText={""} />
        <ListItem primaryText="Message" secondaryText={""} />
      </List>

      <RaisedButton
        // onClick={this.continue}
        label="Confirm and Submit"
        primary={true}
        // style={styles.button}
      />
    </Fragment>
  );
};

export default ShowProfile;
