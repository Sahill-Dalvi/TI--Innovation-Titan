// Importing the necessary modules
import express from "express";

// Creating an instance of the Express router
const router = express.Router();
import { getAllUsers } from "../controllers/Users/UsersCont";
import { createNewUser } from "../controllers/Users/UsersCont";
import { getUserByEmail } from "../controllers/Users/UsersCont";


// Defining routes and associating them with respective controller functions
router.get("/getAllUsers", getAllUsers); 
router.post("/createNewUser", createNewUser); 
router.get("/getUserByEmail/:email", getUserByEmail); 

// Exporting the router instance as queriesRoutes
const userRoutes = router;
export default userRoutes;
