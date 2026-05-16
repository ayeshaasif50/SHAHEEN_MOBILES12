import express from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct, addReview } from "../controllers/productController.js";
import { protect, optionalAuth } from "../middleware/authMiddleware.js";
import { adminOnly }             from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get   ("/",             getProducts);
router.get   ("/:id",          getProduct);
router.post  ("/:id/reviews",  optionalAuth, addReview);
router.post  ("/",             protect, adminOnly, createProduct);
router.put   ("/:id",          protect, adminOnly, updateProduct);
router.delete("/:id",          protect, adminOnly, deleteProduct);

export default router;