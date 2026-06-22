import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import authRoutes    from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes   from "./routes/orderRoutes.js";
import uploadRoutes  from "./routes/uploadRoutes.js";
import reviewRoutes  from "./routes/reviewRoutes.js";

dotenv.config();
connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded files (avatars, product images, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Also serve from public/uploads (legacy path)
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

app.use("/api/auth",     authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders",   orderRoutes);
app.use("/api/upload",   uploadRoutes);
app.use("/api/reviews",  reviewRoutes);

app.get("/", (req, res) => {
  res.json({ message: "✅ Shaheen Mobiles API Running!", status: "OK" });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
console.log("MONGO URI:", process.env.MONGO_URI);