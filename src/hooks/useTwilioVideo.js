import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useTwilioVideo() {
  const { auth } = useContext(AuthContext);

  const [participants, setParticipants] = useState([]);
  const [roomName, setRoomName] = useState("myroom");

  useEffect(() => {
    async function getToken() {
      const endpoint = `${process.env.REACT_APP_API_URL}/video/token`;
      const { data } = await axios.post(endpoint, { identity: auth.name, room: roomName });
      setToken(data);
    }

    getToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };
    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) => prevParticipants.filter((p) => p !== participant));
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map((participant) => (
    <p key={participant.sid}>{participant.identity}</p>
  ));
}
