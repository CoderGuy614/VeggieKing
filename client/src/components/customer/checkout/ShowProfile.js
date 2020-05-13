import React, { Component } from "react";
import AuthContext from "../../../context/auth/authContext";
import { List, ListItem } from "material-ui/List";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import RaisedButton from "material-ui/RaisedButton";

export class ShowProfile extends Component {
  state = this.props.finalData;
  static contextType = AuthContext;
  render() {
    const { profile } = this.state;
    const { user } = this.context;
    return (
      <Container>
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

        <RaisedButton
          onClick={this.props.handleSubmitOrder}
          label="Confirm and Submit"
          primary={true}
          style={styles.button}
        />
        <RaisedButton
          onClick={this.props.handleEditProfile}
          label="Edit Info"
          secondary={true}
          style={styles.button}
        />
      </Container>
    );
  }
}

const styles = {
  button: {
    margin: 10,
  },
};
export default ShowProfile;
