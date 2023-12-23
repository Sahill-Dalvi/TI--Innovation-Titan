import React, { useState } from "react";
import { VERIFY_JOB } from "../../util/backendEndpoints";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
  Box, Center
} from "@chakra-ui/react";
import { CheckIcon } from '@chakra-ui/icons'

const JobTable = ({ jobs, onRowClick }) => {
  const toast = useToast();
  const [verifiedJobs, setVerifiedJobs] = useState([]);

  const handleVerificationClick = async (jobId) => {
    try {
      const response = await fetch(VERIFY_JOB + "/" + jobId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to verify job with ID ${jobId}`);
      }

      console.log(`Job with ID ${jobId} verified successfully`);

      // Update the state with the verified job
      setVerifiedJobs((prevVerifiedJobs) => [...prevVerifiedJobs, jobId]);

      // Show success toast
      toast({
        title: "Verification Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error verifying job:", error);

      // Show error toast
      toast({
        title: "Verification Failed",
        description: "An error occurred while verifying the job.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box m={5} border="1px solid" borderColor="gray.100" borderRadius="md">
      <Table variant="simple" rounded="md">
        <Thead>
          <Tr>
            <Th backgroundColor="#00BFA6" color="white" align="center">
              <Center>
                Job ID
              </Center>
            </Th>
            <Th backgroundColor="#00BFA6" color="white">
              <Center>
                Name
              </Center>
            </Th>
            <Th backgroundColor="#00BFA6" color="white">
              <Center>
                Company Name
              </Center>
            </Th>
            <Th backgroundColor="#00BFA6" color="white">
              <Center>
                HR Name
              </Center>
            </Th>
            <Th backgroundColor="#00BFA6" color="white">
              <Center>
                Verification
              </Center>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {jobs.map((job) => (
            <Tr key={job.jobId} onClick={() => onRowClick(job)}>
              <Td><Center>{job.jobId}</Center></Td>
              <Td><Center>{job.name}</Center></Td>
              <Td><Center>{job.companyName}</Center></Td>
              <Td><Center>{job.hrName}</Center></Td>
              <Td>
                {verifiedJobs.includes(job.jobId) ? (
                  <Center><CheckIcon w={8} h={8} color="green.500" /></Center>
                ) : job.verified === false ? (
                  <Center><Button
                    variant="solid"
                    colorScheme="custom"
                    backgroundColor="#00BFA6"
                    onClick={() => handleVerificationClick(job.jobId)}
                  >
                    Verify
                  </Button></Center>
                ) : (
                  <Center><CheckIcon w={8} h={8} color="green.500" /></Center>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default JobTable;
