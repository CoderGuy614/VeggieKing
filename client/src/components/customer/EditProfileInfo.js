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
                defaultValue={user.profile ? user.profile.phone : null}
                setEdit={setEdit}
                user={user}
              />
            ) : (
              <CurrentField
                type={"phone"}
                defaultValue={user.profile ? user.profile.phone : null}
                setEdit={setEdit}
              />
            )}

            {edit === "location" ? (
              <EditableField
                type={"location"}
                defaultValue={user.profile ? user.profile.location : null}
                setEdit={setEdit}
                user={user}
              />
            ) : (
              <CurrentField
                type={"location"}
                defaultValue={user.profile ? user.profile.location : null}
                setEdit={setEdit}
              />
            )}

            {edit === "deliveryNotes" ? (
              <EditableField
                type={"deliveryNotes"}
                defaultValue={user.profile ? user.profile.deliveryNotes : null}
                setEdit={setEdit}
                user={user}
              />
            ) : (
              <CurrentField
                type={"deliveryNotes"}
                defaultValue={user.profile ? user.profile.deliveryNotes : null}
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
