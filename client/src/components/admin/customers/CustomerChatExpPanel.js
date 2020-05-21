import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Badge from "../../customer/chat/Badge";
import Chat from "./chat/Chat";

import AuthContext from "../../../context/auth/authContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "10px 12px",
    background: "#0B72B9",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function CustomerChatExpPanel({
  user,
  messages,
  admins,
  handleNewMessage,
  unread,
}) {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const authContext = useContext(AuthContext);
  const currentAdmin = authContext.user;

  useEffect(() => {
    const unreadMessages = unread.filter((msg) => msg.from === user._id);
    const value = unreadMessages.length;
    setCount(value);
  }, [unread]);

  const clearNotifications = async () => {
    setCount(0);
    try {
      const res = await axios.put(`/api/messages/seen/admin/${user._id}`);
      if (res) console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel onChange={clearNotifications}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ padding: "0px" }}
        >
          <Grid justify="center" container>
            <Grid item xs={12} sm={6}>
              <Badge count={count} />
              <Typography variant="body2">{user.name}</Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              <Chat
                messages={messages}
                admins={admins}
                user={user}
                handleNewMessage={handleNewMessage}
              />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
