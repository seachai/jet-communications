import React, { useState } from "react";
import axios from "axios";
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
// POST /api/sms/1${number}
const SMS = ({ isOpen, onClose }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_URL}/sms`, null, {
      params: { phone: mobileNumber },
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Please enter your mobile number</ModalHeader>
        <ModalCloseButton autoFocus={false} />
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
          <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
            Connect
          </Button>
          {/* <Button variant="ghost" onClick={onClose}>Close</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SMS;
