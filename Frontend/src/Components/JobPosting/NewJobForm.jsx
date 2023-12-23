import { useState } from "react";
import axios from "axios";
import {
  ADD_JOB_POSTING,
  TAGS,
  EDIT_JOB_POSTING,
} from "../../util/backendEndpoints";
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
  Box,
  Tag,
  TagLabel,
  TagRightIcon,
  VStack,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";

import { AddIcon, CloseIcon } from "@chakra-ui/icons";

export default function NewJobForm({ onSubmit, editMode, initialFormData }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(
    initialFormData || {
      name: "",
      companyName: "",
      hrName: "",
      jobDescription: "",
    }
  );

  const [tags, setTags] = useState(initialFormData?.tags || []);
  const [removedtags, setRemovedTags] = useState(
    TAGS.filter((tag) => !tags.includes(tag))
  );

  const [interviewerName1, updateInterviewerName1] = useState([
    initialFormData?.interviewerName[0] || "",
  ]);
  const [interviewerName2, updateInterviewerName2] = useState([
    initialFormData?.interviewerName[0] || "",
  ]);

  const [startTime, setStartTime] = useState(
    initialFormData?.timeSlotObj?.startTime
  );
  const [endTime, setEndTime] = useState(initialFormData?.timeSlotObj?.endTime);
  const [length, setLength] = useState(initialFormData?.timeSlotObj?.length);

  const handleInterviewerName1 = (e) => {
    updateInterviewerName1(e.target.value);
  };

  const handleInterviewerName2 = (e) => {
    updateInterviewerName2(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };

  const [currentStep, setCurrentStep] = useState(1);

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    setRemovedTags([...removedtags, tagToRemove]);
  };

  const handleAddTag = (tagToAdd) => {
    setRemovedTags(removedtags.filter((tag) => tag !== tagToAdd));
    setTags([...tags, tagToAdd]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function generateUniqueId(prefix = "J") {
    const timestamp = String(new Date().getTime()).slice(-8);
    const randomNumber = Math.floor(Math.random() * 100);

    return `${prefix}${timestamp}${randomNumber}`;
  }

  const handleSubmit = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");

      if (
        interviewerName1[0].trim() === "" ||
        interviewerName2[0].trim() === "" ||
        !startTime ||
        !endTime ||
        !length
      ) {
        toast({
          title: "Error",
          description: "Please fill out all required fields.",
          status: "error",
          isClosable: true,
        });
        return;
      }

      var jobId;

      if (initialFormData) {
        jobId = initialFormData.jobId;
      } else {
        jobId = generateUniqueId();
      }

      const dataToSend = {
        ...formData,
        jobId: jobId,
        tags: tags,
        empId: userEmail,
        interviewerName: [interviewerName1, interviewerName2],
        timeSlotObj: {
          startTime: startTime,
          endTime: endTime,
          length: length,
        },
      };

      if (editMode) {
        const response = await axios.post(
          EDIT_JOB_POSTING + `/${jobId}`,
          dataToSend
        );
        console.log("EDIT API Response:", response.data);
      } else {
        const response = await axios.post(ADD_JOB_POSTING, dataToSend);
        console.log("ADD API Response:", response.data);
      }

      onSubmit(dataToSend);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const nextStep = () => {
    if (
      !formData.name ||
      !formData.companyName ||
      !formData.hrName ||
      !formData.jobDescription
    ) {
      toast({
        title: "Error",
        description: "Please fill out all required fields.",
        status: "error",
        isClosable: true,
      });
      return;
    }

    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const steps = [
    {
      label: "Job Details",
      content: (
        <VStack align="stretch">
          <FormControl mb="1rem" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Job Title"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb="1rem" isRequired>
            <FormLabel>Company Name</FormLabel>
            <Input
              type="text"
              placeholder="Who are you?"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb="1rem" isRequired>
            <FormLabel>HR Name</FormLabel>
            <Input
              type="text"
              placeholder="Who to contact?"
              name="hrName"
              value={formData.hrName}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb="1rem" isRequired>
            <FormLabel>Job Description</FormLabel>
            <Textarea
              placeholder="Tell what they have to do.."
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb="1rem">
            <FormLabel>Tags</FormLabel>
            <Box>
              {tags.map((tag, index) => (
                <Tag
                  key={index}
                  size="md"
                  variant="outline"
                  colorScheme="blue"
                  mr={2}
                  mb={1}
                >
                  <TagLabel>{tag}</TagLabel>
                  <TagRightIcon
                    as={CloseIcon}
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Tag>
              ))}
            </Box>
            <Box mt={2}>
              {removedtags.map((tag, index) => (
                <Tag
                  key={index}
                  size="md"
                  variant="outline"
                  colorScheme="red"
                  mr={2}
                  mb={1}
                >
                  <TagLabel>{tag}</TagLabel>
                  <TagRightIcon
                    as={AddIcon}
                    onClick={() => handleAddTag(tag)}
                  />
                </Tag>
              ))}
            </Box>
          </FormControl>
        </VStack>
      ),
    },
    {
      label: "Interview Details",
      content: (
        <VStack align="stretch">
          <FormControl mb="1rem" isRequired>
            <FormLabel>First Interviewer Name</FormLabel>
            <Textarea
              placeholder="Who will ask questions"
              name="interviewerName1"
              value={interviewerName1}
              onChange={handleInterviewerName1}
              required
            />
          </FormControl>
          <FormControl mb="1rem" isRequired>
            <FormLabel>Second Interviewer Name</FormLabel>
            <Textarea
              placeholder="Who will ask more questions"
              name="interviewerName2"
              value={interviewerName2}
              onChange={handleInterviewerName2}
              required
            />
          </FormControl>
          <FormControl mb="1rem" isRequired>
            <FormLabel>Interviewer Avability</FormLabel>
            Check In Time
            <Input
              placeholder="When will Interviews start?"
              type="time"
              name="startTime"
              value={startTime}
              onChange={handleStartTimeChange}
              required
            />
          </FormControl>
          <FormControl mb="1rem" isRequired>
            Check Out Time
            <Input
              placeholder="When Interviews End"
              name="endTime"
              type="time"
              value={endTime}
              onChange={handleEndTimeChange}
              required
            />
          </FormControl>
          <FormControl mb="1rem" isRequired>
            <FormLabel>Duration of each interview (min)</FormLabel>
            <Input
              placeholder="How long will be the Interviews"
              name="length"
              type="number"
              value={length}
              onChange={handleLengthChange}
              required
            />
          </FormControl>
        </VStack>
      ),
    },
  ];

  return (
    <>
      {editMode ? (
        <Button
          onClick={onOpen}
          fontSize="xl"
          bg="blue.500"
          color="white"
          _hover={{
            bg: "blue.600",
          }}
        >
          Edit
        </Button>
      ) : (
        <Button
          onClick={onOpen}
          fontSize="xl"
          bg="blue.500"
          color="white"
          _hover={{
            bg: "blue.600",
          }}
          size="lg" // Set the size to large
        >
          Create Job
        </Button>
      )}

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{steps[currentStep - 1].label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{steps[currentStep - 1].content}</ModalBody>

          <ModalFooter>
            {currentStep !== 1 && (
              <Button colorScheme="blue" mr={3} onClick={prevStep}>
                Previous
              </Button>
            )}
            {currentStep !== steps.length && (
              <Button colorScheme="blue" onClick={nextStep}>
                Next
              </Button>
            )}
            {currentStep === steps.length && (
              <Button onClick={handleSubmit} variant="solid" colorScheme="blue">
                {editMode ? "Save Changes" : "Create Job Posting"}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
