import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";

import Typography from "@material-ui/core/Typography";
import CustomerChatExpPanel from "./CustomerChatExpPanel";
import MessageContext from "../../../context/message/messageContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "90%",
    marginTop: 40,
    padding: "0px",
    margin: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: "10px",
    textAlign: "center",
    justifyContent: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.common.arcOrange,
  },
  expPanel: {
    marginLeft: "20px",
  },
}));

export default function CustomerChatList({ users }) {
  const messageContext = useContext(MessageContext);
  const { getMessages, messages, unread } = messageContext;
  const getAdmins = async () => {
    try {
      const res = await axios.get("/api/users/admins");
      if (res) {
        setAdmins(res.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const [admins, setAdmins] = useState([]);
  const [newMessage, setNewMessage] = useState(false);

  useEffect(() => {
    getAdmins();
    getMessages();
    //eslint-disable-next-line
  }, [newMessage]);

  const handleNewMessage = () => {
    setNewMessage(!newMessage);
  };

  const classes = useStyles();

  return (
    <Container>
      <Paper className={classes.paper}>
        <Typography variant="h6">Customer Chats</Typography>
        <List className={classes.root}>
          {users
            .filter((user) => !user.isAdmin)
            .map((user) => {
              return (
                <CustomerChatExpPanel
                  className={classes.expPanel}
                  key={user.user._id}
                  handleNewMessage={handleNewMessage}
                  user={user}
                  admins={admins}
                  messages={messages.filter(
                    (message) =>
                      message.to === user.user._id ||
                      message.from === user.user._id
                  )}
                  unread={unread}
                />
              );
            })}
        </List>
      </Paper>
    </Container>
  );
}
