// backend/controllers/productController.js
import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";

export const getProducts = async (req, res) => {
  try {
    const {
      brand, category, ram, storage,
      priceMax, priceMin, rating,
      sort, q, badge, series,
      page = 1, limit = 12
    } = req.query;

    const query = {};

    if (category) query.category = category;
    if (brand)    query.brand    = brand;
    if (badge)    query.badge    = badge;
    if (series)   query.series   = decodeURIComponent(series);
    if (ram)      query.ram      = ram;
    if (storage)  query.storage  = storage;
    if (rating)   query.rating   = { $gte: Number(rating) };
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }
    if (q) query.name = { $regex: q, $options: "i" };

    let sortOption = { createdAt: -1 };
    if (sort === "low")    sortOption = { price: 1 };
    if (sort === "high")   sortOption = { price: -1 };
    if (sort === "rating") sortOption = { rating: -1 };

    const skip     = (Number(page) - 1) * Number(limit);
    const total    = await Product.countDocuments(query);
    const products = await Product.find(query)
                                  .sort(sortOption)
                                  .skip(skip)
                                  .limit(Number(limit));

    res.json({
      success: true,
      count:   products.length,
      total,
      pages:   Math.ceil(total / Number(limit)),
      page:    Number(page),
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "PRODUCT NOT FOUND" });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!product)
      return res.status(404).json({ success: false, message: "PRODUCT NOT FOUND" });
    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "PRODUCT NOT FOUND" });
    res.json({ success: true, message: "PRODUCT DELETED" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// addReview: create embedded review + top-level review and link them
export const addReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({ success: false, message: "name, rating and comment are required" });
    }

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "PRODUCT NOT FOUND" });

    // create embedded review
    const reviewForProduct = { name, rating: Number(rating), comment };
    if (req.user) reviewForProduct.user = req.user._id;

    product.reviews.push(reviewForProduct);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;

    await product.save();

    // embedded created
    const createdEmbedded = product.reviews[product.reviews.length - 1];

    // create top-level Review doc and link productReviewId
    try {
      const reviewDoc = await Review.create({
        userId: req.user?._id || null,
        productId: product._id,
        productReviewId: createdEmbedded._id,
        name,
        rating: Number(rating),
        comment,
      });

      // update embedded with productReviewId
      createdEmbedded.productReviewId = reviewDoc._id;
      await product.save();

      // Award 5 loyalty points for writing a review
      if (req.user) {
        try { await User.findByIdAndUpdate(req.user._id, { $inc: { points: 5 } }); }
        catch (errPts) { console.warn("Warning: unable to award review points:", errPts); }
      }

      return res.status(201).json({ success: true, review: reviewDoc, product });
    } catch (errCreate) {
      console.warn("Warning: failed to create top-level review doc:", errCreate);
      return res.status(201).json({ success: true, review: createdEmbedded, product });
    }
  } catch (error) {
    console.error("addReview error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};