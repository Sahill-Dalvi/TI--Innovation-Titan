import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  Text,
  Grid,
  Input,
  GridItem,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import {
  GET_INTERVIEW_DETAILS_OF_JOB,
  SCHEDULEINTERVIEW,
  UPDATE_CANDIDATE_APPLIED_JOB,
} from "../../util/backendEndpoints";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

import { useState, useEffect } from "react";
import axios from "axios";
const CustomDatePicker = ({ selectedDate, onChange }) => {
  return (
    <Input
      type="date"
      value={selectedDate}
      onChange={(e) => onChange(e.target.value)}
      min={new Date().toISOString().split("T")[0]} // Minimum date is today
      max={
        new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
      } // Maximum date is 1 week from today
    />
  );
};

const generateTimeSlots = (startTime, endTime, length) => {
  const startHour = parseInt(startTime.split(":")[0]);
  const endHour = parseInt(endTime.split(":")[0]);
  const startMinute = parseInt(startTime.split(":")[1]);
  const endMinute = parseInt(endTime.split(":")[1]);

  const slotLength = length; // Slot length in minutes

  const totalStartMinutes = startHour * 60 + startMinute;
  const totalEndMinutes = endHour * 60 + endMinute;

  const totalMinutes = totalEndMinutes - totalStartMinutes;

  const totalSlots = Math.ceil(totalMinutes / slotLength);

  const timeSlots = [];

  for (let i = 0; i < totalSlots; i++) {
    const slotStartMinutes = totalStartMinutes + i * slotLength;
    const slotEndMinutes = slotStartMinutes + slotLength;

    const slotStartHour = Math.floor(slotStartMinutes / 60);
    const slotStartMin = slotStartMinutes % 60;
    const slotEndHour = Math.floor(slotEndMinutes / 60);
    const slotEndMin = slotEndMinutes % 60;

    const slotStart = `${slotStartHour
      .toString()
      .padStart(2, "0")}:${slotStartMin.toString().padStart(2, "0")}`;
    const slotEnd = `${slotEndHour.toString().padStart(2, "0")}:${slotEndMin
      .toString()
      .padStart(2, "0")}`;

    const timeSlot = {
      start: slotStart,
      end: slotEnd,
    };

    timeSlots.push(timeSlot);
  }

  return timeSlots;
};
const TimeSlotStep = ({ onSelect, selectedSlot, timeSlots }) => {
  const handleSelectSlot = (slot) => {
    onSelect(slot);
  };

  return (
    <Stack spacing={4}>
      <Text>Select a Time Slot</Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {timeSlots && timeSlots.length > 0 ? (
          timeSlots.map((slot) => (
            <GridItem key={slot.start}>
              <Button
                onClick={() => handleSelectSlot(slot)}
                colorScheme={selectedSlot === slot ? "blue" : "gray"}
                variant={selectedSlot === slot ? "solid" : "outline"}
              >
                {`${slot.start} - ${slot.end}`}
              </Button>
            </GridItem>
          ))
        ) : (
          <Text>No time slots available</Text>
        )}
      </Grid>
    </Stack>
  );
};

