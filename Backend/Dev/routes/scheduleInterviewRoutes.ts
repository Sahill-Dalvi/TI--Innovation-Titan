// Importing the necessary modules
import express from "express";

// Creating an instance of the Express router
const router = express.Router();
import { scheduleInterview } from "../controllers/scheduleInterview/scheduleInterview";
// Defining routes and associating them with respective controller functions
router.post("/scheduleInterview", scheduleInterview); // Route to get queries

// Exporting the router instance as queriesRoutes
const scheduleInterviewRoutes = router;
export default scheduleInterviewRoutes;
