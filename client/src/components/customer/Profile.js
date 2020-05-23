import React, { useState } from "react";
import { List, ListItem } from "material-ui/List";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import theme from "../../components/layout/Theme";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import CurrentField from "./CurrentField";
import EditableField from "./EditableField";

const Profile = ({ user }) => {
  const [edit, setEdit] = useState(false);
  //   const [editEmail, setEditEmail] = useState(false);
  //   const [editLocation, setEditLocation] = useState(false);
  //   const [editPhone, setEditPhone] = useState(false);
  //   const [editDeliveryNotes, setEditDeliveryNotes] = useState(false);
  const deleteAccount = () => {
    console.log("ACCOUNT DELETED");
  };
  return (
    <MuiThemeProvider theme={theme}>
      <Container>
        <Paper>
          <Typography variant="h5">Profile Info</Typography>
          <List>
            {edit === "name" ? (
              <EditableField
                type={"name"}
                defaultValue={user.name}
                setEdit={setEdit}
                user={user}
              />
            ) : (
              <CurrentField
                type={"name"}
                defaultValue={user.name}
                setEdit={setEdit}
              />
            )}

            {edit === "email" ? (
              <EditableField
                type={"email"}
                defaultValue={user.email}
                setEdit={setEdit}
                user={user}
              />
            ) : (
              <CurrentField
                type={"email"}
                defaultValue={user.email}
                setEdit={setEdit}
              />
            )}

            {/* <ListItem primaryText="Email" secondaryText={user.email}>
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => setEditEmail(true)}
                  edge="end"
                  aria-label="delete"
                >
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem> */}
            {/* <ListItem
              primaryText="Location"
              secondaryText={user.profile.location}
            />
            <ListItem primaryText="Phone" secondaryText={user.profile.phone} />
            <ListItem
              primaryText="Delivery Instructions"
              secondaryText={user.profile.deliveryNotes}
            /> */}
          </List>
          <Button
            onClick={() => console.log("Edit info")}
            style={{ margin: "10px" }}
            variant="contained"
            color="primary"
          >
            {" "}
            Edit Info{" "}
          </Button>

          <Button
            style={{ margin: "10px" }}
            color="secondary"
            variant="contained"
            onClick={() => deleteAccount()}
          >
            Delete my account
          </Button>
        </Paper>
      </Container>
    </MuiThemeProvider>
  );
};

export default Profile;
