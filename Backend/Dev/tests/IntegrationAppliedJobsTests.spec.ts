import sinon from "sinon";
import {
  getJobsByEmployerEmail,
  getJobDataByEmployerAndId,
  saveAppliedJob,
  modifyFieldsByCandidateEmail,
} from "../controllers/AppliedJobs/AppliedJobsController";
import AppliedJobs from "../models/appliedJobs";
// import { Request, Response } from "express";
import "mocha";

describe("AppliedJobsController", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("getJobsByEmployerEmail", () => {
    it("should return jobs for the specified employer", async () => {
      const fakeJobs = [
        {
          jobId: "job123",
          jobName: "Software Engineer",
        },
        // Add more mock job data as needed...
      ];

      const req: any = {
        params: { employerEmail: "test@example.com" },
      };

      const res: any = {
        json: sinon.stub(),
      };

      const findStub = sinon.stub(AppliedJobs, "find").resolves(fakeJobs);

      await getJobsByEmployerEmail(req, res);

      sinon.assert.calledOnce(findStub);
      sinon.assert.calledWith(res.json, fakeJobs);
    });

    it("should handle error when fetching jobs", async () => {
      const req: any = {
        params: { employerEmail: "test@example.com" },
      };

      const res: any = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      const error = new Error("Database error");
      const findStub = sinon.stub(AppliedJobs, "find").rejects(error);

      await getJobsByEmployerEmail(req, res);

      sinon.assert.calledOnce(findStub);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(
        res.send,
        "Error fetching jobs: " + error.message
      );
    });
  });
  describe("getJobDataByEmployerAndId", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should return job data for the specified employer and job ID", async () => {
      const fakeJobs = [
        {
          jobId: "job123",
          jobName: "Software Engineer",
          // Add more job data as needed...
        },
      ];

      const req: any = {
        params: { employerEmail: "test@example.com", jobId: "job123" },
      };

      const res: any = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      const findStub = sinon.stub(AppliedJobs, "find").resolves(fakeJobs);

      await getJobDataByEmployerAndId(req, res);

      sinon.assert.calledOnce(findStub);
      sinon.assert.calledWith(res.json, fakeJobs);
    });

    it("should handle no matching jobs found", async () => {
      const req: any = {
        params: { employerEmail: "test@example.com", jobId: "job123" },
      };

      const res: any = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      const findStub = sinon.stub(AppliedJobs, "find").resolves([]);

      await getJobDataByEmployerAndId(req, res);

      sinon.assert.calledOnce(findStub);
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.send, "No matching jobs found");
    });

    it("should handle error when fetching job data", async () => {
      const req: any = {
        params: { employerEmail: "test@example.com", jobId: "job123" },
      };

      const res: any = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      const error = new Error("Database error");
      const findStub = sinon.stub(AppliedJobs, "find").rejects(error);

      await getJobDataByEmployerAndId(req, res);

      sinon.assert.calledOnce(findStub);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(
        res.send,
        "Error fetching job data: " + error.message
      );
    });
  });

  describe("shortlistCandidate", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should shortlist a candidate for the specified employer, job ID, and candidate email", async () => {
      const fakeJobs = [
        {
          jobId: "job123",
          jobName: "Software Engineer",
        },
        // Add more mock job data as needed...
      ];

      const req: any = {
        params: { employerEmail: "test@example.com" },
      };

      const res: any = {
        json: sinon.stub(),
      };

      const findStub = sinon.stub(AppliedJobs, "find").resolves(fakeJobs);

      await getJobsByEmployerEmail(req, res);

      sinon.assert.calledOnce(findStub);
      sinon.assert.calledWith(res.json, fakeJobs);
    });

    it("should handle error when fetching jobs", async () => {
      const req: any = {
        params: { employerEmail: "test@example.com" },
      };

      const res: any = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      const error = new Error("Database error");
      const findStub = sinon.stub(AppliedJobs, "find").rejects(error);

      await getJobsByEmployerEmail(req, res);

      sinon.assert.calledOnce(findStub);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(
        res.send,
        "Error fetching jobs: " + error.message
      );
    });
  });

  describe("modifyFieldsByCandidateEmail", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should modify a specific field for a candidate's job application", async () => {
      const req: any = {
        body: {
          candidateEmail: "test@example.com",
          jobId: "job123",
          fieldToModify: "status",
          value: "Shortlisted",
        },
      };

      const res: any = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      const findOneAndUpdateStub = sinon
        .stub(AppliedJobs, "findOneAndUpdate")
        .resolves({}); // You might need to adjust the resolved value based on the return type of findOneAndUpdate

      await modifyFieldsByCandidateEmail(req, res);

      sinon.assert.calledOnce(findOneAndUpdateStub);
      sinon.assert.calledWith(
        findOneAndUpdateStub,
        { candidateEmail: "test@example.com", jobId: "job123" },
        { $set: { status: "Shortlisted" } },
        { new: true }
      );
      sinon.assert.calledWith(res.json, {
        message: "Field 'status' modified successfully",
        job: {},
      });
    });

    it("should handle error when modifying a field", async () => {
      const req: any = {
        body: {
          candidateEmail: "test@example.com",
          jobId: "job123",
          fieldToModify: "status",
          value: "Shortlisted",
        },
      };

      const res: any = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      const error = new Error("Database error");
      const findOneAndUpdateStub = sinon
        .stub(AppliedJobs, "findOneAndUpdate")
        .rejects(error);

      await modifyFieldsByCandidateEmail(req, res);

      sinon.assert.calledOnce(findOneAndUpdateStub);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(
        res.send,
        `Error modifying field 'status': ${error.message}`
      );
    });
  });
  describe("saveAppliedJob", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should save a new job application", async () => {
      const req: any = {
        body: {
          // Populate request body fields as needed
        },
      };

      const res: any = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      const saveStub = sinon.stub(AppliedJobs.prototype, "save").resolves({});

      await saveAppliedJob(req, res);

      sinon.assert.calledOnce(saveStub);
      sinon.assert.calledWith(res.json, {
        message: "Job applied successfully",
        job: {},
      });
    });

    it("should handle error when saving a job application", async () => {
      const req: any = {
        body: {
          // Populate request body fields as needed
        },
      };

      const res: any = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      const error = new Error("Database error");
      const saveStub = sinon.stub(AppliedJobs.prototype, "save").rejects(error);

      await saveAppliedJob(req, res);

      sinon.assert.calledOnce(saveStub);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.send, "Error saving job: " + error.message);
    });
  });
});
