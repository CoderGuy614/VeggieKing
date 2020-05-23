import React, { useState } from "react";
import { List } from "material-ui/List";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import theme from "../layout/Theme";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import CurrentField from "./CurrentField";
import EditableField from "./EditableField";

const EditProfileInfo = ({ user }) => {
  const [edit, setEdit] = useState(false);

  return (
    <MuiThemeProvider theme={theme}>
      <Container>
        <Paper>
          <Typography variant="h5">Profile Info</Typography>
          <List>
            {edit === "phone" ? (
              <EditableField
                type={"phone"}
                defaultValue={user.profile.phone}
                setEdit={setEdit}
                user={user}
              />
            ) : (
              <CurrentField
                type={"phone"}
                defaultValue={user.profile.phone}
                setEdit={setEdit}
              />
            )}

            {edit === "location" ? (
              <EditableField
                type={"location"}
                defaultValue={user.profile.location}
                setEdit={setEdit}
                user={user}
              />
            ) : (
              <CurrentField
                type={"location"}
                defaultValue={user.profile.location}
                setEdit={setEdit}
              />
            )}

            {edit === "deliveryNotes" ? (
              <EditableField
                type={"deliveryNotes"}
                defaultValue={user.profile.deliveryNotes}
                setEdit={setEdit}
                user={user}
              />
            ) : (
              <CurrentField
                type={"deliveryNotes"}
                defaultValue={user.profile.deliveryNotes}
                setEdit={setEdit}
              />
            )}
          </List>
        </Paper>
      </Container>
    </MuiThemeProvider>
  );
};

export default EditProfileInfo;
