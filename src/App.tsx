import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, ButtonGroup  , Input} from "@chakra-ui/react";
import "./App.css";

import { AuthContext } from "./AuthProvider";

import io from 'socket.io-client';
const ENDPOINT = "http://127.0.0.1:3001";

function App() {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const [message, setMessage] = useState("");
  const socket = io(ENDPOINT);
  
  const handleLogin = () => {
    login("new auth");
    history.push("/admin");
  };
  
  const handleChange = (event) => {
    setMessage(event.target.value)
  }
  
  const emitMessage = () => {
    socket.emit("send-message", message);
    socket.on("reply-message", (msg) => console.log(msg));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    emitMessage();
    setMessage('');
  }

  return (
    <div className='App'>
      <h1>App Component</h1>
      <Button onClick={handleLogin} colorScheme='blue'>
        Login
      </Button>
      <form onSubmit={handleSubmit}>
        <Input type="text" placeholder={"Enter message"} value={message} onChange={handleChange} />
        <Button type="submit" colorScheme='blue'>Send message</Button>
      </form>
    </div>
  );
}

export default App;
