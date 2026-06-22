// backend/routes/reviewRoutes.js
import express from "express";
import {
  getReviews,
  getReviewsByProduct,
  updateReview,
  deleteReview
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getReviews);
router.get("/product/:id", getReviewsByProduct);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

export default router;