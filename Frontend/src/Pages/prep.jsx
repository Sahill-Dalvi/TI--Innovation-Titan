import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  Button,
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Divider,
  Grid,
  GridItem,
  Image,
  Collapse,
  useDisclosure,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import int from "../Assets/int.png";
import { useNavigate } from "react-router-dom";

const SkillFetcher = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
    }
  }, []);

  const fetchSkills = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const skillsOptions = {
      method: "POST",
      url: "https://job-description-generator1.p.rapidapi.com/generate/skills",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "145109d698msh151f854496c50dap103a7cjsnc5796c2f12d5",
        "X-RapidAPI-Host": "job-description-generator1.p.rapidapi.com",
      },
      data: new URLSearchParams({ title: jobTitle }),
    };

    try {
      const skillsResponse = await axios.request(skillsOptions);
      setSkills(skillsResponse.data.data);

      const skillsInfo = await Promise.all(
        skillsResponse.data.data.map(async (skill, index) => {
          const chatGPTOptions = {
            method: "POST",
            url: "https://open-ai-chatgpt.p.rapidapi.com/ask",
            headers: {
              "content-type": "application/json",
              "X-RapidAPI-Key":
                "145109d698msh151f854496c50dap103a7cjsnc5796c2f12d5",
              "X-RapidAPI-Host": "open-ai-chatgpt.p.rapidapi.com",
            },
            data: JSON.stringify({
              query: `For the skill ${skill}, can you provide resources, tips, and potential questions for interview preparation?`,
            }),
          };
          const chatGPTResponse = await axios.request(chatGPTOptions);
          return {
            skill: skill,
            info: chatGPTResponse.data.response
              .split("\n")
              .filter((line) => line),
            id: index,
          };
        })
      );

      setSkillsData(skillsInfo);
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  return (
    <Flex direction="column" align="center" justify="center" p={6}>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={6}
        w="full"
      >
        <GridItem w="100%">
          <Image
            src={int}
            alt="Interview Image"
            style={{
              maxWidth: "70%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <Box p={4} bg="gray.100" borderRadius="md" mt={4}>
            <Heading size="md" mb={2}>
              Key Aspects of Interviewing
            </Heading>
            <Text fontWeight="bold">Preparation:</Text>
            <Text>
              Research the company and role, practice common interview
              questions, and prepare thoughtful questions to ask the
              interviewer.
            </Text>
            <Text fontWeight="bold" mt={2}>
              Presentation:
            </Text>
            <Text>
              Dress appropriately, maintain positive body language, and
              communicate clearly and confidently.
            </Text>
          </Box>
        </GridItem>

        <GridItem w="100%">
          <Box
            borderWidth="1px"
            borderRadius="lg"
            w="full"
            p={6}
            bg="white"
            boxShadow="0 4px 20px 0 rgba(0, 0, 0, 0.15), 0 6px 6px rgba(0, 0, 0, 0.1)"
            transform="translateY(-20px)"
            style={{ marginTop: "8%" }}
          >
            <Heading mb={4}>Interview Prep - Skill Fetcher</Heading>
            <form onSubmit={fetchSkills}>
              <VStack spacing={4}>
                <Input
                  placeholder="Enter Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
                <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                  Fetch Skills
                </Button>
              </VStack>
              {error && (
                <Text color="red.500" mt={2}>
                  {error.message}
                </Text>
              )}
              <VStack align="start" mt={4}>
                {skills.map((skill, index) => (
                  <Text key={index}>{`${index + 1}. ${skill}`}</Text>
                ))}
              </VStack>
            </form>
          </Box>
        </GridItem>
      </Grid>

      <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={6} w="full">
        {skillsData.map(({ skill, info, id }) => (
          <GridItem key={id} w="100%">
            <SkillCard skill={skill} info={info} />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

const SkillCard = ({ skill, info }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const shouldHighlight = (line) => /:$/.test(line);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      boxShadow="sm"
      _hover={{ boxShadow: "md" }}
      bg="white"
      onClick={onOpen}
      cursor="pointer"
    >
      <Flex justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="bold" _hover={{ color: "blue.500" }}>
          {skill}
        </Text>
        <Badge colorScheme="blue" variant="solid" fontSize="0.8em">
          Details
        </Badge>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{skill}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {info.map((line, lineIndex) => {
              const textStyle = shouldHighlight(line)
                ? { fontWeight: "bold" }
                : {};
              return (
                <Text key={lineIndex} fontSize="sm" mt={2} style={textStyle}>
                  {line}
                </Text>
              );
            })}
          </ModalBody>
          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default SkillFetcher;
