import React, { Component } from "react";
import AuthContext from "../../../context/auth/authContext";

import { List, ListItem } from "material-ui/List";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

export class ShowProfile extends Component {
  state = this.props.finalData;
  static contextType = AuthContext;
  render() {
    const { profile } = this.state;
    const { user } = this.context;
    return (
      <Container>
        <Paper>
          <Typography variant="h5">Delivery Info</Typography>
          <List>
            <ListItem primaryText="Name" secondaryText={user.name} />
            <ListItem primaryText="Email" secondaryText={user.email} />
            <ListItem primaryText="Location" secondaryText={profile.location} />
            <ListItem primaryText="Phone" secondaryText={profile.phone} />
            <ListItem
              primaryText="Delivery Instructions"
              secondaryText={profile.deliveryNotes}
            />
          </List>

          <Button
            onClick={this.props.handleSubmitOrder}
            style={{ margin: "10px" }}
            variant="contained"
            color="primary"
          >
            {" "}
            Place Order{" "}
          </Button>

          <Button
            style={{ margin: "10px" }}
            color="secondary"
            variant="contained"
            onClick={this.props.handleEditProfile}
          >
            Edit Info
          </Button>
        </Paper>
      </Container>
    );
  }
}

export default ShowProfile;
