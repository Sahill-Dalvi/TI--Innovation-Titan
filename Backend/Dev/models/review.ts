import mongoose, { Schema, Document } from "mongoose";

interface IReview extends Document {
  employerName: string;
  reviews: string[];
}

const reviewSchema = new Schema(
  {
    employerName: String,
    reviews: [{ type: String }],
  },
  { collection: "reviews" }
);

const Review = mongoose.model<IReview>("Review", reviewSchema);

export default Review;
