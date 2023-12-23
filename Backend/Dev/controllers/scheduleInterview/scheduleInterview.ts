import Interview from "../../models/interviewModel";

import { Request, Response } from "express";
export const scheduleInterview = async (req: Request, res: Response) => {
  const {
    candidateName,
    interviewerEmail,
    candidateEmail,
    interviewerName,
    jobId,
    jobName,
    date,
    timeSlot,
  } = req.body;

  try {
    // Create a new Interview document using the Interview model
    const interview = new Interview({
      candidateName,
      interviewerName,
      interviewerEmail,
      candidateEmail,
      jobId,
      jobName,
      date,
      timeSlot,
    });

    // Save the interview details to the database
    await interview.save();

    res.status(200).json({ message: "Interview details saved successfully" });
  } catch (error) {
    console.error("Error saving interview details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
