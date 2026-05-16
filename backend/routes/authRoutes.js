import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { adminLogin, loginUser, logoutUser } from "../controllers/authController.js";

const router = express.Router();

const COOKIE_NAME = "shaheenToken";
const COOKIE_MAX_AGE = 30 * 60 * 1000;

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30m" });

const setCookie = (res, token) => {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
  });
};

// ✅ User login
router.post("/login", loginUser);

// ✅ Admin login
router.post("/admin-login", adminLogin);

// ✅ Register — bcrypt hash fix
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "User already exists" });

    // ✅ Password hash karo pehle
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "user",
    });

    const token = createToken(user._id);
    setCookie(res, token);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Logout
router.post("/logout", logoutUser);

export default router;