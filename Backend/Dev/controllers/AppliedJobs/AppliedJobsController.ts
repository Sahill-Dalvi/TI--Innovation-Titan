import { Request, Response } from "express";
import AppliedJobs from "../../models/appliedJobs";

export const getJobsByEmployerEmail = async (
  req: Request<{ employerEmail: string }>,
  res: Response
): Promise<void> => {
  const { employerEmail } = req.params;

  try {
    // Query MongoDB to find applied jobs for the specified employerEmail
    const jobs = await AppliedJobs.find({ employerEmail });

    // Extract job IDs and names from the result
    const jobInfo = jobs.map((job) => ({
      jobId: job.jobId,
      jobName: job.jobName,
    }));

    res.json(jobInfo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send("Error fetching jobs: " + error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export const getJobDataByEmployerAndId = async (
  req: Request<{ employerEmail: string; jobId: string }>,
  res: Response
): Promise<void> => {
  const { employerEmail, jobId } = req.params;

  try {
    // Query MongoDB to find applied jobs for the specified employerEmail and jobId
    const jobs = await AppliedJobs.find({ employerEmail, jobId });

    if (jobs.length === 0) {
      res.status(404).send("No matching jobs found");
      return;
    }

    // Return the entire job data
    res.json(jobs);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send("Error fetching job data: " + error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export const shortlistCandidate = async (
  req: Request<{
    employerEmail: string;
    jobId: string;
    candidateEmail: string;
  }>,
  res: Response
): Promise<void> => {
  const { employerEmail, jobId, candidateEmail } = req.params;

  try {
    const job = await AppliedJobs.updateOne(
      { employerEmail, jobId, candidateEmail },
      { $set: { isShortlisted: true } }
    ).exec();
    const status = await AppliedJobs.updateOne(
      { employerEmail, jobId, candidateEmail },
      { $set: { status: "Shortlisted" } }
    ).exec();
    const interview = await AppliedJobs.updateOne(
      { employerEmail, jobId, candidateEmail },
      { $set: { isInterviewed: false } }
    ).exec();
    const offer = await AppliedJobs.updateOne(
      { employerEmail, jobId, candidateEmail },
      { $set: { selected: false } }
    ).exec();

    if (!job && !status && !interview && !offer) {
      res.status(404).send("Job not found");
      return;
    }
    res.json({ message: "Job listing shortlisted successfully", job });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send("Error shortlisting job: " + error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export const rejectCandidate = async (
  req: Request<{
    employerEmail: string;
    jobId: string;
    candidateEmail: string;
  }>,
  res: Response
): Promise<void> => {
  const { employerEmail, jobId, candidateEmail } = req.params;

  try {
    const job = await AppliedJobs.updateOne(
      { employerEmail, jobId, candidateEmail },
      { $set: { selected: false } }
    ).exec();
    const status = await AppliedJobs.updateOne(
      { employerEmail, jobId, candidateEmail },
      { $set: { status: "Rejected" } }
    ).exec();
    console.log(job);

    if (!job && !status) {
      res.status(404).send("Job not found");
      return;
    }
    res.json({ message: "Job listing shortlisted successfully", job });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send("Error shortlisting job: " + error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export const offerCandidate = async (
  req: Request<{
    employerEmail: string;
    jobId: string;
    candidateEmail: string;
  }>,
  res: Response
): Promise<void> => {
  const { employerEmail, jobId, candidateEmail } = req.params;

  try {
    const job = await AppliedJobs.updateOne(
      { employerEmail, jobId, candidateEmail },
      { $set: { selected: true } }
    ).exec();
    const status = await AppliedJobs.updateOne(
      { employerEmail, jobId, candidateEmail },
      { $set: { status: "Candidate Selected" } }
    ).exec();
    console.log(job);

    if (!job && !status) {
      res.status(404).send("Job not found");
      return;
    }
    res.json({ message: "Candidate offered successfully", job });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send("Error offering: " + error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export const getJobsByCandidateEmail = async (
  req: Request<{ candidateEmail: string }>,
  res: Response
): Promise<void> => {
  const { candidateEmail } = req.params;

  try {
    const jobs = await AppliedJobs.find({ candidateEmail });

    const jobInfo = jobs.map((job) => ({
      jobId: job.jobId,
      jobName: job.jobName,
      isShortlisted: job.isShortlisted,
      isInterviewed: job.isInterviewed,
      isSelected: job.selected,
      status: job.status,

      empId: job.employerEmail,

      // Include other relevant job data here
    }));

    res.json(jobInfo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send("Error fetching jobs: " + error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export const saveAppliedJob = async (
  req: Request, // Assuming the request body matches the IAppliedJob interface
  res: Response
): Promise<void> => {
  const {
    jobId,
    jobName,
    candidateName,
    candidateEmail,
    employerName,
    employerEmail,
    isShortlisted,
    isInterviewed,
    selected,
    status,
  } = req.body;

  try {
    // Create a new AppliedJobs document
    const newAppliedJob = new AppliedJobs({
      jobId,
      jobName,
      candidateName,
      candidateEmail,
      employerName,
      employerEmail,
      isShortlisted,
      isInterviewed,
      selected,
      status,
    });

    // Save the document to the database
    const savedJob = await newAppliedJob.save();

    res.json({ message: "Job applied successfully", job: savedJob }); // Respond with the saved document
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send("Error saving job: " + error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

// interface ModifyFieldRequest {
//   candidateEmail: string;
//   jobId: string;
//   fieldsToUpdate: Record<string, any>; // Object containing field-value pairs
// }

export const modifyFieldsByCandidateEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { candidateEmail, jobId, fieldsToUpdate } = req.body;

  try {
    const updateQuery: Record<string, any> = { ...fieldsToUpdate };

    const updatedJob = await AppliedJobs.findOneAndUpdate(
      { candidateEmail, jobId },
      { $set: updateQuery },
      { new: true }
    );

    if (!updatedJob) {
      res.status(404).send("Job not found");
      return;
    }

    // const modifiedFields = Object.keys(fieldsToUpdate).join(", ");

    res.json({
      message: `Fields  modified successfully`,
      job: updatedJob,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(`Error modifying fields: ${error.message}`);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};
