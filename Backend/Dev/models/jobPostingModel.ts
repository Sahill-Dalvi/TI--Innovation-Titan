import mongoose from "mongoose";

const jobsPostingSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
    },
    empId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    hrName: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    interviewerName: {
      type:[String],
      required: true
    },
    timeSlotObj: {
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      length: {
        type: Number,
        required: true,
      },
    },
  },
  { collection: "JobListing" }
);

const JobsPosting = mongoose.model("JobsPosting", jobsPostingSchema);

export default JobsPosting;
