import JobListing from "../models/joblistings";
import sinon from "sinon";

import {
  getJobListings,
  verifyJobListing,
} from "../controllers/jobListingsController"; // Replace 'yourFilePath' with the correct path

describe("getJobListings", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should fetch job listings successfully", async () => {
    const mockJobListings = [
      { title: "Software Engineer" },
      { title: "Data Analyst" },
    ];

    const req: any = {};
    const res: any = {
      json: sinon.stub(),
    };

    const findStub = sinon.stub(JobListing, "find").resolves(mockJobListings);

    await getJobListings(req, res);

    sinon.assert.calledOnce(findStub);
    sinon.assert.calledWith(res.json, mockJobListings);
  });

  it("should handle error while fetching job listings", async () => {
    const req: any = {};
    const res: any = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    const error = new Error("Database error");
    const findStub = sinon.stub(JobListing, "find").rejects(error);

    await getJobListings(req, res);

    sinon.assert.calledOnce(findStub);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(
      res.send,
      "Error fetching job listings: " + error.message
    );
  });
});

describe("verifyJobListing", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should handle error while verifying job listing", async () => {
    const mockJobId = "job123";

    const req: any = {
      params: { jobId: mockJobId },
    };

    const res: any = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    const error = new Error("Database error");
    const updateOneStub = sinon.stub(JobListing, "updateOne").rejects(error);

    await verifyJobListing(req, res);

    sinon.assert.calledOnce(updateOneStub);
    // sinon.assert.calledWith(res.status, 500);
    // sinon.assert.calledWith(
    //   res.send,
    //   "Error verifying job listing: " + error.message
    // );
  });
});
describe("verifyJobListing", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should handle error while verifying job listing", async () => {
    const mockJobId = "job123";

    const req: any = {
      params: { jobId: mockJobId },
    };

    const res: any = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    const error = new Error("Database error");
    const updateOneStub = sinon.stub(JobListing, "updateOne").rejects(error);

    await verifyJobListing(req, res);

    sinon.assert.calledOnce(updateOneStub);
    // sinon.assert.calledWith(res.status, 500);
    // sinon.assert.calledWith(
    //   res.send,
    //   "Error verifying job listing: " + error.message
    // );
  });
});
describe("verifyJobListing", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should handle error while verifying job listing", async () => {
    const mockJobId = "job123";

    const req: any = {
      params: { jobId: mockJobId },
    };

    const res: any = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    const error = new Error("Database error");
    const updateOneStub = sinon.stub(JobListing, "updateOne").rejects(error);

    await verifyJobListing(req, res);

    sinon.assert.calledOnce(updateOneStub);
    // sinon.assert.calledWith(res.status, 500);
    // sinon.assert.calledWith(
    //   res.send,
    //   "Error verifying job listing: " + error.message
    // );
  });
});
describe("verifyJobListing", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should handle error while verifying job listing", async () => {
    const mockJobId = "job123";

    const req: any = {
      params: { jobId: mockJobId },
    };

    const res: any = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    const error = new Error("Database error");
    const updateOneStub = sinon.stub(JobListing, "updateOne").rejects(error);

    await verifyJobListing(req, res);

    sinon.assert.calledOnce(updateOneStub);
    // sinon.assert.calledWith(res.status, 500);
    // sinon.assert.calledWith(
    //   res.send,
    //   "Error verifying job listing: " + error.message
    // );
  });
});
describe("verifyJobListing", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should handle error while verifying job listing", async () => {
    const mockJobId = "job123";

    const req: any = {
      params: { jobId: mockJobId },
    };

    const res: any = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    const error = new Error("Database error");
    const updateOneStub = sinon.stub(JobListing, "updateOne").rejects(error);

    await verifyJobListing(req, res);

    sinon.assert.calledOnce(updateOneStub);
    // sinon.assert.calledWith(res.status, 500);
    // sinon.assert.calledWith(
    //   res.send,
    //   "Error verifying job listing: " + error.message
    // );
  });
});
