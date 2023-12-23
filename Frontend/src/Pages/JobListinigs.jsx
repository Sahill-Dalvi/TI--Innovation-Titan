import React, { useState, useEffect } from "react";
import JobTable from "../Components/JobListingsDashboard/JobTable";
import JobDescriptionModal from "../Components/JobListingsDashboard/JobDescriptionModal";
import ApplicationModalComponent from "../Components/JobListingsDashboard/ApplicationModalComponent";
import ConfirmApplicationModal from "../Components/JobListingsDashboard/ConfirmApplicationModal";
import SubmissionSuccessModal from "../Components/JobListingsDashboard/SubmissionSuccessModal";
import { useDisclosure, Box, Input, Flex, Text } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import {
  GET_JOBS,
  TAGS,
  GET_TOOLKIT,
  POST_APPLY_JOB_BY_CANDIDATE,
} from "../util/backendEndpoints";
import "./JobListings.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resume, setResume] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    isOpen: isApplyModalOpen,
    onOpen: onApplyModalOpen,
    onClose: onApplyModalClose,
  } = useDisclosure();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
    }
    // Fetch jobs from the API
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearchTerm = job.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Assuming job.tags is an array of strings that are the tags associated with the job
    const matchesTags =
      selectedTags.length === 0 ||
      job.tags.some((tag) => selectedTags.map((t) => t.value).includes(tag));

    return matchesSearchTerm && matchesTags;
  });

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

  const handleApplyClick = async () => {
    const userEmail = localStorage.getItem("userEmail");
    try {
      const response = await axios.get(GET_TOOLKIT + `/${userEmail}`);
      setResume(response.data?.resume?.filename);
      setIsConfirmModalOpen(true); // Open the confirmation modal
    } catch (error) {
      console.error("Fetching resume failed:", error);
    }
  };

  const handleSubmitApplication = async () => {
    // Assuming you have the necessary job application data
    console.log("Selected job:", JSON.stringify(selectedJob, null, 2));
    const applicationData = {
      jobId: selectedJob.jobId,
      jobName: selectedJob.name,
      candidateName: `${localStorage.getItem(
        "firstName"
      )} ${localStorage.getItem("lastName")}`,
      candidateEmail: localStorage.getItem("userEmail"),
      employerName: selectedJob.companyName,
      employerEmail: selectedJob.empId,
      isShortlisted: false,
      isInterviewed: false,
      selected: false,
      status: "Under Review",
    };

    try {
      const response = await axios.post(
        POST_APPLY_JOB_BY_CANDIDATE,
        applicationData
      );
      if (response.data) {
        onClose(); // Close JobDescriptionModal
        onApplyModalClose(); // Close ApplicationModalComponent
        setIsConfirmModalOpen(false); // Close ConfirmApplicationModal
        setIsSubmissionModalOpen(true); // Open SubmissionSuccessModal
      }
    } catch (error) {
      console.error("Error submitting job application:", error);
    }
  };

  return (
    <>
      <Box p={4}>
        <Flex gap={4} alignItems="center">
          <Box flex="1">
            <Input
              placeholder="Search by job name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
          <Box flex="1">
            <Select
              placeholder="Select tags"
              tagVariant="solid"
              variant="filled"
              isMulti
              value={selectedTags}
              onChange={(selectedOptions) =>
                setSelectedTags(selectedOptions || [])
              }
              options={TAGS.map((tag) => ({
                label: tag,
                value: tag,
              }))}
            />
          </Box>
        </Flex>
      </Box>
      <JobTable
        jobs={filteredJobs}
        onRowClick={handleRowClick}
        rowClassName="job-row"
      />

      <ConfirmApplicationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        resume={resume}
        onConfirm={handleSubmitApplication}
      />

      <JobDescriptionModal
        isOpen={isOpen}
        onClose={onClose}
        job={selectedJob}
        onApplyClick={handleApplyClick}
      />

      <ApplicationModalComponent
        isOpen={isApplyModalOpen}
        onClose={onApplyModalClose}
        resume={resume}
        onSubmitApplication={handleSubmitApplication}
      />

      <SubmissionSuccessModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
      />
    </>
  );
};

export default JobListings;
