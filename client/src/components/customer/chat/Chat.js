import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ChatDisplay from "./ChatDisplay";
import ChatInput from "./ChatInput";
import MessageContext from "../../../context/message/messageContext";

const Chat = ({ admins, user, handleNewMessage }) => {
  const messageContext = useContext(MessageContext);
  const { sendMessage, getMessages, messages } = messageContext;

  const [message, setMessage] = useState("");

  useEffect(() => {
    getMessages();
  }, []);

  const messageData = {
    to: admins[0],
    textContent: message,
    from: user._id,
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

  // const sendMessage = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const messageData = {};
  //     messageData.from = sender;
  //     messageData.to = admins[0];
  //     messageData.textContent = message;
  //     console.log("messageData", messageData);
  //     const res = await axios.post("/api/messages", messageData, config);
  //     if (res) {
  //       console.log(res.data);
  //       setMessage("");
  //       handleNewMessage();
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

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
