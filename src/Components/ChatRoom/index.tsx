import React, { useState, useContext } from "react";
import Admin from "./Admin";
import Client from "./Client";
import { AuthContext } from "../../context/AuthContext";

const ChatRoom = () => {
  const { auth } = useContext(AuthContext);

  return auth.token ? <Admin /> : <Client />;
};

export default ChatRoom;
