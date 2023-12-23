import mongoose, { Schema, Document } from "mongoose";

interface IJobListing extends Document {
  jobId: string;
  name: string;
  companyName: string;
  hrName: string;
  tags: string[];
  jobDescription: string;
  verified: boolean;
}

const jobListingSchema = new Schema(
  {
    // Schema definition...
    verified: { type: Boolean, required:false, default:false}
  },
  { collection: "JobListing" }
); // Explicitly set the collection name here

const JobListing = mongoose.model<IJobListing>("JobListing", jobListingSchema);

export default JobListing;
