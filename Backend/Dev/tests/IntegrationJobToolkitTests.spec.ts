// import { Request, Response } from "express";s
import JobToolkit from "../models/jobToolkitModel";
import {
  uploadJobToolkit,
  getJobToolkitById,
} from "../controllers/JobToolkit/JobToolkitCont"; // Replace 'yourFilePath' with the correct path
import sinon from "sinon";

describe("uploadJobToolkit", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should handle error while uploading job toolkit", async () => {
    const mockFile = {
      resume: {
        data: "resumeData",
        mimetype: "application/pdf",
        name: "resume.pdf",
      },
    };
    const mockUserId = "user123";

    const req: any = {
      files: mockFile,
      body: { userId: mockUserId },
      params: { userId: mockUserId },
    };

    const res: any = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const error = new Error("Database error");
    const findOneStub = sinon.stub(JobToolkit, "findOne").rejects(error);

    await uploadJobToolkit(req, res);

    sinon.assert.calledOnce(findOneStub);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.json, { error: "Internal server error" });
  });
});

describe("getJobToolkitById", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should get job toolkit by user ID", async () => {
    const mockUserId = "user123";
    const mockJobToolkit = {
      userId: mockUserId,
      resume: {
        data: "resumeData",
        mimetype: "application/pdf",
        name: "resume.pdf",
      },
    };

    const req: any = {
      params: { userId: mockUserId },
    };

    const res: any = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const findOneStub = sinon
      .stub(JobToolkit, "findOne")
      .resolves(mockJobToolkit);

    await getJobToolkitById(req, res);

    sinon.assert.calledOnce(findOneStub);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, mockJobToolkit);
  });

  it("should handle error while getting job toolkit by user ID", async () => {
    const mockUserId = "user123";

    const req: any = {
      params: { userId: mockUserId },
    };

    const res: any = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const error = new Error("Database error");
    const findOneStub = sinon.stub(JobToolkit, "findOne").rejects(error);

    await getJobToolkitById(req, res);

    sinon.assert.calledOnce(findOneStub);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.json, { error: "Internal server error" });
  });
});
