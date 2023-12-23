import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const ApplicationModal = ({ isOpen, onClose, resume, onSubmitApplication }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Application</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <p>Are you sure you want to submit your Application?</p>
        {resume && <img src={resume} alt="Resume" />}
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="green" onClick={onSubmitApplication}>
          Submit
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ApplicationModal;
