// backend/models/productModel.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user:            { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name:            { type: String,  required: true },
    rating:          { type: Number,  required: true, min: 1, max: 5 },
    comment:         { type: String,  required: true },
    productReviewId: { type: mongoose.Schema.Types.ObjectId, ref: "Review", default: null }, // linked top-level review id
  },
  { timestamps: true }
);

const variantSchema = new mongoose.Schema({
  ram:     { type: String, default: "" },   // keep as string to match seeder ("6GB", "8GB")
  storage: { type: String, default: "" },   // "128GB", "256GB"
  price:   { type: Number, default: 0 }
});

const colorSchema = new mongoose.Schema({
  name:   { type: String, default: "" },
  hex:    { type: String, default: "" },
  images: [{ type: String }]
});

const productSchema = new mongoose.Schema(
  {
    name:     { type: String,  required: [true, "Product naam zaroori hai"], trim: true },
    brand:    { type: String,  required: true },
    series:   { type: String,  default: "" },
    category: { type: String,  default: "Mobiles" },
    price:    { type: Number,  required: [true, "Price zaroori hai"], min: 0 },
    oldPrice: { type: Number,  default: null },

    // ── Specs ─────────────────────────────────
    ram:      { type: String,  default: "" },
    storage:  { type: String,  default: "" },

    specs: {
      display:   { type: String, default: "" },
      processor: { type: String, default: "" },
      camera:    { type: String, default: "" },
      battery:   { type: String, default: "" },
      os:        { type: String, default: "" },
      sim:       { type: String, default: "" },
    },

    // ── Extra ─────────────────────────────────
    colors:   [colorSchema],
    variants: [variantSchema],
    features: [String],

    // ── Images ────────────────────────────────
    image:    { type: String,  default: "" },
    images:   [{ type: String }],

    // ── Status ────────────────────────────────
    stock:    { type: Number,  default: 0, min: 0 },
    badge: {
      type:    String,
      enum:    ["Hot", "Sale", "New", "NEW", "BEST SELLER", "SPONSORED", "OUT OF STOCK", "", "HOT", "ULTRA", "PRO+"],
      default: "",
    },
    isPTA:       { type: Boolean, default: true },
    isUsed:      { type: Boolean, default: false },
    isFeatured:  { type: Boolean, default: false },
    description: { type: String,  default: "" },

    // ── Reviews ───────────────────────────────
    reviews:    [reviewSchema],
    rating:     { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;