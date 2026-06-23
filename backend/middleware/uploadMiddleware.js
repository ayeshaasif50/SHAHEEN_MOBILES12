import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// ✅ Cloudinary storage — images permanently save hoti hain
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "shaheen_mobiles",   // Cloudinary mein folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1200, quality: "auto", fetch_format: "auto" }],
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const types = /jpeg|jpg|png|webp/;
  const mime  = types.test(file.mimetype);
  if (mime) cb(null, true);
  else cb(new Error("Sirf images allowed hain (jpg, png, webp)"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
