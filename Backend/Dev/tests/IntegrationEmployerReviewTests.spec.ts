import { Request } from "express";
import sinon from "sinon";

import Review from "../models/review";
import {
  getAllEmployerNames,
  getAllReviewsByEmployer,
} from "../controllers/EmployerReview/EmployerReviewController"; // Replace 'yourFilePath' with the correct path

describe("getAllEmployerNames", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should get all employer names successfully", async () => {
    const res: any = {
      json: sinon.stub(),
    };

    const employerNames = [
      { employerName: "Employer 1" },
      { employerName: "Employer 2" },
    ];
    const findStub = sinon.stub(Review, "find").resolves(employerNames);

    await getAllEmployerNames({} as Request, res);

    sinon.assert.calledOnce(findStub);

    sinon.assert.calledWith(res.json, employerNames);
  });

  it("should handle error when fetching employer names", async () => {
    const res: any = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    const error = new Error("Database error");
    const findStub = sinon.stub(Review, "find").rejects(error);

    await getAllEmployerNames({} as Request, res);

    sinon.assert.calledOnce(findStub);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(
      res.send,
      "Error fetching employer names: " + error.message
    );
  });
});

describe("getAllReviewsByEmployer", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should get all reviews by employer successfully", async () => {
    const req: any = {
      params: { employerName: "Employer 1" },
    };

    const res: any = {
      json: sinon.stub(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    const reviews = { reviews: ["Review 1", "Review 2"] };
    const findOneStub = sinon.stub(Review, "findOne").resolves(reviews);

    await getAllReviewsByEmployer(req, res);

    sinon.assert.calledOnce(findOneStub);

    sinon.assert.calledWith(res.json, reviews.reviews);
  });

  it("should handle error when fetching reviews by employer", async () => {
    const req: any = {
      params: { employerName: "Employer 1" },
    };

    const res: any = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    const error = new Error("Database error");
    const findOneStub = sinon.stub(Review, "findOne").rejects(error);

    await getAllReviewsByEmployer(req, res);

    sinon.assert.calledOnce(findOneStub);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(
      res.send,
      "Error fetching reviews: " + error.message
    );
  });

  it("should handle 'employer not found' when no reviews found", async () => {
    const req: any = {
      params: { employerName: "Nonexistent Employer" },
    };

    const res: any = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    const findOneStub = sinon.stub(Review, "findOne").resolves(null);

    await getAllReviewsByEmployer(req, res);

    sinon.assert.calledOnce(findOneStub);
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.send, "Employer not found");
  });
});
