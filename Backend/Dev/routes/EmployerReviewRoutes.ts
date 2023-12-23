import express from "express";
import {
  getAllEmployerNames,
  getAllReviewsByEmployer,
} from "../controllers/EmployerReview/EmployerReviewController";

const router = express.Router();

// Route to get all employer names
router.get("/employers", getAllEmployerNames);

// Route to get all reviews for a specific employer
router.get("/reviews/:employerName", getAllReviewsByEmployer);

export default router;
