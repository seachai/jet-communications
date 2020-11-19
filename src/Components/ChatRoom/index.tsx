import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  Heading,
  Flex,
  Box,
  FormControl,
} from "@chakra-ui/react";
import { ArrowForwardIcon, Icon } from "@chakra-ui/icons";
import { FaVideo } from "react-icons/fa";
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
    socket.on("reply-message", (msg) => {
      setMessageList((messageList) => [...messageList, msg]);
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message) {
      emitMessage();
      setMessageList(() => [...messageList, { author: auth.name, message }]);
      setMessage("");
    }
  };

  const scrollToBottom = () => {
    const chat = document.querySelector("#chat-list");
    chat.scrollTop = chat.scrollHeight;
  };

  const emitMessage = () =>
    socket.emit("send-message", { author: auth.name, message });

  return (
    <Flex height='800px' justifyContent='center'>
      <Box borderWidth={1} p={12} pb={4} boxShadow='lg'>
        <Heading>Chat</Heading>
        <MessageList messageList={messageList} />
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
        <Button
          mt={4}
          colorScheme='blue'
          rightIcon={<Icon as={FaVideo} w={4} h={4} />}
        >
          <Link to='/video-chat'>Transfer to Video</Link>
        </Button>
      </Box>
    </Flex>
  );
};

export default ChatRoom;
