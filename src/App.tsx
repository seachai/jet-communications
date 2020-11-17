import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input} from "@chakra-ui/react";
import "./App.css";

import { AuthContext } from "./AuthProvider";
import {useInput} from './hooks'

import io from 'socket.io-client';
const ENDPOINT = "http://127.0.0.1:3001";
const socket = io(ENDPOINT);

function App() {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const [message, setMessage, handleMessageChange] = useInput();
  
  useEffect(() => {
    socket.on("reply-message", (msg) => console.log(msg));
  }, [])
  
  const handleLogin = () => {
    login("new auth");
    history.push("/admin");
  };

  const emitMessage = () => socket.emit("send-message", message);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message) {
      emitMessage();
      setMessage('');
    }
  }

  return (
    <div className='App'>
      <h1>App Component</h1>
      <Button onClick={handleLogin} colorScheme='blue'>
        Login
      </Button>
      <form onSubmit={handleSubmit}>
        <Input type="text" placeholder={"Enter message"} value={message} onChange={handleMessageChange} />
        <Button type="submit" colorScheme='blue'>Send message</Button>
      </form>
    </div>
  );
}

export default App;
