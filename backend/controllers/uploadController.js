import User from "../models/userModel.js";
import fs from "fs";
import path from "path";

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "NO FILE UPLOADED" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    // Use authenticated user (req.user comes from protect middleware)
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "USER NOT FOUND" });
    }

    // Delete old avatar file if it exists and is a local upload
    if (user.avatar && user.avatar.startsWith("/uploads/")) {
      const oldPath = path.join(process.cwd(), "public", user.avatar);
      if (fs.existsSync(oldPath)) {
        try { fs.unlinkSync(oldPath); } catch (e) { /* ignore */ }
      }
    }

    user.avatar = imageUrl;
    await user.save();

    res.status(200).json({
      success:  true,
      imageUrl,
      user: {
        id:     user._id,
        _id:    user._id,
        name:   user.name,
        email:  user.email,
        phone:  user.phone || "",
        role:   user.role,
        avatar: user.avatar,
        points: user.points || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Image upload failed" });
  }
};

// Generic image upload (products etc.)
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "NO FILE UPLOADED" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ success: true, imageUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Image upload failed" });
  }
};