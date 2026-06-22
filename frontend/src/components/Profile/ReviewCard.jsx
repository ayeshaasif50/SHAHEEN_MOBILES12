// frontend/src/components/Profile/ReviewCard.jsx
import React, { useState } from "react";
import { IMG_BASE } from "../../utils/api";

const IMG_BASE_URL = IMG_BASE || "http://localhost:5000";

const makeUrl = (p) => {
  if (!p || typeof p !== "string") return "/placeholder.png";
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  return `${IMG_BASE_URL}${p.startsWith("/") ? p : `/${p}`}`;
};

export default function ReviewCard({ review, onWriteReview, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const productName =
    typeof review.product === "string"
      ? review.product
      : review.product?.name || review.product?.title || "Product";

  const productImages =
    review.product?.images?.length
      ? review.product.images
      : review.images || [];

  const reviewText = review.comment || review.text || "";
  const truncated  = reviewText.length > 140 && !expanded ? `${reviewText.slice(0, 140)}…` : reviewText;

  const stars = review.rating || review.rate || 0;

  return (
    <div className="review-card review-elevated">
      {/* Product image */}
      <div className="review-left">
        <img
          src={makeUrl(productImages[0])}
          alt={productName}
          className="review-thumb-img"
          onError={(e) => { e.target.src = "/placeholder.png"; }}
        />
      </div>

      {/* Body */}
      <div className="review-body">
        <h4 className="product-title">{productName}</h4>
        <p className="purchase-date">
          Reviewed on {new Date(review.createdAt || review.created_at || Date.now()).toLocaleDateString()}
        </p>

        <div className="stars-row">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < stars ? "star filled" : "star"}>★</span>
          ))}
        </div>

        {reviewText && (
          <p className="review-text">
            {truncated}
            {reviewText.length > 140 && (
              <button
                className="read-more-btn"
                onClick={() => setExpanded((s) => !s)}
              >
                {expanded ? " Show less" : " Read more"}
              </button>
            )}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="review-actions">
        <button
          className="btn btn-primary"
          onClick={() => onWriteReview && onWriteReview(review)}
        >
          Edit
        </button>
        {typeof onDelete === "function" && (
          <button
            className="btn btn-danger"
            onClick={() => onDelete(review)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
