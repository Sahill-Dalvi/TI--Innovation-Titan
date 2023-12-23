import express from "express";
import { getJobListings, verifyJobListing } from "../controllers/jobListingsController";

const router = express.Router();

// Route to get all job listings
router.get("/jobs", getJobListings);

// Route to verify a job listing
router.put("/verify/:jobId", verifyJobListing);

export default router;
