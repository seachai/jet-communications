import React, { useState } from "react";
import axios from 'axios';
import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
const SMS = ({ isOpen, onClose }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const handleSubmit = async () => {
    axios.post(`${process.env.REACT_APP_API_URL}/sms`,
      null, { params: { phone: `${1}mobileNumber` } }
    )
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Please enter your mobile number</ModalHeader>
        <ModalCloseButton autoFocus={false}/>
        <ModalBody>
          <form>
            <FormControl>
              <Input
                type='number'
                placeholder={"Mobile Number"}
                autoFocus={true}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => {
            handleSubmit();
            onClose();
          }}>
            Connect
          </Button>
          {/* <Button variant="ghost" onClick={onClose}>Close</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SMS;
