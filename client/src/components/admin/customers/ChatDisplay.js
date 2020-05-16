import React, { Fragment } from "react";

const ChatDisplay = ({ messages }) => {
  return (
    <ul>
      {messages.map((message) => (
        <Fragment>
          <li
            style={{
              alignContent: "left",
              alignItems: "left",
              float: "left",
            }}
          >
            <i className="fas fa-crown" style={{ fontSize: "24px" }}></i>{" "}
            {message.textContent}
          </li>
          <br />
        </Fragment>
      ))}
    </ul>
  );
};

export default ChatDisplay;
