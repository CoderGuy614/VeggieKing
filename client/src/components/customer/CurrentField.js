import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ListItemText from "@material-ui/core/ListItemText";

const CurrentField = ({ setEdit, type, defaultValue, user }) => {
  return (
    <ListItem>
      <ListItemText primary="Name" secondary={defaultValue} />
      <ListItemSecondaryAction>
        <IconButton
          style={{ marginTop: "20px" }}
          onClick={() => setEdit(type)}
          edge="end"
          aria-label="delete"
        >
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CurrentField;
