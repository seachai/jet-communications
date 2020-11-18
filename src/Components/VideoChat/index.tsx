// @ts-nocheck
import React, { useState, useContext, useEffect } from "react";
import Video from "twilio-video";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function VideoChat() {
  const { auth } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [roomName, setRoomName] = useState(Date.now());

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
    Video.connect(token, {
      name: roomName,
    }).then((room) => {
      setRoomName(room);
      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoomName((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map((participant) => (
    <p key={participant.sid}>{participant.identity}</p>
  ));

  const handleLogout = () => {
    console.log("logging out");
    setToken(null);
  };

  return (
    <div className='room'>
      <h2>Room: {roomName}</h2>
      <button onClick={handleLogout}>Log out</button>
      <div className='local-participant'>
        {room ? <p key={room.localParticipant.sid}>{room.localParticipant.identity}</p> : ""}
      </div>
      <h3>Remote Participants</h3>
      <div className='remote-participants'>{remoteParticipants}</div>
    </div>
  );
}
