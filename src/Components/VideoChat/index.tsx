// @ts-nocheck
import React, { useState, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import Lobby from "./Lobby";

export default function VideoChat() {
  const auth = useContext(AuthContext);
  const [roomName, setRoomName] = useState("");
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      const endpoint = `${process.env.REACT_APP_API_URL}/video/token`;
      event.preventDefault();
      const data = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          identity: username,
          room: roomName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setToken(data.token);
    },
    [username, roomName]
  );

  const handleLogout = useCallback((event) => {
    setToken(null);
  }, []);

  return (
    <div>
      <h1>VideoChat Room</h1>
    </div>
  );
}
