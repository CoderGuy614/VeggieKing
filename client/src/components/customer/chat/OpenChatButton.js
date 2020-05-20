import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import MessageContext from "../../../context/message/messageContext";
import Badge from "./Badge";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const OpenChatButton = ({ toggleOpen, buttonText, user, unread }) => {
  const classes = useStyles();
  const messageContext = useContext(MessageContext);
  const { clearNotifications } = messageContext;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const value = unread.filter((msg) => msg.to === user._id).length;
    setCount(value);
  }, [unread]);

  return (
    <div>
      <Button
        onClick={toggleOpen}
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        className={classes.button}
        startIcon={<Badge count={count} />}
      >
        {buttonText ? "Hide Messages" : "Open Messages"}
      </Button>
    </div>
  );
};
export default OpenChatButton;
