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
const SMS = ({ isOpen, onClose }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const handleSubmit = async () => {
    localStorage.setItem("number", `1${mobileNumber}`);
    axios.post(`${process.env.REACT_APP_API_URL}/sms`, null, {
      params: { phone: `1${mobileNumber}` },
    });
    onClose();
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SMS;
