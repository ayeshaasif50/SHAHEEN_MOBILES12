import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const COOKIE_NAME  = "shaheenToken";
const TOKEN_EXPIRE = "7d";                    // Extended to 7 days
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRE });

const sendTokenCookie = (res, token) => {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   COOKIE_MAX_AGE,
  });
};

// Helper – safe user object (never expose password)
const safeUser = (user) => ({
  id:        user._id,
  _id:       user._id,
  name:      user.name,
  email:     user.email,
  phone:     user.phone || "",
  role:      user.role,
  avatar:    user.avatar || "",
  points:    user.points || 0,
  addresses: user.addresses || [],
  createdAt: user.createdAt,
});

// ─── Register ────────────────────────────────────────────
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ success: false, message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user   = await User.create({ name, email, phone, password: hashed });

    const token = generateToken(user._id);
    sendTokenCookie(res, token);

    res.status(201).json({ success: true, token, user: safeUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Regular user login ───────────────────────────────────
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ success: false, message: "USER NOT FOUND" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: "INVALID CREDENTIALS" });

    const token = generateToken(user._id);
    sendTokenCookie(res, token);

    res.json({ success: true, token, user: safeUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Admin login ──────────────────────────────────────────
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ success: false, message: "USER NOT FOUND" });

    if (user.role !== "admin")
      return res.status(403).json({ success: false, message: "ONLY ADMIN CAN LOGIN" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: "INVALID CREDENTIALS" });

    const token = generateToken(user._id);
    sendTokenCookie(res, token);

    res.json({ success: true, token, user: safeUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get current profile ──────────────────────────────────
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user: safeUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Update profile (name / phone) ───────────────────────
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (name)  user.name  = name;
    if (phone) user.phone = phone;

    if (newPassword) {
      if (!currentPassword)
        return res.status(400).json({ success: false, message: "Current password required" });
      const ok = await user.matchPassword(currentPassword);
      if (!ok)
        return res.status(401).json({ success: false, message: "Current password is wrong" });
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();
    res.json({ success: true, user: safeUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Logout ───────────────────────────────────────────────
export const logoutUser = (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ success: true, message: "Logout successful" });
};
