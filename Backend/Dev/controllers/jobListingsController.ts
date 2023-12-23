import { Request, Response } from "express";
import JobListing from "../models/joblistings";

export const getJobListings = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const jobListings = await JobListing.find();
    console.log(jobListings);
    res.json(jobListings);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send("Error fetching job listings: " + error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export const verifyJobListing = async (
  req: Request<{ jobId: string }>,
  res: Response
): Promise<void> => {
  const jobId = req.params.jobId;
  console.log(jobId);

  try {
    const jobListing = await JobListing.updateOne(
      { jobId },
      { $set: { verified: true } }
    ).exec();
    console.log(jobListing);

    if (!jobListing) {
      res.status(404).send("Job not found");
      return;
    }
    res.json({ message: "Job listing verified successfully", jobListing });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send("Error verifying job listing: " + error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};
