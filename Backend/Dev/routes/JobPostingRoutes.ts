// Importing the necessary modules
import express from "express";

// Creating an instance of the Express router
const router = express.Router();
import { getAllJobPostings } from "../controllers/JobPosting/JobPostingCont";
import { createJobPosting } from "../controllers/JobPosting/JobPostingCont";
import { deleteJobPostingById } from "../controllers/JobPosting/JobPostingCont";
import { getJobPostingById } from "../controllers/JobPosting/JobPostingCont";
import { getJobPostingsByEmpId } from "../controllers/JobPosting/JobPostingCont";
import { updateJobPostingById } from "../controllers/JobPosting/JobPostingCont";
import { getJobInterviewDetailsById } from "../controllers/JobPosting/JobPostingCont";
// Defining routes and associating them with respective controller functions
router.get("/getAllJobPostings", getAllJobPostings);
router.post("/createJobPosting", createJobPosting);
router.delete("/deleteJobPostingById/:id", deleteJobPostingById);
router.get("/getJobPostingById", getJobPostingById);
router.get("/getJobPostingsByEmpId/:empId", getJobPostingsByEmpId);
router.post("/updateJobPostingById/:id", updateJobPostingById);
router.get("/getJobInterviewDetailsById/:id", getJobInterviewDetailsById);

// Exporting the router instance as queriesRoutes
const jobPostingRoutes = router;
export default jobPostingRoutes;
