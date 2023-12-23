import mongoose, { Schema, Document } from "mongoose";

interface IAppliedJob extends Document {
  jobId: string;
  jobName: string;
  candidateName: string;
  candidateEmail: string;
  employerName: string;
  employerEmail: string;
  isShortlisted: boolean;
  isInterviewed: boolean;
  selected: boolean;
  status: string;
}

const appliedJobSchema = new Schema(
  {
    // Schema definition...
    jobId: { type: String, required: true },
    jobName: { type: String, required: true },
    isShortlisted: { type: Boolean, required: false, default: false },
    isInterviewed: { type: Boolean, required: false, default: false },
    selected: { type: Boolean, required: false, default: false },
    status: { type: String, required: true },
    candidateName: { type: String, required: true },
    candidateEmail: { type: String, required: true },
    employerName: { type: String, required: true },
    employerEmail: { type: String, required: true },
  },
  { collection: "AppliedJobs" }
);

const AppliedJobs = mongoose.model<IAppliedJob>(
  "AppliedJobs",
  appliedJobSchema
);

export default AppliedJobs;
