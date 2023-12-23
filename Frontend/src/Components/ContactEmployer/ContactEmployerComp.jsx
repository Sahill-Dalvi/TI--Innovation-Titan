import { useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CONTACT_EMPLOYER } from "../../util/backendEndpoints";

export function ContactEmployerComp({ employerEmail }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { name, email, message } = formData;

    // Check if any field is empty before submitting
    if (!name || !email || !message) {
      // Display toast for empty fields
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return; // Prevent submission if any field is empty
    }

    try {
      const dataToSend = {
        ...formData,
        employerEmail: employerEmail,
      };

      const response = await axios.post(CONTACT_EMPLOYER, dataToSend);
      console.log("API Response:", response.data);
      onClose();

      toast({
        title: "Email Sent",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Ask the Employer
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact Employer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="1rem">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb="1rem">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb="1rem">
              <FormLabel>Message</FormLabel>
              <Textarea
                placeholder="What do you want to Ask?"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleSubmit} variant="solid" colorScheme="blue">
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
