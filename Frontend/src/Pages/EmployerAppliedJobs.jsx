import React, { useState, useEffect } from "react";
import { Box, Heading, Button, Flex, Tooltip } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  APPLIED_JOBS,
  SHORTLIST_CANDIDATE,
  REJECT_SHORTLISTED_CANDIDATE,
  SELECT_SHORTLISTED_CANDIDATE,GET_TOOLKIT
} from "../util/backendEndpoints";
import { useNavigate } from "react-router-dom";

const EmployerAppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
    }
    // Fetch employers from the API
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const emailAddress = localStorage.getItem("userEmail");
    try {
      const response = await fetch(APPLIED_JOBS + "/" + emailAddress);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const uniqueData = Array.from(new Set(data.map((obj) => obj.jobId))).map(
        (jobId) => data.find((obj) => obj.jobId === jobId)
      );

      for (let job of uniqueData) {
        const response2 = await fetch(
          APPLIED_JOBS + "/" + emailAddress + "/" + job["jobId"]
        );
        if (!response2.ok) {
          throw new Error(`HTTP error! status: ${response2.status}`);
        }
        const data2 = await response2.json();
        job["applicants"] = data2;
      }

      setJobs(uniqueData);
    } catch (error) {
      console.error("Fetching employers failed:", error);
    }
  };

  const handleShortlist = async (jobId, candidateEmail) => {
    const emailAddress = localStorage.getItem("userEmail");
    try {
      const response = await fetch(
        SHORTLIST_CANDIDATE +
        "/" +
        emailAddress +
        "/" +
        jobId +
        "/" +
        candidateEmail,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to shortlist candidate.`);
      }

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.jobId === jobId
            ? {
              ...job,
              applicants: job.applicants.map((applicant) =>
                applicant.candidateEmail === candidateEmail
                  ? {
                    ...applicant,
                    isShortlisted: true,
                    status: "Shortlisted",
                  }
                  : applicant
              ),
            }
            : job
        )
      );

      // Show success toast
      toast({
        title: "Candidate Shortlisted!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error shortlisting candidate:", error);
    }
  };

  const handleReject = async (jobId, candidateEmail) => {
    const emailAddress = localStorage.getItem("userEmail");
    try {
      const response = await fetch(
        REJECT_SHORTLISTED_CANDIDATE +
        "/" +
        emailAddress +
        "/" +
        jobId +
        "/" +
        candidateEmail,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to reject candidate.`);
      }

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.jobId === jobId
            ? {
              ...job,
              applicants: job.applicants.map((applicant) =>
                applicant.candidateEmail === candidateEmail
                  ? { ...applicant, isShortlisted: false, status: "Rejected" }
                  : applicant
              ),
            }
            : job
        )
      );

      // Show error toast
      toast({
        title: "Candidate Rejected!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error Rejected candidate:", error);
    }
  };
  const handleOffer = async (jobId, candidateEmail) => {
    const emailAddress = localStorage.getItem("userEmail");
    try {
      const response = await fetch(
        SELECT_SHORTLISTED_CANDIDATE +
        "/" +
        emailAddress +
        "/" +
        jobId +
        "/" +
        candidateEmail,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to select candidate.`);
      }
      fetchJobs();
      // Show success toast
      toast({
        title: "Candidate Selected!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error Selecting candidate:", error);
    }
  }
  const arrayBufferToBase64 = (arrayBuffer) => {
    const binary = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
    return btoa(binary);
  };

  const getPdfBlob =  (base64String)=>{
    const byteCharacters = atob(base64String);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob from the Uint8Array
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    return blob;
  };

  const downloadResume=async(candidateEmail)=>{
    try {
      const apiResponse = await fetch(GET_TOOLKIT + "/" + candidateEmail);
      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }
      const response = await apiResponse.json();
      const coverLetterBase64 = arrayBufferToBase64(response.coverLetter.data.data)
      const resumeBase64 = arrayBufferToBase64(response.resume.data.data)
      const coverLetterBlob=getPdfBlob(coverLetterBase64);
      const resumeBase64Blob=getPdfBlob(resumeBase64);
      // Open a new window or tab with the PDF content
      const newWindow = window.open('', '_blank');
      newWindow.document.write('<html><head><title>Cover Letter</title></head><body>');
      newWindow.document.write(`<embed width="100%" height="100%" src="${URL.createObjectURL(coverLetterBlob)}" type="application/pdf" />`);
      newWindow.document.write('</body></html>');
      newWindow.document.close();

      const newWindow2 = window.open('', '_blank');
      newWindow2.document.write('<html><head><title>Resume</title></head><body>');
      newWindow2.document.write(`<embed width="100%" height="100%" src="${URL.createObjectURL(resumeBase64Blob)}" type="application/pdf" />`);
      newWindow2.document.write('</body></html>');
      newWindow2.document.close();

    } catch (error) {
      console.error("Fetching employers failed:", error);
    }
  }
  return (
    <Box p={4}>
      <Flex align="center" mb={4} ml={50}>
        <Heading as="h1" fontSize="5xl">
          Job Applications
        </Heading>
      </Flex>
      <Accordion defaultIndex={[0]} allowMultiple>
        {jobs.map((job, index) => (
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
                <Heading as="h2" fontSize="xl" color="white">
                  Job Title: {job["jobName"]}
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} pl={8}>
              <Box
                m={5}
                border="1px solid"
                borderColor="gray.100"
                borderRadius="md"
              >
                <Table variant="simple" rounded="md">
                  <Thead>
                    <Tr>
                      <Th
                        backgroundColor="#00BFA6"
                        color="white"
                        align="center"
                      >
                        <Center>Applicant Name</Center>
                      </Th>
                      <Th backgroundColor="#00BFA6" color="white">
                        <Center>Applicant Email</Center>
                      </Th>
                      <Th backgroundColor="#00BFA6" color="white">
                        <Center>Application Status</Center>
                      </Th>
                      <Th backgroundColor="#00BFA6" color="white">
                        <Center>Candidate Data</Center>
                      </Th>
                      <Th backgroundColor="#00BFA6" color="white">
                        <Center>Action</Center>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {job["applicants"].map((applicant, index2) => (
                      <Tr key={job.jobId}>
                        <Td>
                          <Center>
                            <b>{applicant.candidateName}</b>
                          </Center>
                        </Td>
                        <Td>
                          <Center>{applicant.candidateEmail}</Center>
                        </Td>
                        <Td>
                          <Center>{applicant.status}</Center>
                        </Td>
                        <Td>
                          <Center>
                          <Tooltip label="Download Resume and Cover Letter" placement="bottom">
                            <Button
                                variant="solid"
                                colorScheme="custom"
                                backgroundColor="#00BFA6"
                                mx = {2}
                                onClick={() =>
                                  downloadResume(
                                    applicant.candidateEmail
                                  )
                                }
                              >
                                <DownloadIcon />
                              </Button>
                              </Tooltip>
                              </Center>
                        </Td>
                        <Td>
                          <Center>
                            {applicant.isShortlisted && applicant.isInterviewed && !applicant.selected ? (
                              <Button
                                variant="solid"
                                colorScheme="custom"
                                backgroundColor="#00BFA6"
                                mx = {2}
                                onClick={() =>
                                  handleOffer(
                                    job.jobId,
                                    applicant.candidateEmail
                                  )
                                }
                              >
                                Offer
                              </Button>
                            ) : (<></>)
                            }
                            {applicant.isShortlisted ? (
                              <Tooltip label="Reject Candidate" placement="bottom">
                                <Button
                                  variant="solid"
                                  colorScheme="custom"
                                  backgroundColor="red"
                                  onClick={() =>
                                    handleReject(
                                      job.jobId,
                                      applicant.candidateEmail
                                    )
                                  }
                                >
                                  <DeleteIcon />
                                </Button>
                              </Tooltip>
                            ) : (
                              <>
                                <Button
                                  variant="solid"
                                  colorScheme="custom"
                                  backgroundColor="#00BFA6"
                                  m={2}
                                  onClick={() =>
                                    handleShortlist(
                                      job.jobId,
                                      applicant.candidateEmail
                                    )
                                  }
                                >
                                  Shortlist
                                </Button>
                                <Tooltip label="Reject Candidate" placement="bottom">
                                  <Button
                                    variant="solid"
                                    colorScheme="custom"
                                    backgroundColor="red"
                                    onClick={() =>
                                      handleReject(
                                        job.jobId,
                                        applicant.candidateEmail
                                      )
                                    }
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </Tooltip>
                              </>
                            )}
                          </Center>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default EmployerAppliedJobs;
