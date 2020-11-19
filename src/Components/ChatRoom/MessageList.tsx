import React, { useContext, forwardRef } from "react";
import { Flex } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import Message from "./Message";

const MessageList = forwardRef(({ messageList }, ref) => {
  const { auth } = useContext(AuthContext);

  return (
    <Flex
      height='100px'
      direction='column'
      style={{ listStyle: "none" }}
      overflowY='scroll'
      id='chat-list'
      ref={ref}
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
});

export default MessageList;
