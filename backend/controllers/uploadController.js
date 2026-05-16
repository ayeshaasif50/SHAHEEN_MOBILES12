export const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Koi file upload nahi hui" });
    }

    // File path frontend-friendly
    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({ success: true, imageUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Image upload failed" });
  }
};