import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Image,
  VStack,
} from "@chakra-ui/react";
// import { useMediaQuery } from 'react-responsive';
import UserFeedback from "../Assets/UserFeedback.svg";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const WebsiteFeedback = () => {
  const toast = useToast();
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // toast({
    //   title: "Feedback Submitted",
    //   description: "Thank you for your feedback!",
    //   status: "success",
    //   duration: 5000,
    //   isClosable: true,
    // });
    // Check if any field is empty
    if (!feedback.name || !feedback.email || !feedback.message) {
      toast({
        title: "Error",
        description: "All fields are required!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (feedback.name || feedback.email || feedback.message) {
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    return;
  }
  };

  return (
    <Flex
      justifyContent="space-around"
      minH="100vh"
      w="100%"
      justifyItems="center"
      mt="64px"
    >
      <Flex w="45%" justifyContent="center">
        <VStack spacing="4" order={[2, 2, 1]} mb="24px" mt="32px">
          <Box alignItems="center" p="4" borderWidth="1px" borderRadius="lg">
            <Heading mb="4">Give Feedback</Heading>
            <Input
              mb="2"
              type="text"
              placeholder="Your Name"
              name="name"
              value={feedback.name}
              onChange={handleChange}
            />
            <Input
              mb="2"
              type="email"
              placeholder="Your Email"
              name="email"
              value={feedback.email}
              onChange={handleChange}
            />
            <Textarea
              mb="4"
              placeholder="Your Feedback or Suggestions"
              name="message"
              value={feedback.message}
              onChange={handleChange}
            />
            <Button colorScheme="teal" onClick={handleSubmit}>
              Submit Feedback
            </Button>
          </Box>
        </VStack>
      </Flex>
      <Flex w="45%" justify="center">
        <Image
          src={UserFeedback}
          alt="Animated Woman with Power"
          boxSize="500px"
        />
      </Flex>
    </Flex>
  );
};

export default WebsiteFeedback;
