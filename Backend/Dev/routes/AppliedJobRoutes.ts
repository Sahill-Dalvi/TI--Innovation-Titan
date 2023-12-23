import express from "express";
import {
  getJobsByEmployerEmail,
  getJobDataByEmployerAndId,
  shortlistCandidate,
  rejectCandidate,
  offerCandidate,
  getJobsByCandidateEmail,
  modifyFieldsByCandidateEmail,
  saveAppliedJob,
} from "../controllers/AppliedJobs/AppliedJobsController";

const router = express.Router();

// Route to get all job listings
router.get("/appliedJobs/:employerEmail", getJobsByEmployerEmail);
router.get("/appliedJobs/:employerEmail/:jobId", getJobDataByEmployerAndId);
router.put(
  "/shortlist/:employerEmail/:jobId/:candidateEmail",
  shortlistCandidate
);
router.put("/reject/:employerEmail/:jobId/:candidateEmail", rejectCandidate);
router.put("/offer/:employerEmail/:jobId/:candidateEmail", offerCandidate);
router.get("/candidateAppliedJobs/:candidateEmail/", getJobsByCandidateEmail);
router.put("/appliedJobs/update/", modifyFieldsByCandidateEmail);
router.post("/appliedJobs/applyJob", saveAppliedJob);
export default router;
