// SubmissionSuccessModal.jsx
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  Text,
} from "@chakra-ui/react";
import iconSubmitted from "../../Assets/icon_submitted.gif";

const SubmissionSuccessModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent textAlign="center">
        <ModalHeader>Application Submitted</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Image src={iconSubmitted} alt="Submitted" mx="auto" my={4} />
          <Text>Job Submitted. All the best!</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SubmissionSuccessModal;
