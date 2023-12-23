import Interview from "../models/interviewModel";
// import { Request, Response } from "express";
import { scheduleInterview } from "../controllers/scheduleInterview/scheduleInterview"; // Replace 'yourFilePath' with the correct path
import sinon from "sinon";

describe("scheduleInterview", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should save interview details successfully", async () => {
    const mockInterviewData = {
      candidateName: "John Doe",
      interviewerEmail: "interviewer@example.com",
      candidateEmail: "candidate@example.com",
      interviewerName: "Interviewer Name",
      jobId: "job123",
      jobName: "Software Engineer",
      date: "2024-12-01",
      timeSlot: "10:00 AM - 11:00 AM",
    };

    const req: any = {
      body: mockInterviewData,
    };

    const res: any = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const saveStub = sinon.stub(Interview.prototype, "save").resolves();

    await scheduleInterview(req, res);

    sinon.assert.calledOnce(saveStub);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, {
      message: "Interview details saved successfully",
    });
  });

  it("should handle error while saving interview details", async () => {
    const mockInterviewData = {
      // ... (same as above)
    };

    const req: any = {
      body: mockInterviewData,
    };

    const res: any = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const error = new Error("Database error");
    const saveStub = sinon.stub(Interview.prototype, "save").rejects(error);

    await scheduleInterview(req, res);

    sinon.assert.calledOnce(saveStub);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.json, { error: "Internal server error" });
  });
});
