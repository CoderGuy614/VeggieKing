import React, { useState, useContext } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ChatDisplay from "./ChatDisplay";
import ChatInput from "./ChatInput";
import MessageContext from "../../../context/message/messageContext";

const Chat = ({ admins, user }) => {
  const messageContext = useContext(MessageContext);
  const { sendMessage, messages } = messageContext;

  const [message, setMessage] = useState("");

  const messageData = {
    to: admins[0],
    textContent: message,
    from: user._id,
    date: Date.now(),
  };

  const filteredMessages = messages.filter(
    (message) => message.from === user._id || message.to === user._id
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(messageData);
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <Container>
      <Paper>
        <ChatDisplay messages={filteredMessages} admins={admins} user={user} />
        <ChatInput message={message} handleChange={handleChange} />
        <Button
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          color="primary"
        >
          {" "}
          Send Message
        </Button>
      </Paper>
    </Container>
  );
};

export default Chat;
