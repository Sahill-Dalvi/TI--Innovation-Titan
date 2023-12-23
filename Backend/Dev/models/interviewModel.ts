import mongoose from "mongoose";
const interviewSchema = new mongoose.Schema(
  {
    candidateName: {
      type: String,
      required: true,
    },
    interviewerName: {
      type: String,
      required: true,
    },
    interviewerEmail: {
      type: String,
      required: true,
    },
    candidateEmail: {
      type: String,
      required: true,
    },
    jobId: {
      type: String,
      required: true,
    },
    jobName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
  },
  { collection: "Interview", database: "YourDatabaseName" }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
