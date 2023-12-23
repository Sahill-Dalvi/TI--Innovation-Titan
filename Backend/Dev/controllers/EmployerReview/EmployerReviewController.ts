import { Request, Response } from "express";
import Review from "../../models/review";

export const getAllEmployerNames = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const employerNames = await Review.find({}, "employerName");
    res.json(employerNames);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send("Error fetching employer names: " + error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export const getAllReviewsByEmployer = async (
  req: Request<{ employerName: string }>,
  res: Response
): Promise<void> => {
  const { employerName } = req.params;

  try {
    const reviews = await Review.findOne({ employerName }, "reviews");
    if (!reviews) {
      res.status(404).send("Employer not found");
      return;
    }
    res.json(reviews.reviews);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send("Error fetching reviews: " + error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};
