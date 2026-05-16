// frontend/src/components/Profile/ReviewCard.jsx
import React, { useState } from "react";
import { IMG_BASE } from "../../utils/api";

export default function ReviewCard({ review, onWriteReview }) {
  const [showFullText, setShowFullText] = useState(false);

  const truncateText = (text, limit = 100) => {
    if (!text) return "";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const makeUrl = (path) => {
    if (!path) return "/placeholder.png";
    if (typeof path !== "string") return "/placeholder.png";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    if (path.startsWith(IMG_BASE)) return path;
    const p = path.startsWith("/") ? path : `/${path}`;
    return `${IMG_BASE}${p}`;
  };

  // support both shapes: review.product may be string or object
  const productName =
    typeof review.product === "string"
      ? review.product
      : review.product?.name || review.product?.title || "";

  const productImages =
    (review.product && review.product.images && review.product.images.length)
      ? review.product.images
      : (review.images || []);

  const reviewText = review.text || review.comment || "";

  return (
    <div className="review-card review-elevated">
      <div className="review-left">
        <div className="review-thumb">
          <img
            src={makeUrl(productImages?.[0])}
            alt={productName || "Product image"}
            onError={(e) => { e.target.onerror = null; e.target.src = "/placeholder.png"; }}
          />
        </div>
      </div>

      <div className="review-body">
        <h4 className="product-title">{productName}</h4>
        <p className="purchase-date">
          Purchased on {review.date || new Date(review.createdAt || review.created_at || Date.now()).toLocaleDateString()}
        </p>

        <div className="rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < (review.rating || review.rate || 0) ? "star filled" : "star"}>
              ★
            </span>
          ))}
        </div>

        <p className="review-text">{truncateText(reviewText, showFullText ? 1000 : 100)}</p>

        {productImages && productImages.length > 0 && (
          <div className="review-images">
            {productImages.slice(0, 2).map((src, idx) => (
              <img
                key={idx}
                src={makeUrl(src)}
                alt={`${productName || "product"}-${idx}`}
                onError={(e) => { e.target.onerror = null; e.target.src = "/placeholder.png"; }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="review-actions">
        <button className="btn btn-primary" onClick={() => onWriteReview(review)}>
          Edit Review
        </button>
      </div>
    </div>
  );
}