import React, { useState, useEffect } from "react";
import { ChakraProvider, VStack, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import NewJobForm from "../Components/JobPosting/NewJobForm";
import JobCard from "../Components/JobPosting/JobCard";
import axios from "axios";
import {
  GET_JOB_POSTING_BY_EMPID,
  DELETE_JOB_POSTING,
} from "../util/backendEndpoints";

const JobPosting = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();
  // debugger;
  const userEmail = localStorage.getItem("userEmail");
  if (!userEmail) {
    navigate("/login");
  }

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
    }

    // Fetch job data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          GET_JOB_POSTING_BY_EMPID + `/${userEmail}`
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  const handleCreateJob = (newJob) => {
    // Handle API call to create job on the server
    // Upon success, add the new job to the state
    setJobs([...jobs, newJob]);
    toast({
      title: "Success",
      description: "Job Created.",
      status: "success",
      isClosable: true,
    });
  };

  const handleEditJob = (updateJob) => {
    const indexToUpdate = jobs.findIndex(
      (job) => job?.jobId === updateJob.jobId
    );

    // Check if the job is found
    if (indexToUpdate !== -1) {
      // Create a new array with the updated job
      const updatedJobs = [...jobs];
      updatedJobs[indexToUpdate] = updateJob;

      // Update the state with the new array
      toast({
        title: "Success",
        description: "Job Updated.",
        status: "success",
        isClosable: true,
      });
      setJobs(updatedJobs);
    } else {
      // Handle the case where the job is not found
      console.error("Job not found for update");
    }
  };

  const handleDeleteJob = async (jobId) => {
    // Handle API call to delete job on the server
    // Upon success, update the state
    debugger;
    try {
      await axios.delete(DELETE_JOB_POSTING + `/${jobId}`);
      toast({
        title: "Success",
        description: "Job Deleted.",
        status: "success",
        isClosable: true,
      });
      setJobs(jobs.filter((job) => job.jobId !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <ChakraProvider mt={8}>
      <HStack spacing={4} justify="center" align="stretch" w="100%" mt={8}>
        {jobs?.length > 0 ? (
          <>
            <VStack spacing={4} align="stretch" w="60%">
              {jobs?.map((job) => (
                <JobCard
                  key={job.jobId}
                  job={job}
                  onDelete={handleDeleteJob}
                  onEdit={handleEditJob}
                />
              ))}
            </VStack>
            <NewJobForm onSubmit={handleCreateJob} />
          </>
        ) : (
          <VStack spacing={4}>
            <Text
              fontSize="xl" // Set the font size to extra large
              fontWeight="bold" // Make the text bold
              color="green.500" // Set the text color to dark green
            >
              You haven't created any job.
            </Text>

            <NewJobForm onSubmit={handleCreateJob} />
          </VStack>
        )}
      </HStack>
    </ChakraProvider>
  );
};

export default JobPosting;
