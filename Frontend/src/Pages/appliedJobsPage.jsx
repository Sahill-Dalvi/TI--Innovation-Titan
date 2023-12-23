import React, { useState, useEffect } from "react";
import { Flex, Grid, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import ScheduleInterviewModal from "../Components/ScheduleInterview/ScheduleInterviewModal";
import { GET_APPLIED_JOBS_BY_CANDIDATE } from "../util/backendEndpoints";
import appliedJobs from "../Assets/appliedJobs.svg";
import { useNavigate } from "react-router-dom";

const AppliedJobs = () => {
  const [jobData, setJobData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
    }
    const emailFromLocalStorage = localStorage.getItem("userEmail")
      ? localStorage.getItem("userEmail")
      : "jane.smith@example.com";

    if (emailFromLocalStorage) {
      setUserEmail(emailFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(
          `${GET_APPLIED_JOBS_BY_CANDIDATE}/${userEmail}`
        );
        setJobData(response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    if (userEmail) {
      fetchJobData();
    }
  }, [userEmail]);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Text fontSize="xxx-large" fontWeight="bold" mb={4}>
        Review Your Application
      </Text>
      <Grid templateColumns="1fr 1fr" gap={8} alignItems="center">
        <Flex direction="column" alignItems="center">
          <ScheduleInterviewModal jobData={jobData}></ScheduleInterviewModal>
        </Flex>
        <Image src={appliedJobs} alt="Applied Jobs Image" boxSize="600px" />
      </Grid>
    </Flex>
  );
};

export default AppliedJobs;
