// Importing the necessary modules
import express from "express";

// Creating an instance of the Express router
const router = express.Router();
import { uploadJobToolkit, getJobToolkitById } from "../controllers/JobToolkit/JobToolkitCont";

// Defining routes and associating them with respective controller functions
router.post("/uploadJobToolkit", uploadJobToolkit); 
router.get("/getJobToolkitById/:userId", getJobToolkitById); 

// Exporting the router instance as queriesRoutes
const jobToolkitRoutes = router;
export default jobToolkitRoutes;
