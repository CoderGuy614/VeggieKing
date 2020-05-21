import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";

import Typography from "@material-ui/core/Typography";
import CustomerProfileExpPanel from "./CustomerProfileExpPanel";

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

export default function CustomerProfileList({ users }) {
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

  const getMessages = async () => {
    try {
      const res = await axios.get("/api/messages");
      if (res) {
        setMessages(res.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const [admins, setAdmins] = useState([]);
  const [messages, setMessages] = useState([]);
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
        <Typography variant="h6">Customer List</Typography>
        <List className={classes.root}>
          {users.map((user) => {
            return (
              <CustomerProfileExpPanel
                className={classes.expPanel}
                key={user._id}
                handleNewMessage={handleNewMessage}
                user={user}
                admins={admins}
                messages={messages.filter(
                  (message) =>
                    message.to === user._id || message.from === user._id
                )}
              />
            );
          })}
        </List>
      </Paper>
    </Container>
  );
}
