import React, { useState, useEffect } from "react";
import JobTable from "../Components/JobVerify/JobTable";
import { useDisclosure, Heading } from "@chakra-ui/react";
import { GET_JOBS } from "../util/backendEndpoints";
import { useNavigate } from "react-router-dom";

const JobVerify = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resume, setResume] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
    }
    // Fetch jobs from the API
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(GET_JOBS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Fetching jobs failed:", error);
    }
  };

  const handleRowClick = (job) => {
    setSelectedJob(job);
    onOpen();
  };

  return (
    <>
      <br />
      <Heading as="h2" size="2xl">
        <center>Verify Jobs</center>
      </Heading>
      <br />
      <JobTable jobs={jobs} onRowClick={handleRowClick} />
    </>
  );
};

export default JobVerify;
