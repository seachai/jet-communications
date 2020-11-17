import React, { useState, useEffect, useContext } from "react";
import { Button, Input} from "@chakra-ui/react";
import io from 'socket.io-client';

import { useInput } from '../../hooks'
import MessageList from './MessageList'
import { AuthContext } from "../../AuthProvider";

const socket = io(process.env.ENDPOINT);

const ChatRoom = () => {
  const [message, setMessage, handleChange] = useInput();
  const [messageList, setMessageList] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    socket.on("reply-message", (msg) => setMessageList(messageList => [...messageList, msg]));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message) {
      emitMessage();
      setMessageList([...messageList, { author: auth.name, message}])
      setMessage('');
    }
  }

  const emitMessage = () => socket.emit("send-message", { author: auth.name, message });

  return (
    <div className='ChatRoom'>
      <h1>ChatRoom</h1>
      <MessageList messageList={messageList}/>
      <form onSubmit={handleSubmit}>
        <Input type="text" placeholder={"Enter message"} value={message} onChange={handleChange} />
        <Button type="submit" colorScheme='blue'>Send message</Button>
      </form>
    </div>
  );
};

export default ChatRoom;
