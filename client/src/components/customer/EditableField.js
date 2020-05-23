import React, { useState, useContext } from "react";
import axios from "axios";
import TextField from "material-ui/TextField";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";

import AuthContext from "../../context/auth/authContext";

const EditableField = ({ setEdit, defaultValue, type, user }) => {
  const authContext = useContext(AuthContext);
  const { editUser } = authContext;
  const [value, setValue] = useState(defaultValue);

  return (
    <div>
      <ListItem>
        <TextField
          onChange={(e) => setValue(e.target.value)}
          hintText={`Please Enter ${type}`}
          floatingLabelText={`${type}`}
          defaultValue={defaultValue}
        />
        <ListItemSecondaryAction>
          <IconButton
            style={{ marginTop: "20px" }}
            onClick={() => {
              editUser(type, value, user._id);
              setEdit(false);
            }}
            edge="end"
            aria-label="delete"
          >
            <SaveIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

export default EditableField;
