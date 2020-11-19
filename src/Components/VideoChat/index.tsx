// @ts-nocheck
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import { leaveRoom } from "../../hooks/useTwilioVideo";

const VideoChat = () => {
  const { auth } = useContext(AuthContext);
  const [room, setRoom] = useState(null);
  const [token, setToken] = useState(null);
  const [participants, setParticipants] = useState([]);
  const localVidRef = useRef();
  const remoteVidRef = useRef();

  // Get a token on the initial render
  useEffect(() => {
    getParticipantToken({ identity: auth.name, room: "Support Room" });
  }, []);

  useEffect(() => {
    window.Twilio.Video.connect(token, { video: true, audio: true, name: "Support Room" }).then(
      (room) => {
        // Attach the local video
        window.Twilio.Video.createLocalVideoTrack().then((track) => {
          localVidRef.current.appendChild(track.attach());
        });

        const addParticipant = (participant) => {
          console.log("new participant!");
          console.log(participant);
          participant.tracks.forEach((publication) => {
            if (publication.isSubscribed) {
              const track = publication.track;

              remoteVidRef.current.appendChild(track.attach());
              console.log("attached to remote video");
            }
          });

          participant.on("trackSubscribed", (track) => {
            console.log("track subscribed");
            remoteVidRef.current.appendChild(track.attach());
          });
        };

        room.participants.forEach(addParticipant);
        room.on("participantConnected", addParticipant);
      }
    );
  }, [token]);

  // Helper to get a token
  const getParticipantToken = async ({ identity, room }) => {
    const { data } = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/video/token`,
      data: { identity, room },
    });
    setToken(data);
    console.log({ data });
    // await createRoom(data);
  };

  // const createRoom = async (token) => {
  //   const twilioConnection = await window.Twilio.Video.connect(token, {
  //     name: "Support Room",
  //     audio: true,
  //     video: { width: 640 },
  //     logLevel: "info",
  //   });
  //   console.log({ twilioConnection });
  //   setRoom(() => twilioConnection);

  //   twilioConnection.on("participantConnected", (participant) => {
  //     console.log(`Participant "${participant.identity}" connected`);
  //     setParticipants((prevParticipants) => [...prevParticipants, participant]);
  //     participant.tracks.forEach((publication) => {
  //       if (publication.isSubscribed) {
  //         const track = publication.track;
  //         console.log({ track });
  //         remoteVidRef.current.appendChild(track.attach());
  //       }
  //     });

  //     participant.on("trackSubscribed", (track) => {
  //       remoteVidRef.current.appendChild(track.attach());
  //     });

  //     twilioConnection.participants.forEach(addParticipant);
  //   });
  //   await createLocalTrackVideo();
  // };

  // const createLocalTrackVideo = async () => {
  //   const localTrack = await window.Twilio.Video.createLocalVideoTrack().catch((error) => {
  //     console.error(`Unable to create local tracks: ${error.message}`);
  //   });

  //   // Attach the local video if it’s not already visible.
  //   if (!localVidRef.current.hasChildNodes()) {
  //     const localEl = localTrack.attach();
  //     localEl.className = "local-video";
  //     localVidRef.current.appendChild(localEl);
  //   }
  // };

  return (
    <>
      <div>
        <p>Username: {auth.name}</p>
        <p>Room name:</p>
        <p>Token: {token}</p>
      </div>
      <hr />
      <div className='local-participant'></div>
      <h3>Remote Participants</h3>
      <div className='remote-participants'>{participants}</div>
      <div ref={localVidRef} />
      <div ref={remoteVidRef} />
    </>
  );
};

export default VideoChat;
