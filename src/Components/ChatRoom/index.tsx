import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  Heading,
  Flex,
  Box,
  FormControl,
} from "@chakra-ui/react";
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
  const ref = useRef();

  useEffect(() => {
    socket.on("reply-message", (msg) => {
      setMessageList((messageList) => [...messageList, msg]);
      scrollToBottom();
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message) {
      emitMessage();
      setMessageList(() => [...messageList, { author: auth.name, message }]);
      setMessage("");
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    // const chat = document.querySelector("#chat-list");
    // chat.scrollTop = chat.scrollHeight;
    ref.current.scrollTop = ref.current.scrollHeight;
  };

  const emitMessage = () =>
    socket.emit("send-message", { author: auth.name, message });

  return (
    <Flex height='300px' justifyContent='center'>
      <Box borderWidth={1} p={12} boxShadow='lg'>
        <Heading mb={4}>Chat</Heading>
        <MessageList messageList={messageList} ref={ref} />
        <FormControl width='800px'>
          <form onSubmit={handleSubmit} style={{ display: "flex" }}>
            <Input
              type='text'
              placeholder={"Enter message"}
              value={message}
              onChange={handleChange}
            />
            <Button
              ml='4'
              type='submit'
              colorScheme='blue'
              variant='outline'
              rightIcon={<ArrowForwardIcon w={4} h={4} />}
            >
              Send
            </Button>
          </form>
        </FormControl>
        <Link to='/video-chat'>Transfer to Video</Link>
      </Box>
    </Flex>
  );
};

export default ChatRoom;
