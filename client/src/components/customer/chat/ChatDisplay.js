import React, { Fragment } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";

const ChatDisplay = ({ messages, admins, user }) => {
  return (
    <Container style={{ maxHeight: "400px", overflowY: "auto" }}>
      <List>
        {messages.map((message) =>
          admins.includes(message.from) ? (
            <Box key={message._id}>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography style={{ float: "right", marginRight: "5px" }}>
                      {message.textContent}
                    </Typography>
                  }
                />

                <i
                  style={{ color: "#FFBA60", marginRight: "5px" }}
                  className="fas fa-crown"
                ></i>
              </ListItem>
            </Box>
          ) : (
            <Box key={message._id}>
              <ListItem>
                <i
                  style={{ color: "#0B72B9", marginRight: "10px" }}
                  className="fas fa-user"
                ></i>
                <Typography style={{ float: "left" }}>
                  {message.textContent}
                </Typography>
              </ListItem>
            </Box>
          )
        )}
      </List>
    </Container>
  );
};

export default ChatDisplay;
