import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const fileUpload = require('express-fileupload');

// Import the schemas
import contactEmployerRoutes from "./routes/ContactEmployerRoutes";
import JobListingsRoutes from "./routes/JobListingsRoutes";
import scheduleInterviewRoutes from "./routes/scheduleInterviewRoutes";
import jobPostingRoutes from "./routes/JobPostingRoutes";
import jobToolkitRoutes from "./routes/JobToolkitRoutes";
import reviewRoutes from "./routes/EmployerReviewRoutes";
import appliedJobRoutes from "./routes/AppliedJobRoutes"
import userRoutes from "./routes/UserRoutes";


const app = express();

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://amanjot:Lt7bS52V31vPQYqk@cluster0.ddwqjfx.mongodb.net/",
    {
      dbName: "TalentTrek",
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(cors());
app.use(express.json());
app.use(fileUpload())

// API middlewares
app.use("/api/", contactEmployerRoutes);
app.use("/api/", scheduleInterviewRoutes);
app.use("/JobListings/", JobListingsRoutes);
app.use("/JobPosting/", jobPostingRoutes)
app.use("/jobToolkit/", jobToolkitRoutes)
app.use("/employerReview", reviewRoutes);
app.use("/api/", appliedJobRoutes);
app.use("/users/", userRoutes)

const port: number = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
