import React, { useContext } from "react";
import { Flex } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import Message from "./Message";

const MessageList = ({ messageList }) => {
  const { auth } = useContext(AuthContext);

  return (
    <Flex
      height='550px'
      direction='column'
      style={{ listStyle: "none" }}
      overflowY='scroll'
      id='chat-list'
    >
      {messageList.map((message) => (
        <Message
          key={Math.random()}
          author={message.author}
          message={message.message}
          username={auth.name}
          matched={auth.name === message.author}
        />
      ))}
    </Flex>
  );
};

export default MessageList;
