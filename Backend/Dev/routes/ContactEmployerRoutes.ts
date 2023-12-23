// Importing the necessary modules
import express from "express";

// Creating an instance of the Express router
const router = express.Router();
import { sendEmailToEmployer } from "../controllers/ContactEmployer/ContactEmployerCont";

// Defining routes and associating them with respective controller functions
router.post("/sendQuery", sendEmailToEmployer); // Route to get queries

// Exporting the router instance as queriesRoutes
const contactEmployerRoutes = router;
export default contactEmployerRoutes;
