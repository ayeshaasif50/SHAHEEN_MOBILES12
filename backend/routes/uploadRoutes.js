import express from "express";
import { uploadImage }  from "../controllers/uploadController.js";
import { protect }      from "../middleware/authMiddleware.js";
import { adminOnly }    from "../middleware/adminMiddleware.js";
import upload           from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Upload route
// Field name 'image' must match frontend form
router.post("/", protect, adminOnly, upload.single("image"), uploadImage);

export default router;