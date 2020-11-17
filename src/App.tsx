import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input } from "@chakra-ui/react";
import axios from "axios";
import "./App.css";

import { AuthContext } from "./context/AuthContext";
import { useInput } from "./hooks";

import io from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3001";
const socket = io(ENDPOINT);

function App() {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const [message, setMessage, handleMessageChange] = useInput();

  useEffect(() => {
    socket.on("reply-message", (msg) => console.log(msg));
  }, []);

  const handleLogin = () => {
    login("new auth");
    history.push("/admin");
  };

  const handleVideoChat = async () => {
    console.log("handling chat");
    console.log(process.env.REACT_APP_API_URL);
    const endpoint = `${process.env.REACT_APP_API_URL}/video-chat`;
    const { data } = await axios.post(endpoint);
    console.log({ data });
    history.push("/video-chat");
  };

  const emitMessage = () => socket.emit("send-message", message);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message) {
      emitMessage();
      setMessage("");
    }
  };

  return (
    <div className='App'>
      <h1>App Component</h1>
      <Button onClick={handleLogin} colorScheme='blue'>
        Login
      </Button>
      <Button onClick={handleVideoChat}>Start Video Chat</Button>
      <form onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder={"Enter message"}
          value={message}
          onChange={handleMessageChange}
        />
        <Button type='submit' colorScheme='blue'>
          Send message
        </Button>
      </form>
    </div>
  );
}

export default App;
