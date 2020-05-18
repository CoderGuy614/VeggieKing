import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "./Badge";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const OpenChatButton = ({ toggleOpen, buttonText, user, messages, clear }) => {
  const classes = useStyles();

  return (
    <div>
      <Button
        onClick={toggleOpen}
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        className={classes.button}
        startIcon={<Badge user={user} messages={messages} clear={clear} />}
      >
        {buttonText ? "Hide Messages" : "Open Messages"}
      </Button>
    </div>
  );
};
export default OpenChatButton;
