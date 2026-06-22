// backend/controllers/reviewController.js
import Review from "../models/reviewModel.js";
import Product from "../models/productModel.js";

// GET /api/reviews
export const getReviews = async (req, res) => {
  try {
    const { productId, userId, page = 1, limit = 25 } = req.query;
    const query = {};
    if (productId) query.productId = productId;
    if (userId) query.userId = userId;

    const skip = (Number(page) - 1) * Number(limit);

    const [reviews, total] = await Promise.all([
      Review.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Review.countDocuments(query),
    ]);

    res.json({ success: true, count: reviews.length, total, page: Number(page), reviews });
  } catch (err) {
    console.error("getReviews error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/reviews/product/:id
export const getReviewsByProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    res.json({ success: true, count: reviews.length, reviews });
  } catch (err) {
    console.error("getReviewsByProduct error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/reviews/:id -> update top-level review and linked embedded review
export const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { name, rating, comment } = req.body;

    const reviewDoc = await Review.findById(reviewId);
    if (!reviewDoc) return res.status(404).json({ success: false, message: "Review not found" });

    const isOwner =
      reviewDoc.userId &&
      reviewDoc.userId.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "ONLY OWNER OR ADMIN CAN UPDATE REVIEW",
      });
    }

    if (typeof name !== "undefined") reviewDoc.name = name;
    if (typeof rating !== "undefined") reviewDoc.rating = Number(rating);
    if (typeof comment !== "undefined") reviewDoc.comment = comment;
    await reviewDoc.save();

    // update embedded review in product if linked
    if (reviewDoc.productReviewId) {
      try {
        const product = await Product.findById(reviewDoc.productId);
        if (product) {
          const sub = product.reviews.id(reviewDoc.productReviewId);
          if (sub) {
            sub.name = reviewDoc.name;
            sub.rating = reviewDoc.rating;
            sub.comment = reviewDoc.comment;
            await product.save();
          }
        }
      } catch (errSub) {
        console.warn("Warning: unable to update embedded product review:", errSub);
      }
    }

    return res.json({ success: true, review: reviewDoc });
  } catch (err) {
    console.error("updateReview error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const reviewDoc = await Review.findById(reviewId);
    if (!reviewDoc) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const isOwner =
      reviewDoc.userId &&
      reviewDoc.userId.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "ONLY OWNER OR ADMIN CAN DELETE REVIEW",
      });
    }

    if (reviewDoc.productReviewId) {
      try {
        const product = await Product.findById(reviewDoc.productId);

        if (product) {
          const sub = product.reviews.id(reviewDoc.productReviewId);

          if (sub) {
            sub.deleteOne();
          }

          if (product.reviews && product.reviews.length > 0) {
            product.numReviews = product.reviews.length;
            product.rating =
              product.reviews.reduce((acc, item) => acc + item.rating, 0) /
              product.reviews.length;
          } else {
            product.numReviews = 0;
            product.rating = 0;
          }

          await product.save();
        }
      } catch (errSub) {
        console.warn("Warning: unable to delete embedded product review:", errSub);
      }
    }

    await reviewDoc.deleteOne();

    res.json({
      success: true,
      message: "REVIEW DELETED",
    });
  } catch (err) {
    console.error("deleteReview error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};