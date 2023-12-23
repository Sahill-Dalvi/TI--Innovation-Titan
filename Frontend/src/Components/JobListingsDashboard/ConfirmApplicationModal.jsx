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
  Text,
} from "@chakra-ui/react";

const ConfirmApplicationModal = ({ isOpen, onClose, resume, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Your Application</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>
            Are you sure you want to submit your application with this resume?
          </Text>
          <Text fontWeight="bold">{resume}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onConfirm}>
            Yes, Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmApplicationModal;
