import React, { useState } from "react";
import { List } from "material-ui/List";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import theme from "../../layout/Theme";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import CurrentField from "./CurrentField";
import EditableField from "./EditableField";

const EditUserInfo = ({ user }) => {
  const [edit, setEdit] = useState(false);

  return (
    <MuiThemeProvider theme={theme}>
      <Container>
        <Paper>
          <Typography variant="h5">Account Info</Typography>
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
          </List>
        </Paper>
      </Container>
    </MuiThemeProvider>
  );
};

export default EditUserInfo;
