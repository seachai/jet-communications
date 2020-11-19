// @ts-nocheck
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import io from "socket.io-client";

import { AuthContext } from "../../context/AuthContext";

const socket = io(process.env.PORT || process.env.ENDPOINT);

const VideoChat = ({ isOpen, onClose, storeMode }) => {
  const { auth } = useContext(AuthContext);
  const [room, setRoom] = useState(null);
  const [token, setToken] = useState(null);

  // Get a token on the initial render
  useEffect(() => {
    getParticipantToken({ identity: Date.now(), room: "Support Room" });
    socket.on("receive-chat", (msg) => {
      setMessageList((messageList) => [...messageList, msg]);
    });

    socket.on("receive-sms", (sms) => {
      setMessageList((messageList) => [...messageList, sms]);
      console.log({ sms });
    });
  }, []);

  // Helper to get a unique token for each user
  const getParticipantToken = async ({ identity, room }) => {
    const { data } = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/video/token`,
      data: { identity, room },
    });
    setToken(data);
    console.log({ data });
  };

  const VideoChat = ({ token, setRoom }) => {
    const localVidRef = useRef();
    const remoteVidRef = useRef();

    useEffect(() => {
      window.Twilio.Video.connect(token, { video: true, audio: true, name: "Support Room" }).then(
        (room) => {
          // Attach the local video
          setRoom(room);
          console.log({ room });
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

    return (
      <Flex>
        <div ref={localVidRef} />
        <div ref={remoteVidRef} />
      </Flex>
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          // Close the room
          axios.post("http://localhost:3001/api/video/complete", {
            room: room.sid,
          });
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Video Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VideoChat token={token} setRoom={setRoom} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VideoChat;