const InterviewerStep = ({ onSelect, interviewers }) => {
  useEffect(() => {
    const randomInterviewer = getRandomValueFromArray(interviewers);
    onSelect(randomInterviewer);
  }, [onSelect, interviewers]);

  return null; // Since the selection is automatic, no UI component needed
};
const ConfirmationStep = ({
  onClose,
  selectedSlot,
  selectedInterviewer,
  selectedDate,
  job,
}) => {
  const handleConfirm = async () => {
    try {
      // API endpoint URL
      console.log(job);
      // Data to be sent to the API
      const requestData = {
        date: selectedDate,
        timeSlot: selectedSlot,
        candidateName: "dafa",
        candidateEmail: "current@gmail.com",
        interviewerEmail: job.empId,
        interviewerName: selectedInterviewer,
        jobId: job.jobId,
        jobName: job.jobName,
      };

      // Make a POST request to the API
      const response = await axios.post(SCHEDULEINTERVIEW, requestData);

      // Handle the API response as needed
      console.log("API Response:", response.data);
      // Update isInterviewed to true via a PUT request
      const updateRequest = {
        candidateEmail: localStorage.getItem("userEmail")
          ? localStorage.getItem("userEmail")
          : "jane.smith@example.com",

        jobId: job.jobId,
        fieldsToUpdate: { isInterviewed: "true", status: "Interviewing" },
      };

      await axios.put(UPDATE_CANDIDATE_APPLIED_JOB, updateRequest);
      // Close the modal or perform any other action upon successful API call
      onClose();
      window.location.reload();
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error:", error.message);
    }
  };

  return (
    <Stack spacing={4}>
      <Text>Your Selected Date: {selectedDate}</Text>
      <Text>Your Selected Time Slot: {selectedSlot}</Text>
      <Text>Your Selected Interviewer: {selectedInterviewer}</Text>
      <Button colorScheme="blue" onClick={handleConfirm}>
        Confirm
      </Button>
    </Stack>
  );
};
function getRandomValueFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export const ScheduleInterviewModal = ({ jobData }) => {
  const [activeStep, setActiveStep] = useState(-1);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [jobSelected, setJobSelected] = useState(null);
  const [interviewers, setInterviewers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // Set today's date as default
  );

  // Function to fetch interview details based on jobId
  const fetchJobDetails = async (jobId) => {
    try {
      const response = await axios.get(
        `${GET_INTERVIEW_DETAILS_OF_JOB}/${jobId}`
      );
      const { timeSlots, interviewers } = response.data;

      setTimeSlots(timeSlots);
      if (interviewers && interviewers.length > 0) {
        setInterviewers(interviewers); // Update interviewers state here
      }

      setActiveStep(0); // Move to the next step after fetching data
    } catch (error) {
      console.error("Error fetching job details:", error.message);
    }
  };

  // Function to initiate scheduling interview
  const handleScheduleInterview = async (job) => {
    setJobSelected(job);
    await fetchJobDetails(job.jobId); // Fetch details based on jobId when scheduling interview
  };

  // Function to handle selecting a time slot
  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setActiveStep(2); // Move to the next step after selecting the slot
  };

  // Function to handle selecting an interviewer
  const handleSelectInterviewer = (interviewer) => {
    setSelectedInterviewer(interviewer);
    setActiveStep(3); // Move to the confirmation step after selecting the interviewer
  };

  // Function to reset the modal
  const handleReset = () => {
    setSelectedSlot(null);
    setSelectedInterviewer(null);
    setActiveStep(-1); // Reset back to the initial step
  };

  // Function to handle moving to the next step
  const handleNextStep = () => {
    if (activeStep === -1) {
      setActiveStep(0);
    } else if (activeStep === 0 && selectedDate !== null) {
      setActiveStep(1);
    } else if (activeStep === 1 && selectedSlot !== null) {
      setActiveStep(2);
    } else if (activeStep === 2 && selectedInterviewer !== null) {
      setActiveStep(3);
    }
  };

  // Step-wise configuration
  const steps = [
    {
      title: "Select Date",
      component: (
        <>
          <Text>Select a Date</Text>
          <CustomDatePicker
            selectedDate={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </>
      ),
    },
    {
      title: "Select Time Slot",
      component: (
        <TimeSlotStep
          onSelect={handleSelectSlot}
          selectedSlot={selectedSlot}
          timeSlots={timeSlots}
        />
      ),
    },
    {
      title: "Select Interviewer",
      component: (
        <InterviewerStep
          onSelect={handleSelectInterviewer}
          selectedInterviewer={selectedInterviewer}
          interviewers={interviewers}
        />
      ),
    },
    {
      title: "Confirmation",
      component: (
        <ConfirmationStep
          onClose={handleReset}
          selectedSlot={
            selectedSlot ? `${selectedSlot.start} - ${selectedSlot.end}` : ""
          }
          selectedInterviewer={selectedInterviewer}
          selectedDate={selectedDate}
          job={jobSelected}
        />
      ),
    },
  ];

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Job ID</Th>
            <Th>Job Name</Th>
            <Th>Shortlisted</Th>
            <Th>Interviewed</Th>
            <Th>Offer</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {jobData.map((job) => (
            <Tr key={job.jobId}>
              <Td>{job.jobId}</Td>
              <Td>{job.jobName}</Td>
              <Td>
                {job.isShortlisted ? (
                  <CheckIcon color="green" />
                ) : (
                  <CloseIcon color="red" />
                )}
              </Td>
              <Td>
                {job.isInterviewed ? (
                  <CheckIcon color="green" />
                ) : (
                  <CloseIcon color="red" />
                )}
              </Td>
              <Td>
                {job.isSelected ? (
                  <CheckIcon color="green" />
                ) : (
                  <CloseIcon color="red" />
                )}
              </Td>
              <Td>
                {job.status === "Shortlisted" &&
                !job.isInterviewed &&
                !job.selected ? (
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={async () => {
                      setActiveStep(0);
                      setJobSelected(job);
                      await handleScheduleInterview(job);
                    }}
                  >
                    Schedule Interview
                  </Button>
                ) : (
                  <>{job.status}</> // Display the job status
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={activeStep !== -1} onClose={handleReset}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {activeStep !== -1 ? steps[activeStep].title : null}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {activeStep !== -1 ? steps[activeStep].component : null}
          </ModalBody>
          {activeStep !== 3 && activeStep !== -1 && (
            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={handleNextStep}
                isDisabled={
                  activeStep === 0 && selectedDate === null
                    ? true
                    : activeStep === 1 && selectedSlot === null
                    ? true
                    : false
                }
              >
                Next
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScheduleInterviewModal;
