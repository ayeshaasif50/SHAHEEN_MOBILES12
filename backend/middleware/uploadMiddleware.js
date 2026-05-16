import multer from "multer";
import path   from "path";

// Storage config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // Ensure 'uploads' folder exists
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const types = /jpeg|jpg|png|webp/;
  const ext   = types.test(path.extname(file.originalname).toLowerCase());
  const mime  = types.test(file.mimetype);

  if (ext && mime) cb(null, true);
  else cb(new Error("Sirf images allowed hain (jpg, png, webp)"));
};

// Multer upload
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;