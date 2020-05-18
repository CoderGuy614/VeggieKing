import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function SimpleBadge({ user, messages, clear }) {
  const classes = useStyles();
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const value =
      messages.filter((msg) => msg.to === user._id).length - user.messagesRead;
    setUnreadMessages(value);
  }, [messages, user]);

  return (
    <div className={classes.root}>
      <Badge badgeContent={clear ? 0 : unreadMessages} color="secondary">
        <MailIcon />
      </Badge>
    </div>
  );
}
