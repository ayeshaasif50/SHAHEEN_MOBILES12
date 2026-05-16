// backend/routes/reviewRoutes.js
import express from "express";
import { getReviews, getReviewsByProduct, updateReview } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", getReviews);
router.get("/product/:id", getReviewsByProduct);
router.put("/:id", updateReview);

export default router;