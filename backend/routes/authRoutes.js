import express from "express";
import {
  loginUser,
  adminLogin,
  registerUser,
  logoutUser,
  getMe,
  updateProfile,
} from "../controllers/authController.js";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ─── Auth ────────────────────────────────────────────────
router.post("/register",     registerUser);
router.post("/login",        loginUser);
router.post("/admin-login",  adminLogin);
router.post("/logout",       logoutUser);

// ─── Current user (protected) ────────────────────────────
router.get( "/me",           protect, getMe);
router.put( "/profile",      protect, updateProfile);

// ─── Addresses (protected) ───────────────────────────────
router.get(   "/addresses",      protect, getAddresses);
router.post(  "/addresses",      protect, addAddress);
router.put(   "/addresses/:id",  protect, updateAddress);
router.delete("/addresses/:id",  protect, deleteAddress);

export default router;