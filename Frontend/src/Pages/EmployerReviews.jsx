import React, { useState, useEffect } from "react";
import { Image, Box, Heading, Text, Flex } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { GET_REVIEW_EMPLOYER, GET_REVIEWS } from "../util/backendEndpoints";
import Review from "../Assets/Review.svg";
import Spinner from "../util/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const EmployerReviews = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [employers, setEmployers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
    }
    fetchEmployers();
  }, []);

  const fetchEmployers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(GET_REVIEW_EMPLOYER);
      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      for (let employer of data) {
        const response2 = await fetch(
          GET_REVIEWS + "/" + employer["employerName"]
        );
        if (!response2.ok) {
          setIsLoading(false);
          throw new Error(`HTTP error! status: ${response2.status}`);
        }
        const data2 = await response2.json();
        employer["reviews"] = data2;
      }

      setEmployers(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetching employers failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Flex align="center" mb={4} ml={50}>
        <Image src={Review} alt="Review Icon" boxSize="180px" mr={2} />
        <Heading as="h1" fontSize="5xl">
          Employer Reviews
        </Heading>
      </Flex>
      {isLoading ? (
        <Spinner />
      ) : (
        <Accordion defaultIndex={[0]} allowMultiple>
          {employers.map((employer, index) => (
            <AccordionItem
              key={index}
              border="1px"
              borderColor="gray.300"
              borderRadius="md"
              mb={4}
              mx={10}
            >
              <AccordionButton
                bg="#00BFA6"
                color="black"
                _hover={{ bg: "#EADCE4" }}
                borderRadius="md"
              >
                <Box flex="50" textAlign="left" pl={4}>
                  <Heading as="h2" fontSize="xl">
                    {employer["employerName"]}
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} pl={8}>
                <ul>
                  {employer["reviews"].map((review, index2) => (
                    <li key={index2}>
                      <Text>"{review}"</Text>
                    </li>
                  ))}
                </ul>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </Box>
  );
};

export default EmployerReviews;
