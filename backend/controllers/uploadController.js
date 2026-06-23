import User from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Profile image upload — Cloudinary par save hoti hai permanently
export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "NO FILE UPLOADED" });
    }

    // Cloudinary multer-storage-cloudinary automatically upload kar deta hai
    // req.file.path = Cloudinary URL hoti hai
    const imageUrl = req.file.path;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "USER NOT FOUND" });
    }

    // Purani Cloudinary image delete karo agar hai
    if (user.avatar && user.avatar.includes("cloudinary.com")) {
      try {
        // Public ID extract karo URL se
        const parts = user.avatar.split("/");
        const filenameWithExt = parts[parts.length - 1];
        const filename = filenameWithExt.split(".")[0];
        const folder = parts[parts.length - 2];
        const publicId = `${folder}/${filename}`;
        await cloudinary.uploader.destroy(publicId);
      } catch (e) {
        // Ignore — delete fail ho toh bhi chalta hai
      }
    }

    user.avatar = imageUrl;
    await user.save();

    res.status(200).json({
      success: true,
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

// ✅ Generic image upload (products etc.) — Cloudinary par
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "NO FILE UPLOADED" });
    }
    // req.file.path = Cloudinary URL
    const imageUrl = req.file.path;
    res.status(200).json({ success: true, imageUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Image upload failed" });
  }
};
