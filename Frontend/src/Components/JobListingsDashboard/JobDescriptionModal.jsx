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
import { ContactEmployerComp } from "../ContactEmployer/ContactEmployerComp";
const JobDescriptionModal = ({ isOpen, onClose, job, onApplyClick }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Job Description</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{job?.jobDescription}</ModalBody>
      {/* <ContactEmployerComp employerEmail={job?.empId} /> */}
      <ModalFooter>
        <ContactEmployerComp employerEmail={job?.empId} />

        <Button colorScheme="red" onClick={onApplyClick}>
          Apply
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default JobDescriptionModal;
