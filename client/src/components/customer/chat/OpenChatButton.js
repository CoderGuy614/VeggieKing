import React, { useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import MessageContext from "../../../context/message/messageContext";
import Badge from "./Badge";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const OpenChatButton = ({ toggleOpen, buttonText, user }) => {
  const classes = useStyles();
  const messageContext = useContext(MessageContext);
  const { messages } = messageContext;
  let unread;
  useEffect(() => {
    calcUnread(messages);
  }, []);

  const calcUnread = (messages) =>
    (unread = messages
      .filter((msg) => msg.to === user._id)
      .reduce((a, b) => a + !b.seen, 0));
  console.log("unread", unread);
  console.log("UserID", user._id);

  return (
    <div>
      <Button
        onClick={toggleOpen}
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        className={classes.button}
        startIcon={<Badge count={unread} />}
      >
        {buttonText ? "Hide Messages" : "Open Messages"}
      </Button>
    </div>
  );
};
export default OpenChatButton;
