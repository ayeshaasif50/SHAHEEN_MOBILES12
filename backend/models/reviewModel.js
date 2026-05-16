// backend/models/reviewModel.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId:         { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    productId:      { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    productReviewId:{ type: mongoose.Schema.Types.ObjectId, ref: "Product.reviews", default: null }, // link to embedded product review
    name:           { type: String, required: true },
    rating:         { type: Number, required: true, min: 1, max: 5 },
    comment:        { type: String, required: true },
  },
  { timestamps: true }
);

// index to speed up queries by product
reviewSchema.index({ productId: 1, createdAt: -1 });

const Review = mongoose.model("Review", reviewSchema);
export default Review;