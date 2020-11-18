import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Heading, Flex, Box } from "@chakra-ui/react";
import io from "socket.io-client";

import { useInput } from "../../hooks";
import MessageList from "./MessageList";
import { AuthContext } from "../../context/AuthContext";

const socket = io(process.env.ENDPOINT);

const ChatRoom = () => {
  const [message, setMessage, handleChange] = useInput();
  const [messageList, setMessageList] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    socket.on("reply-message", (msg) => setMessageList((messageList) => [...messageList, msg]));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message) {
      emitMessage();
      setMessageList([...messageList, { author: auth.name, message }]);
      setMessage("");
    }
  };

  const emitMessage = () => socket.emit("send-message", { author: auth.name, message });

  return (
    <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
      <Box 
        borderWidth={1}
        p={12}
        maxWidth='1000px'
        borderRadius={4}
        textAlign='center'
        boxShadow='lg'
      >
        <div className='ChatRoom'>
          <Heading>ChatRoom</Heading>
            <MessageList messageList={messageList} />
            <form onSubmit={handleSubmit}>
              <Input type='text' placeholder={"Enter message"} value={message} onChange={handleChange} />
              <Button type='submit' colorScheme='blue'>
                Send message
              </Button>
            </form>
            <Link to='/video-chat' colorScheme='blue'>
              Transfer to Video
            </Link>
        </div>
      </Box>
    </Flex>
  );
};

export default ChatRoom;
