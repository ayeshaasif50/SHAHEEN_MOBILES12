import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadProfileImage, uploadImage } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Profile avatar – requires login so we know which user to update
router.post("/avatar", protect, upload.single("avatar"), uploadProfileImage);

// Generic product/other image upload (admin uses this)
router.post("/", upload.single("image"), uploadImage);

export default router;