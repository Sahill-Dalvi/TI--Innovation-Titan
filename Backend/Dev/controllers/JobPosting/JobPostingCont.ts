import { Request, Response } from "express";
import JobsPosting from "../../models/jobPostingModel";

// Get all job postings
const getAllJobPostings = async (_: Request, res: Response) => {
  try {
    const jobPostings = await JobsPosting.find();
    res.status(200).json(jobPostings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a specific job posting by ID
const getJobPostingById = async (req: Request, res: Response) => {
  const jobId = req.params.id;

  try {
    const jobPosting = await JobsPosting.findById(jobId);
    if (jobPosting) {
      res.status(200).json(jobPosting);
    } else {
      res.status(404).json({ error: "Job posting not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new job posting
const createJobPosting = async (req: Request, res: Response) => {
  const jobData = req.body;
  // console.log("in job creation", jobData)

  try {
    const newJobPosting = await JobsPosting.create(jobData);
    res.status(201).json(newJobPosting);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a job posting by ID
const updateJobPostingById = async (req: Request, res: Response) => {
  // console.log("In function");
  const jobId = req.params.id;
  const updatedJobData = req.body;

  // console.log("In function body", jobId, updatedJobData);

  try {
    const updatedJobPosting = await JobsPosting.findOneAndUpdate(
      { jobId: jobId },
      updatedJobData,
      { new: true }
    );
    if (updatedJobPosting) {
      res.status(200).json(updatedJobPosting);
    } else {
      res.status(404).json({ error: "Job posting not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a job posting by ID
const deleteJobPostingById = async (req: Request, res: Response) => {
  const jobId = req.params.id;

  try {
    const deletedJobPosting = await JobsPosting.findOneAndDelete({jobId});
    if (deletedJobPosting) {
      res.status(200).json({ message: "Job posting deleted successfully" });
    } else {
      res.status(404).json({ error: "Job posting not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get job postings by empId
const getJobPostingsByEmpId = async (req: Request, res: Response) => {
  const { empId } = req.params;

  try {
    const jobPostings = await JobsPosting.find({ empId: empId });
    res.status(200).json(jobPostings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const generateTimeSlots = (startTime: any, endTime: any, length: any) => {
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

const getJobInterviewDetailsById = async (req: Request, res: Response) => {
  const jobId = req.params.id;

  try {
    const jobPosting = await JobsPosting.findOne({ jobId: jobId });
    if (jobPosting) {
      // Extract interviewers and timeSlotObj from the job posting data
      const { interviewerName, timeSlotObj } = jobPosting;

      if (timeSlotObj) {
        // Generate time slots based on timeSlotObj if it exists
        const { startTime, endTime, length } = timeSlotObj;
        const timeSlots = generateTimeSlots(startTime, endTime, length);

        res
          .status(200)
          .json({ interviewers: interviewerName, timeSlotObj, timeSlots });
      } else {
        res
          .status(400)
          .json({ error: "Time slot details not found for this job" });
      }
    } else {
      res.status(404).json({ error: "Job posting not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export {
  getAllJobPostings,
  getJobPostingById,
  createJobPosting,
  getJobInterviewDetailsById,
  updateJobPostingById,
  deleteJobPostingById,
  getJobPostingsByEmpId,
};
