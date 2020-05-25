import React from "react";
import { List, ListItem } from "material-ui/List";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const ShowProfile = ({ user, handleSubmitOrder, setEditProfile }) => {
  return (
    <Container>
      <Paper>
        <Typography variant="h5">Delivery Info</Typography>
        <List>
          <ListItem primaryText="Name" secondaryText={user.name} />
          <ListItem primaryText="Email" secondaryText={user.email} />
          <ListItem
            primaryText="Location"
            secondaryText={user.profile.location}
          />
          <ListItem primaryText="Phone" secondaryText={user.profile.phone} />
          <ListItem
            primaryText="Delivery Instructions"
            secondaryText={user.profile.deliveryNotes}
          />
        </List>

        <Button
          onClick={handleSubmitOrder}
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
          onClick={() => setEditProfile(true)}
        >
          Edit Info
        </Button>
      </Paper>
    </Container>
  );
};

export default ShowProfile;
