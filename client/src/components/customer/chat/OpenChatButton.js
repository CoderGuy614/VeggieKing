import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "./Badge";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function OpenChatButton({ toggleOpen, buttonText }) {
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
        startIcon={<Badge />}
      >
        {buttonText ? "Hide Messages" : "Open Messages"}
      </Button>
    </div>
  );
}
