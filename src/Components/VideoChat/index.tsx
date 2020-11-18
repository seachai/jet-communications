// @ts-nocheck
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import { leaveRoom } from "../../hooks/useTwilioVideo";

const VideoChat = ({ roomID }) => {
  const { auth } = useContext(AuthContext);
  const [room, setRoom] = useState(null);
  const [token, setToken] = useState(null);
  const [participants, setParticipants] = useState([]);
  const videoRef = useRef();

  // Helper to get a token
  const getParticipantToken = async ({ identity, room }) => {
    console.log("participant token");
    const { data } = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/video/token`,
      data: { identity, room },
    });

    setToken(data);
    return data;
  };

  const remoteParticipants = participants.map((participant) => (
    <p key={participant.sid}>{participant.identity}</p>
  ));

  // Get the token on initial render
  useEffect(() => {
    console.log("getting token");
    async function fn() {
      return await getParticipantToken({ identity: "James", room });
    }
    const result = fn();
    console.log({ result });
  }, []);

  // Create the room
  useEffect(() => {
    if (!token) return;

    async function fn() {
      return await window.Twilio.Video.connect(token, {
        name: "Support Room",
        audio: true,
        video: { width: 640 },
        logLevel: "info",
      });
    }

    fn().then(async (res) => {
      const localTrack = await window.Twilio.Video.createLocalVideoTrack().catch((error) => {
        console.error(`Unable to create local tracks: ${error.message}`);
      });

      // Attach the local video if it’s not already visible.
      if (!videoRef.current.hasChildNodes()) {
        const localEl = localTrack.attach();
        localEl.className = "local-video";

        videoRef.current.appendChild(localEl);
      }

      // Add a window listener to disconnect if the tab is closed. This works
      // around a looooong lag before Twilio catches that the video is gone.
      window.addEventListener("beforeunload", leaveRoom);
    });

    return () => {
      window.removeEventListener("beforeunload", leaveRoom);
    };
  }, [token]);

  return (
    <>
      <div>
        <p>Username: {auth.name}</p>
        <p>Room name:</p>
        <p>Token: {token}</p>
      </div>
      <hr />
      <div className='local-participant'>
        {room ? <p key={room.localParticipant.sid}>{room.localParticipant.identity}</p> : ""}
      </div>
      <h3>Remote Participants</h3>
      <div className='remote-participants'>{remoteParticipants}</div>
      <div className='chat' ref={videoRef} />
    </>
  );
};

export default VideoChat;
