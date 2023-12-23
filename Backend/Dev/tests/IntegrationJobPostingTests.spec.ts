import { Request } from "express";
import sinon from "sinon";

import JobsPosting from "../models/jobPostingModel";
import {
  getAllJobPostings,
  getJobPostingsByEmpId,
  getJobInterviewDetailsById,
} from "../controllers/JobPosting/JobPostingCont"; // Replace 'yourFilePath' with the correct path

describe("getAllJobPostings", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should get all job postings successfully", async () => {
    const res: any = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const jobPostings = [{ title: "Job 1" }, { title: "Job 2" }];
    const findStub = sinon.stub(JobsPosting, "find").resolves(jobPostings);

    await getAllJobPostings({} as Request, res);

    sinon.assert.calledOnce(findStub);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, jobPostings);
  });

  // Add more tests for error handling and other scenarios as needed
});
describe("getJobPostingsByEmpId", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should get job postings by employer ID", async () => {
    const mockEmpId = "employer123";
    const mockJobPostings = [
      { title: "Job 1", empId: mockEmpId },
      { title: "Job 2", empId: mockEmpId },
      // Other mock job postings for the employer...
    ];

    const req: any = {
      params: { empId: mockEmpId },
    };

    const res: any = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const findStub = sinon.stub(JobsPosting, "find").resolves(mockJobPostings);

    await getJobPostingsByEmpId(req, res);

    sinon.assert.calledOnce(findStub);
    //   sinon.assert.calledWith(findStub, { empId: mockEmpId });
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, mockJobPostings);
  });

  it("should handle error while getting job postings by employer ID", async () => {
    const mockEmpId = "employer123";

    const req: any = {
      params: { empId: mockEmpId },
    };

    const res: any = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const error = new Error("Database error");
    const findStub = sinon.stub(JobsPosting, "find").rejects(error);

    await getJobPostingsByEmpId(req, res);

    sinon.assert.calledOnce(findStub);
    //   sinon.assert.calledWith(findStub, { empId: mockEmpId });
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.json, { error: "Internal server error" });
  });
});

describe("getJobInterviewDetailsById", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should get job interview details by job ID", async () => {
    const mockJobId = "job123";
    const mockJobPosting = {
      jobId: mockJobId,
      interviewerName: ["Interviewer 1", "Interviewer 2"],
      timeSlotObj: {
        startTime: "09:00",
        endTime: "17:00",
        length: 30,
      },
    };

    const req: any = {
      params: { id: mockJobId },
    };

    const res: any = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const findOneStub = sinon
      .stub(JobsPosting, "findOne")
      .resolves(mockJobPosting);

    await getJobInterviewDetailsById(req, res);

    sinon.assert.calledOnce(findOneStub);
    sinon.assert.calledWith(findOneStub, { jobId: mockJobId });
    sinon.assert.calledWith(res.status, 200);
  });
});
// Write similar tests for the other functions like getJobPostingById, createJobPosting, updateJobPostingById, deleteJobPostingById, getJobPostingsByEmpId, and getJobInterviewDetailsById
