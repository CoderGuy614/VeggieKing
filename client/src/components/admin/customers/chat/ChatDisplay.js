import React, { Fragment } from "react";
import Chat from "../../WebSocketChat/Chat";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const ChatDisplay = ({ messages, admins }) => {
  return (
    <List>
      {messages.map((message) =>
        admins.includes(message.from) ? (
          <ListItem key={message._id}>
            <ListItemIcon>
              <i className="fas fa-crown"></i>
            </ListItemIcon>
            <ListItemText primary={message.textContent} />
          </ListItem>
        ) : (
          <div key={message._id} style={{ float: "right" }}>
            <ListItem>
              <ListItemText primary={message.textContent} />
            </ListItem>
          </div>
        )
      )}
    </List>
  );
};

export default ChatDisplay;
