// @ts-nocheck
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Lobby from "./Lobby";
import axios from "axios";

export default function VideoChat() {
  const { auth } = useContext(AuthContext);
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function getToken() {
      const endpoint = `${process.env.REACT_APP_API_URL}/video/token`;
      const { data } = await axios.post(endpoint, { identity: auth.name, room: Date.now() });

      setToken(data);
    }

    getToken();
  }, []);

  return (
    <div>
      <h1>VideoChat Room</h1>
    </div>
  );
}
