import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const ChatInput = ({ message, handleChange }) => {
  const classes = useStyles();
  return (
    <TextField
      value={message}
      onChange={handleChange}
      style={{ width: "95%" }}
      className={classes.margin}
      id="input-with-icon-textfield"
      label="Message"
      placeholder="Send a Message"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <i className="fas fa-user"></i>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ChatInput;
