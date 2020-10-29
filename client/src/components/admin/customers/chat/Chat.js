import React, { Fragment, useState, useContext } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import ChatDisplay from "./ChatDisplay";
import ChatInput from "./ChatInput";
import AuthContext from "../../../../context/auth/authContext";

const Chat = ({ messages, admins, user, handleNewMessage }) => {
  const authContext = useContext(AuthContext);
  const sender = authContext.user._id;

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const messageData = {};
      messageData.from = sender;
      messageData.to = user._id;
      messageData.textContent = message;
      const res = await axios.post("/api/messages", messageData, config);
      if (res) {
        setMessage("");
        handleNewMessage();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <ChatDisplay messages={messages} admins={admins} />
      <ChatInput message={message} handleChange={handleChange} />
      <Button
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        color="secondary"
      >
        {" "}
        Send Message
      </Button>
    </Fragment>
  );
};

export default Chat;
