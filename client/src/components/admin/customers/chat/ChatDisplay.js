import React, { Fragment } from "react";
import Moment from "react-moment";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const ChatDisplay = ({ messages, admins }) => {
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
                  secondary={
                    <Typography style={{ float: "left" }} variant="caption">
                      <Moment format="LT">{message.date}</Moment>
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
                <ListItemText
                  primary={
                    <Typography style={{ float: "left" }}>
                      {message.textContent}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" style={{ float: "right" }}>
                      <Moment format="LT">{message.date}</Moment>
                    </Typography>
                  }
                />
              </ListItem>
            </Box>
          )
        )}
      </List>
    </Container>
  );
};

export default ChatDisplay;
