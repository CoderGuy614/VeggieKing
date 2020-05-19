import React, { useReducer } from "react";
import axios from "axios";
import MessageContext from "./messageContext";
import messageReducer from "./messageReducer";

import {
  GET_MESSAGES,
  GET_USER_MESSAGES,
  SEND_MESSAGE,
  MESSAGE_ERROR,
} from "../types";

const MessageState = (props) => {
  const initialState = {
    loading: true,
    messages: [],
    error: null,
  };

  const [state, dispatch] = useReducer(messageReducer, initialState);

  // Get all messages

  const getMessages = async () => {
    try {
      const res = await axios.get("/api/messages");
      dispatch({
        type: GET_MESSAGES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: MESSAGE_ERROR });
    }
  };

  const sendMessage = async (messageData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/messages", messageData, config);
      dispatch({
        type: SEND_MESSAGE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: MESSAGE_ERROR });
    }
  };

  return (
    <MessageContext.Provider
      value={{
        messages: state.messages,
        loading: state.loading,
        error: state.error,
        getMessages,
        sendMessage,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageState;
