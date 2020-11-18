import React, { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import Message from "./Message";

const MessageList = ({ messageList }) => {
  const { auth } = useContext(AuthContext);

  return (
    <ul>
      {messageList.map((message) => (
        <Message key={Math.random()} name={message.author} message={message.message} />
      ))}
    </ul>
  );
};

export default MessageList;