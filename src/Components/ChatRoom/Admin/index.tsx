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
import { AuthContext } from "../../../context/AuthContext";

const socket = io(process.env.PORT || process.env.ENDPOINT);

const AdminChatRoom = () => {
  const { auth, mode, storeMode } = useContext(AuthContext);
  const [message, setMessage, handleChange] = useInput();
  const [messageList, setMessageList] = useState([]);
  const [phone, setPhone] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("receive-chat", (msg) => {
      setMessageList((messageList) => [...messageList, msg]);
    });

    socket.on("receive-sms", (sms) => {
      setMessageList((messageList) => [...messageList, sms]);
      console.log({ sms });
    });

    socket.on("change-mode", ({ mode, phone }) => {
      storeMode(mode);
      setPhone(phone);
    });

    socket.on("receive-video", (data) => {
      storeMode("video");
      setRoom(data.room);
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

  // KEEP THIS
  const sendSMS = () => {
    let mobileNumber = localStorage.getItem("number");
    axios.post(`${process.env.REACT_APP_API_URL}/sms`, {
      data: {
        message,
        phone,
      },
    });
  };

  // KEEP THIS
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
        <Heading>Admin Dashboard</Heading>
        <Badge variant='outline'>{mode}</Badge>
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
      </Box>
    </Flex>
  );
};

export default AdminChatRoom;
