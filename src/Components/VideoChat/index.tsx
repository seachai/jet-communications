import React, { useState, useEffect } from "react";
import axios from "axios";

import useTwilioVideo from "../../hooks/useTwilioVideo";

const VideoChat = ({ roomID }) => {
  const initialRoom = "DailyStandup";
  const [token, setToken] = useState(null);
  const [room, setRoom] = useState(() => initialRoom);
  const {
    videoRef,
    activeRoom,
    startVideo,
    leaveRoom,
    // getParticipantToken,
  } = useTwilioVideo();

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

  // Get the token
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
        name: room,
        audio: true,
        video: { width: 640 },
        logLevel: "info",
      });
    }

    fn().then((activeRoom) => console.log({ activeRoom }));

    // if (!activeRoom) {
    //   startVideo();
    // }

    // Add a window listener to disconnect if the tab is closed. This works
    // around a looooong lag before Twilio catches that the video is gone.
    window.addEventListener("beforeunload", leaveRoom);

    return () => {
      window.removeEventListener("beforeunload", leaveRoom);
    };
  }, [token, roomID, activeRoom, startVideo, leaveRoom]);

  return (
    <>
      <h1>Room: “{roomID}”</h1>
      {activeRoom && (
        <button className='leave-room' onClick={leaveRoom}>
          Leave Room
        </button>
      )}
      <div className='chat' ref={videoRef} />
    </>
  );
};

export default VideoChat;
