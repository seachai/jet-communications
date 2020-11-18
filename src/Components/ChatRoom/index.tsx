import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Heading, Flex, Box, FormControl } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
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
        // maxWidth='1000px'
        // borderRadius={4}
        // textAlign='center'
        boxShadow='lg'
      >
        <Heading mb={4}>Chat</Heading>
        <MessageList messageList={messageList} />
        <FormControl>
          <form onSubmit={handleSubmit} style={{ display: "flex" }}>
            <Input type='text' placeholder={"Enter message"} value={message} onChange={handleChange} />
            <Button type='submit' colorScheme='blue' variant="outline" rightIcon={<ArrowForwardIcon w={4} h={4}/>}>
              Send
            </Button>
          </form>
        </FormControl>
        <Link to='/video-chat'>
          Transfer to Video
        </Link>
      </Box>
    </Flex>
  );
};

export default ChatRoom;
