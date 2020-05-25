import React, { useState, useContext } from "react";
import TextField from "material-ui/TextField";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";

const EditableField = ({ setEdit, defaultValue, type, user }) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { editUser, editProfile } = authContext;
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
              if (type === "name" || type === "email") {
                if (value === "") {
                  return setAlert("Field must not be left blank", "danger");
                }
                editUser(type, value, user._id);
              } else {
                if (type !== "deliveryNotes" && value === "") {
                  return setAlert("Field must not be left blank", "danger");
                }
                editProfile(type, value, user.profile._id);
              }

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
