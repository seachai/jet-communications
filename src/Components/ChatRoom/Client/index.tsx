import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  Heading,
  Flex,
  Box,
  FormControl,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import { ArrowForwardIcon, Icon } from "@chakra-ui/icons";
import { FaVideo, FaSms } from "react-icons/fa";
import io from "socket.io-client";

import { useInput } from "../../../hooks";
import MessageList from "../MessageList";
import SMS from "../../SMS";
import VideoChat from "../../VideoChat";
import { AuthContext } from "../../../context/AuthContext";

const socket = io(process.env.PORT || process.env.ENDPOINT);

const ChatRoom = () => {
  const { auth, mode, storeMode } = useContext(AuthContext);
  const [message, setMessage, handleChange] = useInput();
  const [messageList, setMessageList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isVideoOpen, onVideoOpen, onVideoClose } = useDisclosure();

  useEffect(() => {
    socket.on("receive-chat", (msg) => {
      setMessageList((messageList) => [...messageList, msg]);
    });

    socket.on("receive-sms", (sms) => {
      setMessageList((messageList) => [...messageList, sms]);
      console.log({ sms });
    });
  }, []);

  useEffect(() => {
    if (mode !== "webchat") return;
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

  const sendSMS = () => {
    let mobileNumber = localStorage.getItem("number");
    axios.post(`${process.env.REACT_APP_API_URL}/sms`, {
      data: {
        message,
        phone: `1${mobileNumber}`,
      },
    });
  };

  const emitMessage = () => {
    switch (mode) {
      case "sms":
        sendSMS();
        let mobileNumber = localStorage.getItem("number");
        socket.emit("send-sms", { phone: mobileNumber, message });
        break;
      case "webchat":
        socket.emit("send-chat", { author: auth.name, message });
        break;
    }
  };

  return (
    <Flex height='800px' justifyContent='center'>
      <Box borderWidth={1} p={12} pb={4} boxShadow='lg'>
        <Heading>Chat</Heading>
        <Badge variant='outline'>{mode}</Badge>
        {mode === "sms" ? (
          <img
            src='https://media.giphy.com/media/2XskdWMBUY1yxD6Hcic/giphy.gif'
            style={{ height: "500px" }}
          />
        ) : (
          <>
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
          </>
        )}
        <Button
          onClick={onVideoOpen}
          mt={4}
          colorScheme='green'
          rightIcon={<Icon as={FaVideo} w={4} h={4} />}
        >
          {/* <Link to='/video-chat'>Video</Link> */}
          Video
        </Button>
        {isVideoOpen ? (
          <VideoChat isOpen={isVideoOpen} onClose={onVideoClose} storeMode={storeMode} />
        ) : (
          ""
        )}
        <Button
          mt={4}
          colorScheme='blue'
          rightIcon={<Icon as={FaSms} w={4} h={4} />}
          onClick={onOpen}
        >
          SMS
        </Button>
        {isOpen ? <SMS isOpen={isOpen} onClose={onClose} storeMode={storeMode} /> : ""}
      </Box>
    </Flex>
  );
};

export default ChatRoom;
