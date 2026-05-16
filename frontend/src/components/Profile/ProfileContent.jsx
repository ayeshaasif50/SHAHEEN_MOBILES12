// frontend/src/components/Profile/ProfileContent.jsx
import React, { useState } from "react";
import ReviewCard from "./ReviewCard";
import API from "../../utils/api";

export default function ProfileContent({ activeTab, profile, reviews = [], orders = [] }) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, text: "", images: [] });
  const [submitting, setSubmitting] = useState(false);

  // Only allow editing existing top-level reviews from profile.
  // If the item doesn't have a top-level review id, prompt user to write review on the product page.
  const handleWriteReview = (review) => {
    // If this is a top-level review (has _id), allow editing
    if (review && (review._id || review.id)) {
      setSelectedReview(review);
      setReviewForm({
        rating: review?.rating || 5,
        text: review?.comment || review?.text || "",
        images: review?.product?.images || review?.images || []
      });
      setShowReviewModal(true);
      return;
    }

    // Otherwise, instruct user to write review on product page
    const productId = review?.product?._id || review?.productId || review?.id;
    if (productId) {
      if (window.confirm("This item has no existing review to edit. Do you want to go to the product page to write a review?")) {
        window.location.href = `/product/${productId}`; // adjust if your route is different
      }
      return;
    }

    alert("To write a new review, please visit the product page and submit a review there.");
  };

  const handleCloseModal = () => {
    setShowReviewModal(false);
    setSelectedReview(null);
    setReviewForm({ rating: 5, text: "", images: [] });
    setSubmitting(false);
  };

  // Submit only updates an existing top-level review.
  const handleSubmitReview = async () => {
    if (submitting) return;
    if (!selectedReview || !(selectedReview._id || selectedReview.id)) {
      alert("Cannot submit: this modal is for editing existing reviews only.");
      return;
    }
    if (!reviewForm.text.trim()) {
      alert("Please write something in the review");
      return;
    }

    setSubmitting(true);

    const payload = {
      rating: reviewForm.rating,
      comment: reviewForm.text,
      name: profile?.name || profile?.email || "Anonymous",
    };

    try {
      const reviewId = selectedReview._id || selectedReview.id;
      const res = await API.put(`/reviews/${reviewId}`, payload);
      if (res?.data?.success) {
        alert("Review updated");
      } else {
        alert("Failed to update review");
      }

      window.dispatchEvent(new CustomEvent("review:submitted", { detail: { productId: selectedReview.product?._id || selectedReview.productId } }));
      handleCloseModal();
    } catch (err) {
      console.error("profile submit review error:", err.response?.data || err);
      alert("Error updating review: " + (err.response?.data?.message || err.message || "Unknown"));
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="profile-content card-white content-elevated">
        {activeTab === "to-review" && (
          <div>
            <div className="tab-controls">
              <button className="tab-btn active">To Review</button>
              <button className="tab-btn">Review History</button>
            </div>

            <div className="reviews-list">
              {(!reviews || reviews.length === 0) ? (
                <div className="reviews-empty">
                  <p>No products to review yet. Make a purchase to start reviewing!</p>
                </div>
              ) : (
                reviews.map((r) => (
                  <ReviewCard key={r._id || r.id} review={r} onWriteReview={handleWriteReview} />
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 style={{ color: "#333" }}>Order History</h2>
            {orders.length === 0 ? (
              <p style={{ color: "#666" }}>No orders yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {orders.map((order) => (
                  <div key={order._id || order.id} className="order-card" style={{ padding: 16, borderRadius: 10, border: "1px solid #eef3fb", background: "#fff", boxShadow: "0 6px 18px rgba(20,40,80,0.03)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>Order #{order._id?.slice(-6) || order._id}</div>
                        <div style={{ color: "#666", fontSize: 13 }}>{new Date(order.createdAt).toLocaleString()}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 700 }}>Rs. {(order.totalPrice || order.total || 0).toLocaleString()}</div>
                        <div style={{ color: "#666", fontSize: 13 }}>{order.status || "pending"}</div>
                      </div>
                    </div>

                    <div style={{ marginTop: 12 }}>
                      {order.orderItems?.map((it, idx) => (
                        <div key={idx} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 0", borderTop: idx === 0 ? "none" : "1px solid #f2f6fb" }}>
                          <img src={it.image || "/placeholder.png"} alt={it.name} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 6 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700 }}>{it.name}</div>
                            <div style={{ color: "#666", fontSize: 13 }}>{it.qty} × Rs. {Number(it.price).toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "account" && (
          <div>
            <h2 style={{ color: "#333" }}>Account Details</h2>
            <div style={{ marginTop: "20px" }}>
              <p><strong>Name:</strong> {profile?.name || "---"}</p>
              <p><strong>Email:</strong> {profile?.email || "---"}</p>
            </div>
          </div>
        )}
      </div>

      {/* Review Modal (Edit only) */}
      {showReviewModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Review</h2>
              <button className="modal-close" onClick={handleCloseModal}>✕</button>
            </div>

            {selectedReview && (
              <div style={{ display: "flex", gap: "16px", marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid #e5e5e5" }}>
                <img src={selectedReview.product?.images?.[0] || selectedReview.images?.[0] || "https://picsum.photos/seed/placeholder/80/80"} alt={selectedReview.product?.name || selectedReview.product || "Product"} style={{ width: "80px", height: "80px", borderRadius: "8px", objectFit: "cover" }} />
                <div>
                  <h4 style={{ margin: "0 0 4px 0", color: "#333" }}>{selectedReview.product?.name || selectedReview.product || selectedReview.productName || "Product"}</h4>
                  <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Purchased on {selectedReview.date || new Date(selectedReview.createdAt || selectedReview.created_at || Date.now()).toLocaleDateString()}</p>
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Your Rating</label>
              <div className="rating-input" style={{ marginBottom: 12 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`star ${reviewForm.rating >= star ? "selected" : ""}`} onClick={() => setReviewForm({ ...reviewForm, rating: star })} style={{ cursor: "pointer", fontSize: 20 }}>★</span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Your Review</label>
              <textarea placeholder="Share your experience..." value={reviewForm.text} onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })} style={{ width: "100%", minHeight: 100, padding: 8 }} />
            </div>

            <div className="form-actions" style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <button className="btn-submit" onClick={handleSubmitReview} disabled={submitting}>{submitting ? "Submitting..." : "Submit Review"}</button>
              <button className="btn-cancel" onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}